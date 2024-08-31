import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Task } from "src/task/entities/task.entity";
import { Worklog } from "src/worklog/entities/worklog.entity";

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

  @Column('simple-array')
  roles: string[]

  @OneToMany(() => Task, (task) => task.user, { onDelete: 'SET NULL' })
  tasks_user: Task[]

  @OneToMany(() => Task, (task) => task.user, { onDelete: 'SET NULL' })
  tasks_admin: Task[]

  @OneToMany(() => Worklog, (worklog) => worklog.user, { onDelete: 'NO ACTION' })
  worklog: Worklog[]
}

