export const getUniqueStringsArray = (array: string[]): string[] => {
  return Array.from(new Set(array))
}
