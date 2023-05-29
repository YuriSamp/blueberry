export interface Idiary {
  title: string
  date: string
  emotion: string
  text: string
  id: number
  color: string
}

export type SetAtom<Args extends unknown[], Result> = <A extends Args>(
  ...args: A
) => Result
