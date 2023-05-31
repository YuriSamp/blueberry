export interface Idiary {
  title: string
  date: string
  emotion: string
  text: string
  color: string
  id: number
}

export type SetAtom<Args extends unknown[], Result> = <A extends Args>(
  ...args: A
) => Result
