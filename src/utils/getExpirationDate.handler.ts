import { DateTime } from 'luxon'

export const getExpirationDate = (minutes: number = 5) => {
  // Create a date instance
  const currentDate = DateTime.now()

  // Add minutes to the current date
  const futureDate = currentDate.plus({ minutes })

  // Format the future date in the desired format
  const desiredFormat = "yyyy-MM-dd'T'HH:mm:ss.SSSZZ"
  const formattedFutureDate = futureDate.toFormat(desiredFormat)

  return formattedFutureDate
}
