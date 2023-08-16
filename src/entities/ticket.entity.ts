import { BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'
import { CinemaShow, Payment, User } from '.'

@Entity({ name: 'tickets' })
export class Ticket extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
    id: number

  @Column('text', { name: 'qr_code' })
    qrCode: string

  @Column('text', { name: 'code' })
    code: string

  @Column('float4')
    quantity: number

  @Column('boolean', { default: true, name: 'is_working' })
    isWorking: boolean

  @ManyToOne(() => CinemaShow, cinemaShow => cinemaShow.tickets)
  @JoinColumn([{ name: 'cinema_shows_id', referencedColumnName: 'id' }])
    cinemaShow: CinemaShow

  @ManyToOne(() => User, (user) => user.tickets)
  @JoinColumn([{ name: 'user_id', referencedColumnName: 'id' }])
    user: User

  @OneToMany(() => Payment, payment => payment.ticket)
    payments: Payment[]

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
