import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Users } from "./Users";
import { Movements } from "./Movements";

@Index("jars_pkey1", ["id"], { unique: true })
@Entity("jars", { schema: "public" })
export class Jars {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id: number;

  @Column("text", { name: "name" })
  name: string;

  @Column("text", { name: "color" })
  color: string;

  @Column("text", { name: "percent" })
  percent: string;

  @Column("timestamp with time zone", { name: "created_at" })
  createdAt: Date;

  @Column("timestamp with time zone", { name: "updated_at" })
  updatedAt: Date;

  @ManyToOne(() => Users, (users) => users.jars)
  @JoinColumn([{ name: "user_id", referencedColumnName: "id" }])
  user: Users;

  @OneToMany(() => Movements, (movements) => movements.receiverJar)
  movements: Movements[];

  @OneToMany(() => Movements, (movements) => movements.senderJar)
  movements2: Movements[];
}
