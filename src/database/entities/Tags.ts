import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Movements } from './Movements';
import { Users } from './Users';

@Index('tags_pkey', ['id'], { unique: true })
@Entity('tags', { schema: 'public' })
export class Tags {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'id' })
  id: number;

  @Column('text', { name: 'name', nullable: false })
  name: string;

  @Column('timestamp with time zone', { name: 'created_at', nullable: false })
  createdAt: Date;

  @Column('timestamp with time zone', { name: 'updated_at', nullable: false })
  updatedAt: Date;

  @OneToMany(() => Movements, (movements) => movements.tag)
  movements: Movements[];

  @ManyToOne(() => Users, (users) => users.tags)
  @JoinColumn([{ name: 'user_id', referencedColumnName: 'id' }])
  user: Users;
}
