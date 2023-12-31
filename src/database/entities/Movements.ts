import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { MovementTypes } from './MovementTypes';
import { Jars } from './Jars';
import { Tags } from './Tags';

@Index('movements_pkey', ['id'], { unique: true })
@Entity('movements', { schema: 'public' })
export class Movements {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'id' })
  id: number;

  @Column('integer', { name: 'amount', nullable: false })
  amount: number;

  @Column('text', { name: 'title', nullable: false })
  title: string;

  @Column('text', { name: 'desc', nullable: false })
  desc: string;

  @Column('timestamp with time zone', { name: 'created_at', nullable: false })
  createdAt: Date;

  @Column('timestamp with time zone', { name: 'updated_at', nullable: false })
  updatedAt: Date;

  @ManyToOne(() => MovementTypes, (movementTypes) => movementTypes.movements)
  @JoinColumn([{ name: 'movement_type_id', referencedColumnName: 'id' }])
  movementType: MovementTypes;

  @ManyToOne(() => Jars, (jars) => jars.incomeMovements)
  @JoinColumn([{ name: 'receiver_jar_id', referencedColumnName: 'id' }])
  receiverJar: Jars;

  @ManyToOne(() => Jars, (jars) => jars.outcomeMovements)
  @JoinColumn([{ name: 'sender_jar_id', referencedColumnName: 'id' }])
  senderJar: Jars;

  @ManyToOne(() => Tags, (tags) => tags.movements)
  @JoinColumn([{ name: 'tagid', referencedColumnName: 'id' }])
  tag: Tags;
}
