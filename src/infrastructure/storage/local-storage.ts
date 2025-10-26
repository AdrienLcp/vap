'use client'

type LocalStorage = {
  locale: string
}

type LocaleStorageKey = keyof LocalStorage

const clear = () => {
  window.localStorage.clear()
}

const find = <K extends LocaleStorageKey>(key: K): LocalStorage[K] | null => {
  const item = window.localStorage.getItem(key)

  if (!item || item === 'undefined') {
    return null
  }

  try {
    return JSON.parse(item)
  } catch {
    console.warn(`Parsing error for key "${key}"`)
    return null
  }
}

const remove = (key: LocaleStorageKey) => {
  window.localStorage.removeItem(key)
}

const set = <K extends LocaleStorageKey>(key: K, value: LocalStorage[K]) => {
  window.localStorage.setItem(key, JSON.stringify(value))
}

export const LocaleStorage = {
  clear,
  find,
  remove,
  set
}
