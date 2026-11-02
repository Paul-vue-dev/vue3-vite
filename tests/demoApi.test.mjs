import assert from 'node:assert/strict'
import { mkdtemp, readFile, rm } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { test } from 'node:test'
import { createDemoStore } from '../plugins/demoApi.mjs'

test('API 데모 저장소는 JSON 파일에 기록하고 재생성 후 조회할 수 있다', async () => {
  const dir = await mkdtemp(join(tmpdir(), 'vue-query-demo-'))
  const filepath = join(dir, 'data.json')
  try {
    const store = createDemoStore(filepath)
    assert.deepEqual(await store.list(), [])
    const saved = await store.save({ title: '입고 테스트', quantity: 3 })
    assert.equal(saved.quantity, 3)
    assert.ok(saved.id)
    const afterRestart = createDemoStore(filepath)
    assert.deepEqual(await afterRestart.list(), [saved])
    const raw = JSON.parse(await readFile(filepath, 'utf8'))
    assert.equal(raw.length, 1)
  } finally {
    await rm(dir, { recursive: true, force: true })
  }
})

test('동시 저장 요청도 유실 없이 직렬화한다', async () => {
  const dir = await mkdtemp(join(tmpdir(), 'vue-query-demo-'))
  try {
    const store = createDemoStore(join(dir, 'data.json'))
    await Promise.all(Array.from({ length: 8 }, (_, i) =>
      store.save({ title: `테스트 ${i}`, quantity: i + 1 })))
    const all = await store.list()
    assert.equal(all.length, 8)
    assert.equal(new Set(all.map((x) => x.id)).size, 8)
  } finally {
    await rm(dir, { recursive: true, force: true })
  }
})
