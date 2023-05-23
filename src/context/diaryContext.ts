import { atom } from 'jotai'

import { Idiary } from 'src/types/diaryTypes'

export const diaryPage = atom<Idiary[]>([])
export const diaryId = atom<number>(1)
