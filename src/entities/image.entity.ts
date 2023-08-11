import { BaseEntity, Column, CreateDateColumn, Entity, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'
import { Movie } from './movie.entity'

@Entity({ name: 'images' })
export class Image extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
    id: number

  @Column('text')
    url: string

  @OneToOne(() => Movie, (movie) => movie.image)
    movie: Movie

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
