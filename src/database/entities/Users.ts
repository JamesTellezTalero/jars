import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Jars } from './Jars';
import { Tags } from './Tags';
import { Exclude } from 'class-transformer';

@Index('jars_pkey', ['id'], { unique: true })
@Entity('users', { schema: 'public' })
export class Users {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'id' })
  id: number;

  @Column('boolean', {
    name: 'dark_mode',
    default: () => 'false',
    nullable: false,
  })
  darkMode: boolean;

  @Column('text', { name: 'email', nullable: false })
  email: string;

  @Column('text', { name: 'password', nullable: false })
  password: string;

  @Column('text', { name: 'username', nullable: false })
  username: string;

  @Column('text', { name: 'image', nullable: false })
  image: string;

  @Column('timestamp with time zone', { name: 'created_at', nullable: false })
  createdAt: Date;

  @Column('timestamp with time zone', { name: 'updated_at', nullable: false })
  updatedAt: Date;

  @Column('timestamp with time zone', { name: 'cute_off_date', nullable: true })
  cute_off_date: Date;

  @OneToMany(() => Jars, (jars) => jars.user)
  jars: Jars[];

  @OneToMany(() => Tags, (tags) => tags.user)
  tags: Tags[];
}
