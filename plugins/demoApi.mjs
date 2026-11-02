// 개발 서버 전용 데모 API. 운영 API 또는 로그인/세션으로 사용하지 않는다.
import { randomUUID } from 'node:crypto'
import { mkdir, readFile, rename, writeFile } from 'node:fs/promises'
import { dirname, join } from 'node:path'

const ENDPOINT = '/__demo/api/notes'

export function createDemoStore(filePath) {
  let pending = Promise.resolve()
  async function readNotes() {
    try {
      const parsed = JSON.parse(await readFile(filePath, 'utf8'))
      return Array.isArray(parsed) ? parsed : []
    } catch (error) {
      if (error.code === 'ENOENT') return []
      throw error
    }
  }
  return {
    list() {
      // 작성 중 부분 데이터를 읽지 않도록 저장 작업을 기다린다.
      return pending.then(readNotes)
    },
    save(values) {
      const operation = pending.then(async () => {
        const notes = await readNotes()
        const note = {
          id: randomUUID(),
          title: values.title,
          quantity: values.quantity,
          createdAt: new Date().toISOString(),
        }
        notes.unshift(note)
        await mkdir(dirname(filePath), { recursive: true })
        const tempPath = `${filePath}.${randomUUID()}.tmp`
        await writeFile(tempPath, JSON.stringify(notes, null, 2), { flag: 'wx' })
        await rename(tempPath, filePath)
        return note
      })
      pending = operation.then(() => undefined, () => undefined)
      return operation
    },
  }
}

function send(res, status, body) {
  res.statusCode = status
  res.setHeader('Content-Type', 'application/json; charset=utf-8')
  res.setHeader('Cache-Control', 'no-store')
  res.end(JSON.stringify(body))
}

async function readBody(req) {
  let bytes = 0
  const parts = []
  for await (const part of req) {
    bytes += part.length
    if (bytes > 4096) {
      const error = new Error('요청 크기가 4KB를 초과했습니다.')
      error.status = 413
      throw error
    }
    parts.push(part)
  }
  try {
    return JSON.parse(Buffer.concat(parts).toString('utf8'))
  } catch {
    const error = new Error('JSON 형식이 올바르지 않습니다.')
    error.status = 400
    throw error
  }
}

export function demoApiPlugin() {
  return {
    name: 'local-demo-api-only',
    apply: 'serve',
    configureServer(server) {
      const store = createDemoStore(join(server.config.root, 'node_modules/.cache/vue-query-demo.json'))
      server.middlewares.use(async (req, res, next) => {
        if (req.url?.split('?')[0] !== ENDPOINT) return next()
        // 기존 Vite 설정이 0.0.0.0이므로 데모 API는 반드시 loopback 요청에만 허용한다.
        if (!['127.0.0.1', '::1', '::ffff:127.0.0.1'].includes(req.socket.remoteAddress)) {
          return send(res, 403, { message: '이 데모 API는 localhost에서만 사용합니다.' })
        }
        try {
          if (req.method === 'GET') return send(res, 200, await store.list())
          if (req.method !== 'POST') {
            res.setHeader('Allow', 'GET, POST')
            return send(res, 405, { message: 'GET 또는 POST만 지원합니다.' })
          }
          if (!req.headers['content-type']?.startsWith('application/json')) {
            return send(res, 415, { message: 'application/json이 필요합니다.' })
          }
          const body = await readBody(req)
          const title = typeof body?.title === 'string' ? body.title.trim() : ''
          if (!title || title.length < 2 || title.length > 80 ||
              !Number.isInteger(body?.quantity) || body.quantity < 1 || body.quantity > 999) {
            return send(res, 400, { message: '제목(2~80자)과 수량(1~999 정수)을 확인하세요.' })
          }
          return send(res, 201, await store.save({ title, quantity: body.quantity }))
        } catch (error) {
          const status = error.status ?? 500
          return send(res, status, {
            message: status === 500 ? '로컬 데모 저장소 오류' : error.message,
          })
        }
      })
    },
  }
}
