export function UpperCaseFirstLetter(word: string) {
  if (word === undefined) {
    return word
  }
  const firstLetter = word.slice(0, 1)
  const firstLetterUpperCase = firstLetter.toUpperCase()
  return firstLetterUpperCase + word.slice(1)
}
