interface Room {
  id: number
  name: string
  capacity: number
  createdAt: Date
  updatedAt: Date
}

interface DataItem {
  id: number
  room: Room
  capacityAvailable: number
  date: any
  hour: number
  minutes: number
  price: number
  createdAt: Date
  updatedAt: Date
}

export const formatCinemaShows = (data: DataItem[]): Record<string, Record<string, DataItem[]>> => {
  const grouped: Record<string, Record<string, DataItem[]>> = {}

  data.forEach((item: DataItem) => {
    const roomKey = `${item.room.id}-${item.room.name}`
    const dateKey = item.date

    if (!grouped[roomKey]) {
      grouped[roomKey] = {}
    }

    if (!grouped[roomKey][dateKey]) {
      grouped[roomKey][dateKey] = []
    }

    grouped[roomKey][dateKey].push(item)
  })

  // Ordenar por horas cada item dentro de cada dateKey - ascendente
  for (const roomKey in grouped) {
    for (const dateKey in grouped[roomKey]) {
      grouped[roomKey][dateKey].sort((a, b) => {
        const hourA = a.hour
        const hourB = b.hour
        return hourA - hourB
      })
    }
  }

  // Ordenar por fecha cada dateKey - ascendente
  for (const roomKey in grouped) {
    const room = grouped[roomKey]
    const sortedDates = Object.keys(room).sort((a, b) => new Date(a).getTime() - new Date(b).getTime())

    const sortedRoom: Record<string, DataItem[]> = {}
    for (const dateKey of sortedDates) {
      sortedRoom[dateKey] = room[dateKey]
    }

    grouped[roomKey] = sortedRoom
  }

  return grouped
}
