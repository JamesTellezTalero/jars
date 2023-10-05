import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Index('users_pkey', ['id'], { unique: true })
@Entity('users', { schema: 'public' })
export class Users {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'id' })
  id: number;
  @Column('character varying', { name: 'username', length: 150 })
  username: string;
  @Column('character varying', { name: 'email', length: 150 })
  email: string;
  @Column('character varying', { name: 'password', length: 150 })
  password: string;
  @Column('character varying', { name: 'img', length: 150 })
  img: string;
  @Column({})
  darkmode: boolean;
  @CreateDateColumn({
    name: 'createdat',
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: 'updatedat',
    nullable: true,
  })
  updatedat: Date | null;
}
