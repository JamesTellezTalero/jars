import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Movements } from './Movements';

@Index('movementtypes_pkey', ['id'], { unique: true })
@Entity('movement_types', { schema: 'public' })
export class MovementTypes {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'id' })
  id: number;

  @Column('text', { name: 'name' })
  name: string;

  @Column('timestamp with time zone', { name: 'created_at' })
  createdAt: Date;

  @OneToMany(() => Movements, (movements) => movements.movementType)
  movements: Movements[];
}
