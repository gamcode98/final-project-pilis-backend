export interface Ticket {
  id: number
  qrCode: string
  code: string
  quantity: number
  isWorking: boolean
  cinemaShow: CinemaShow
  createdAt: Date
  updatedAt: Date
}

export interface CinemaShow {
  id: number
  movie: Movie
  room: Room
  capacityAvailable: number
  date: Date
  hour: number
  minutes: number
  price: number
  createdAt: Date
  updatedAt: Date
}

export interface Movie {
  id: number
  title: string
  gender: string
  director: string
  description: string
  trailerUrl: string
  image: Image
  createdAt: Date
  updatedAt: Date
}

export interface Image {
  id: number
  url: string
  createdAt: Date
  updatedAt: Date
}

export interface Room {
  id: number
  name: string
  capacity: number
  createdAt: Date
  updatedAt: Date
}

interface GroupedTicket {
  title: string
  details: Ticket[]
  movieId: number
}

export const groupTicketsByMovieTitle = (tickets: Ticket[]): GroupedTicket[] => {
  const groupedTickets: GroupedTicket[] = []

  tickets.forEach(ticket => {
    const { title, id: movieId } = ticket.cinemaShow.movie

    const existingGroup = groupedTickets.find(group => group.title === title)

    if (!existingGroup) {
      groupedTickets.push({
        title,
        details: [ticket],
        movieId
      })
    } else {
      existingGroup.details.push(ticket)
    }
  })

  return groupedTickets
}
