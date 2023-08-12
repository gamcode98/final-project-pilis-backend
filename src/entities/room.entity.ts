import { BaseEntity, Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'
import { CinemaShow, Movie } from '.'

@Entity({ name: 'rooms' })
export class Room extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
    id: number

  @Column('text')
    name: string

  @Column('int4', { name: 'capacity_available' })
    capacityAvailable: number

  @OneToMany(() => CinemaShow, cinemaShow => cinemaShow.room)
    cinemaShows: CinemaShow[]

  movies: Movie[]

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
