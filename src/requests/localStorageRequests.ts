export const requests = {
  asyncGetItem: (key: string, delay = 1000) => {
    return new Promise((resolve, reject) => {
      try {
        setTimeout(() => {
          const value = localStorage.getItem(key)

          if (value !== null) {
            resolve(value)
          } else {
            reject(`No data found for key: ${key}`)
          }
        }, delay)
      } catch (error) {
        reject(`Error retrieving data: ${error}`)
      }
    })
  },
  asyncSetItem: (key, value, delay = 1000) => {
    return new Promise((resolve, reject) => {
      try {
        setTimeout(() => {
          localStorage.setItem(key, value)
          resolve(`Data stored successfully: ${key} = ${value}`)
        }, delay)
      } catch (error) {
        reject(`Error storing data: ${error}`)
      }
    })
  },
}
