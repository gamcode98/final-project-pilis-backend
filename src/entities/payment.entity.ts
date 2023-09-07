import { BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { Ticket } from '.'

@Entity({ name: 'payments' })
export class Payment extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
    id: number

  @Column('float4', { name: 'transaction_amount' })
    transactionAmount: number

  @Column('text', { name: 'payment_method' })
    paymentMethod: string

  @ManyToOne(() => Ticket, (ticket) => ticket.payments)
  @JoinColumn([{ name: 'ticket_id', referencedColumnName: 'id' }])
    ticket: Ticket

  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP'
  })
    createdAt: Date
}
