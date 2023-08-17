import { DateTime } from 'luxon'
import { EXPIRATION_MINUTES } from '../enums'

export const getExpirationDate = (minutes: EXPIRATION_MINUTES = 5) => {
  const currentDate = DateTime.now()

  const futureDate = currentDate.plus({ minutes })

  const desiredFormat = "yyyy-MM-dd'T'HH:mm:ss.SSSZZ"
  const formattedFutureDate = futureDate.toFormat(desiredFormat)

  return {
    expirationDate: formattedFutureDate,
    minute: futureDate.minute,
    hour: futureDate.hour,
    dayOfMonth: futureDate.day,
    month: futureDate.month,
    dayOfWeek: futureDate.weekday
  }
}
