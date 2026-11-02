<template>
  <section class="lab">
    <h1>Zod + TanStack Vue Query 저장 API 데모</h1>
    <p class="explain">개발 서버 전용입니다. 실제 HTTP GET/POST를 사용하고 데이터를 로컬 파일에 저장합니다. 운영 DB·인증·WebSocket은 사용하지 않습니다.</p>
    <p class="endpoint">API: <code>GET /__demo/api/notes</code> / <code>POST /__demo/api/notes</code></p>

    <form class="form" @submit.prevent="save">
      <label for="demo-title">제목</label>
      <input id="demo-title" v-model="title" maxlength="90" placeholder="예: 입고 수량 점검" />
      <label for="demo-quantity">수량</label>
      <input id="demo-quantity" v-model.number="quantity" type="number" min="1" max="999" />
      <div class="actions">
        <button type="submit" :disabled="saving">{{ saving ? '저장 중...' : 'API로 저장' }}</button>
        <button type="button" :disabled="isFetching" @click="refetch()">서버에서 다시 조회</button>
        <button type="button" @click="checkBadSample">잘못된 응답 검사(Zod)</button>
      </div>
    </form>
    <p v-if="validationMessage" role="alert" class="error">{{ validationMessage }}</p>
    <p v-if="saveError" role="alert" class="error">저장 실패: {{ saveError.message }}</p>
    <p v-if="lastSaved" role="status" class="ok">{{ lastSaved }}</p>

    <div class="status">
      <span>GET 상태: {{ isPending ? '조회 중' : isFetching ? '새로 조회 중' : isError ? '실패' : '완료' }}</span>
      <span>캐시된 목록: {{ notes?.length ?? 0 }}건</span>
      <span>저장 상태: {{ saving ? '진행 중' : '대기' }}</span>
    </div>

    <p v-if="isError" role="alert" class="error">조회 실패: {{ error?.message }}</p>
    <p v-else-if="isPending">데모 API에 연결하고 있습니다...</p>
    <p v-else-if="notes?.length === 0">아직 저장한 항목이 없습니다. 위에서 등록해 보세요.</p>
    <table v-else class="list">
      <thead><tr><th>제목</th><th>수량</th><th>저장 시각</th></tr></thead>
      <tbody>
        <tr v-for="note in notes" :key="note.id">
          <td>{{ note.title }}</td>
          <td>{{ note.quantity }}</td>
          <td>{{ new Date(note.createdAt).toLocaleString('ko-KR') }}</td>
        </tr>
      </tbody>
    </table>
    <p class="explain">저장 후 <code>invalidateQueries</code>가 자동으로 GET을 재실행합니다. F5 후에도 목록이 남으면 개발 서버 로컬 파일에 저장된 것이며, 브라우저 localStorage에 저장한 것이 아닙니다.</p>
  </section>
</template>

<script setup>
import { ref } from 'vue'
import { useMutation, useQuery, useQueryClient } from '@tanstack/vue-query'
import { fetchDemoNotes, saveDemoNote } from '@/demo/noteApi'
import { noteInputSchema, noteListSchema } from '@/demo/noteSchema'

const title = ref('')
const quantity = ref(1)
const validationMessage = ref('')
const lastSaved = ref('')
const queryClient = useQueryClient()

const { data: notes, isPending, isFetching, isError, error, refetch } = useQuery({
  queryKey: ['integration-lab', 'notes'],
  queryFn: fetchDemoNotes,
  staleTime: 10_000,
  retry: false,
})

const { mutateAsync, isPending: saving, error: saveError } = useMutation({
  mutationFn: saveDemoNote,
  retry: 0,
  onSuccess: async (saved) => {
    lastSaved.value = `API 저장 완료: ${saved.title} (${saved.quantity})`
    title.value = ''
    quantity.value = 1
    await queryClient.invalidateQueries({ queryKey: ['integration-lab', 'notes'] })
  },
})

async function save() {
  if (saving.value) return
  validationMessage.value = ''
  lastSaved.value = ''
  const parsed = noteInputSchema.safeParse({ title: title.value, quantity: quantity.value })
  if (!parsed.success) {
    validationMessage.value = parsed.error.issues.map((issue) => issue.message).join(' / ')
    return
  }
  try {
    await mutateAsync(parsed.data)
  } catch {
    // useMutation의 saveError가 화면에 표시한다.
  }
}

function checkBadSample() {
  const result = noteListSchema.safeParse([{ id: 'wrong', title: '', quantity: '숫자 아님', createdAt: null }])
  validationMessage.value = result.success
    ? '예상치 못하게 유효성 검사를 통과했습니다.'
    : `Zod 차단 확인: ${result.error.issues.map((issue) => issue.path.join('.')).join(', ')}`
}
</script>

<style scoped>
.lab { max-width: 960px; margin: 0 auto; color: #24313a; }
.lab h1 { font-size: 24px; }
.explain { color: #596673; line-height: 1.6; font-size: 14px; }
.endpoint { background: #f1f5f9; padding: 10px; border-radius: 6px; overflow-wrap: anywhere; }
.form { display: grid; gap: 8px; max-width: 560px; padding: 18px; border: 1px solid #dae1e7; border-radius: 8px; }
.form input { padding: 10px; border: 1px solid #aab6c2; border-radius: 5px; }
.actions { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 8px; }
button { background: #27765e; color: white; border: none; border-radius: 5px; padding: 10px 14px; cursor: pointer; }
button:disabled { opacity: 0.55; cursor: not-allowed; }
.status { display: flex; gap: 15px; flex-wrap: wrap; margin: 18px 0; font-size: 14px; }
.status span { background: #eef4f6; border-radius: 5px; padding: 8px; }
.error { color: #a22828; white-space: pre-wrap; }
.ok { color: #17684e; }
.list { width: 100%; border-collapse: collapse; }
.list th, .list td { border-bottom: 1px solid #e3e8eb; text-align: left; padding: 10px; }
</style>
