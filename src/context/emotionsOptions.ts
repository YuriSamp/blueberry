import { atom } from 'jotai'

import { ITags } from '@lib/validations/diary'

export const colors = [
  { name: 'Blue', color: '#47B7DC' },
  { name: 'Orange', color: '#FF9900' },
  { name: 'Yellow', color: '#F6D155' },
  { name: 'Green', color: '#66A586' },
  { name: 'Beige', color: '#D8C49F' },
  { name: 'Pink', color: '#F698BD ' },
  { name: 'Purple', color: '#BD86D2' },
  { name: 'Red', color: '#D8807D ' },
  { name: 'Grey', color: '#CCCAC9' },
]

export const emotionsOptions = atom<ITags[]>([])
