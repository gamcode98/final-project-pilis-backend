import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { User } from './user.entity'

@Entity({ name: 'roles' })
export class Role {
  @PrimaryGeneratedColumn('increment')
    id: number

  @OneToMany(() => User, (user) => user.rol)
    users: User[]

  @Column('text')
    name: string
}
