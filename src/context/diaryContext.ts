import { atom } from 'jotai'

import { Idiary } from '@lib/validations/diary'

export const diaryPage = atom<Idiary[]>([])
