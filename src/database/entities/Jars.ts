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

  @Column("timestamp with time zone", { name: "createdat" })
  createdat: Date;

  @Column("timestamp with time zone", { name: "updatedat" })
  updatedat: Date;

  @ManyToOne(() => Users, (users) => users.jars)
  @JoinColumn([{ name: "userid", referencedColumnName: "id" }])
  user: Users;

  @OneToMany(() => Movements, (movements) => movements.receiverjar)
  movements: Movements[];

  @OneToMany(() => Movements, (movements) => movements.senderjar)
  movements2: Movements[];
}
