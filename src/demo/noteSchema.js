import { z } from 'zod'

// API 요청과 응답 모두를 런타임에 검증한다. TypeScript 타입 선언만으로는 대체할 수 없다.
export const noteInputSchema = z.object({
  title: z.string().trim().min(2, '제목은 2자 이상 입력하세요.').max(80, '제목은 80자 이하여야 합니다.'),
  quantity: z.number().int('수량은 정수여야 합니다.').min(1, '수량은 1 이상이어야 합니다.').max(999, '수량은 999 이하여야 합니다.'),
})

export const noteSchema = noteInputSchema.extend({
  id: z.string().uuid(),
  createdAt: z.string().datetime(),
})

export const noteListSchema = z.array(noteSchema)
