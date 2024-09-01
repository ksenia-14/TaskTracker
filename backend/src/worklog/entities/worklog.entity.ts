import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "src/user/entities/user.entity";
import { Task } from "src/task/entities/task.entity";

@Entity()
export class Worklog {
  @PrimaryGeneratedColumn()
  id: number

  @ManyToOne(() => User, (user) => user.worklog)
  @JoinColumn({ name: 'user_id' })
  user:User

  @ManyToOne(() => Task, (task) => task.worklog, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'task_id' })
  task:Task

  @Column()
  progress: number
}
