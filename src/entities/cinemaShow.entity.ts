import { BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'
import { Movie, Room } from '.'

@Entity({ name: 'cinema_shows' })
export class CinemaShow extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
    id: number

  @PrimaryColumn({ name: 'movie_id' })
    movieId: number

  @PrimaryColumn({ name: 'room_id' })
    roomId: number

  @ManyToOne(() => Movie, (movie) => movie.rooms)
  @JoinColumn([{ name: 'movie_id', referencedColumnName: 'id' }])
    movie: Movie[]

  @ManyToOne(() => Room, (room) => room.movies)
  @JoinColumn([{ name: 'room_id', referencedColumnName: 'id' }])
    room: Room[]

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
