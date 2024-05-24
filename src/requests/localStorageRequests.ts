export const requests = {
  mutationSimulation: (key: string, obj: any, delay = 1000) => {
    return new Promise((resolve, reject) => {
      try {
        setTimeout(() => {
          localStorage.setItem(key, JSON.stringify(obj))
          resolve(`Data stored successfully`)
        }, delay)
      } catch (error) {
        reject(`Error storing data: ${error}`)
      }
    })
  },
  querySimulation: (key: string, delay = 1000) => {
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
