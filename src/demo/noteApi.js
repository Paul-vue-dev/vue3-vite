import { noteInputSchema, noteListSchema, noteSchema } from './noteSchema'

const ENDPOINT = '/__demo/api/notes'

async function request(method, body) {
  const response = await fetch(ENDPOINT, {
    method,
    headers: body ? { 'Content-Type': 'application/json' } : undefined,
    body: body ? JSON.stringify(body) : undefined,
    credentials: 'same-origin',
    cache: 'no-store',
  })
  const json = await response.json()
  if (!response.ok) {
    throw new Error(json?.message || `데모 API 오류: ${response.status}`)
  }
  return json
}

export async function fetchDemoNotes() {
  return noteListSchema.parse(await request('GET'))
}

export async function saveDemoNote(input) {
  const validated = noteInputSchema.parse(input)
  return noteSchema.parse(await request('POST', validated))
}
