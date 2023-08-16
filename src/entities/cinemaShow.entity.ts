import { BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'
import { Movie, Room, TemporalReservation, Ticket } from '.'

@Entity({ name: 'cinema_shows' })
export class CinemaShow extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
    id: number

  @ManyToOne(() => Movie, (movie) => movie.cinemaShows)
  @JoinColumn([{ name: 'movie_id', referencedColumnName: 'id' }])
    movie: Movie

  @ManyToOne(() => Room, (room) => room.cinemaShows)
  @JoinColumn([{ name: 'room_id', referencedColumnName: 'id' }])
    room: Room

  @OneToMany(() => TemporalReservation, (temporalReservation) => temporalReservation.cinemaShow)
    temporalReservations: TemporalReservation[]

  @OneToMany(() => Ticket, ticket => ticket.cinemaShow)
    tickets: Ticket[]

  @Column('int4', { name: 'capacity_available' })
    capacityAvailable: number

  @Column('date')
    date: Date

  @Column('int4')
    hour: number

  @Column('int4')
    minutes: number

  @Column('float4')
    price: number

  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP'
  })
    createdAt: Date

  @UpdateDateColumn({
    name: 'updated_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP'
  })
    updatedAt: Date
}
