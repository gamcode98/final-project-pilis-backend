import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { User } from './user.entity'

@Entity({ name: 'roles' })
export class Role extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
    id: number

  @OneToMany(() => User, (user) => user.rol)
    users: User[]

  @Column('text')
    name: string
}
