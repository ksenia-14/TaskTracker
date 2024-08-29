import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Task } from "./task.entity";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  login: string

  @Column()
  password: string

  @Column()
  name: string

  @Column()
  role: string

  @OneToMany(() => Task, (task) => task.user, { onDelete: 'SET NULL' })
  tasks: Task[]
}

