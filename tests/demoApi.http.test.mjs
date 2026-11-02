import assert from 'node:assert/strict'
import { mkdtemp, rm } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { test } from 'node:test'
import { createServer } from 'vite'
import { demoApiPlugin } from '../plugins/demoApi.mjs'

test('Vite 개발 API에서 GET/POST/입력 오류를 실제 HTTP로 확인한다', async () => {
  const root = await mkdtemp(join(tmpdir(), 'vue-query-demo-http-'))
  let server
  try {
    server = await createServer({
      configFile: false,
      root,
      appType: 'custom',
      logLevel: 'silent',
      plugins: [demoApiPlugin()],
      server: { host: '127.0.0.1', port: 0, open: false },
    })
    await server.listen()
    const address = server.httpServer.address()
    assert.ok(address && typeof address !== 'string')
    const url = `http://127.0.0.1:${address.port}/__demo/api/notes`

    const initial = await fetch(url)
    assert.equal(initial.status, 200)
    assert.deepEqual(await initial.json(), [])

    const invalid = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: 'A', quantity: 0 }),
    })
    assert.equal(invalid.status, 400)

    const saved = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: 'HTTP 저장 검증', quantity: 5 }),
    })
    assert.equal(saved.status, 201)
    const item = await saved.json()
    assert.equal(item.title, 'HTTP 저장 검증')
    assert.equal(item.quantity, 5)

    const listed = await fetch(url)
    assert.equal(listed.status, 200)
    assert.deepEqual(await listed.json(), [item])

    const denied = await fetch(url, { method: 'DELETE' })
    assert.equal(denied.status, 405)
  } finally {
    if (server) await server.close()
    await rm(root, { recursive: true, force: true })
  }
})
