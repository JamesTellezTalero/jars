import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Users } from './Users';
import { Movements } from './Movements';

@Index('jars_pkey1', ['id'], { unique: true })
@Entity('jars', { schema: 'public' })
export class Jars {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'id' })
  id: number;

  @Column('text', { name: 'name', nullable: false })
  name: string;

  @Column('text', { name: 'color', nullable: false })
  color: string;

  @Column('int', { name: 'percent', nullable: false, default: 0 })
  percent: number;

  @Column('timestamp with time zone', { name: 'created_at', nullable: false })
  createdAt: Date;

  @Column('timestamp with time zone', { name: 'updated_at', nullable: false })
  updatedAt: Date;

  @ManyToOne(() => Users, (users) => users.jars)
  @JoinColumn([{ name: 'user_id', referencedColumnName: 'id' }])
  user: Users;

  @OneToMany(() => Movements, (movements) => movements.receiverJar)
  incomeMovements: Movements[];

  @OneToMany(() => Movements, (movements) => movements.senderJar)
  outcomeMovements: Movements[];
}
