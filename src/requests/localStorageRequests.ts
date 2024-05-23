import { Quiz } from '@/types'

export const requests = {
  asyncAddQuiz: (key: string, quiz: Quiz[], delay = 1000) => {
    return new Promise((resolve, reject) => {
      try {
        setTimeout(() => {
          localStorage.setItem(key, JSON.stringify(quiz))
          resolve(`Data stored successfully`)
        }, delay)
      } catch (error) {
        reject(`Error storing data: ${error}`)
      }
    })
  },
  asyncGetItem: (key: string, delay = 1000) => {
    return new Promise((resolve, reject) => {
      try {
        setTimeout(() => {
          const value = localStorage.getItem(key)

          if (value !== null) {
            resolve(JSON.parse(value))
          } else {
            reject(`No data found for key: ${key}`)
          }
        }, delay)
      } catch (error) {
        reject(`Error retrieving data: ${error}`)
      }
    })
  },
}
