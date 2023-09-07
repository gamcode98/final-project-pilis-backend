import { BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'
import { TEMPORAL_RESERVATION_STATUS } from '../enums'
import { CinemaShow } from '.'

@Entity({ name: 'temporal_reservations' })
export class TemporalReservation extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
    id: number

  @Column('text', { default: TEMPORAL_RESERVATION_STATUS.PENDING })
    status: string

  @Column('int4')
    quantity: number

  @ManyToOne(() => CinemaShow, (cinemaShow) => cinemaShow.temporalReservations)
  @JoinColumn({ name: 'cinema_show_id' })
    cinemaShow: CinemaShow

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
