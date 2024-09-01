import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { User } from "src/user/entities/user.entity";
import { TaskType } from "../enum/task-type.enum";
import { Worklog } from "src/worklog/entities/worklog.entity";

@Entity()
export class Task {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  title: string

  @Column({ type: 'enum', enum: TaskType, default: TaskType.TASK })
  type: string

  @Column()
  progress: number

  @Column()
  description: string

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date

  @CreateDateColumn({ name: 'execute_at' })
  executeAt: Date

  @ManyToOne(() => User, (user) => user.tasks_user, { nullable: true })
  @JoinColumn({ name: 'user_id' })
  user:User

  @ManyToOne(() => User, (user) => user.tasks_admin, { nullable: false })
  @JoinColumn({ name: 'admin_id' })
  admin:User

  @OneToMany(() => Worklog, (worklog) => worklog.task, { onDelete: 'CASCADE' })
  worklog: Worklog[]
}
