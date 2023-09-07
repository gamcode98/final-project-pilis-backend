import { BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'
import { CinemaShow, Image } from '.'

@Entity({ name: 'movies' })
export class Movie extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
    id: number

  @Column('text', { unique: true })
    title: string

  @Column('text')
    gender: string

  @Column('text')
    director: string

  @Column('text')
    description: string

  @Column('text', { name: 'trailer_url' })
    trailerUrl: string

  @OneToOne(() => Image)
  @JoinColumn({ name: 'image_id' })
    image: Image

  @OneToMany(() => CinemaShow, cinemaShow => cinemaShow.movie)
    cinemaShows: CinemaShow[]

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
