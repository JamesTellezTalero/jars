import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Movements } from "./Movements";
import { Users } from "./Users";

@Index("tags_pkey", ["id"], { unique: true })
@Entity("tags", { schema: "public" })
export class Tags {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id: number;

  @Column("text", { name: "name" })
  name: string;

  @Column("timestamp with time zone", { name: "createdat" })
  createdat: Date;

  @Column("timestamp with time zone", { name: "updatedat" })
  updatedat: Date;

  @OneToMany(() => Movements, (movements) => movements.tag)
  movements: Movements[];

  @ManyToOne(() => Users, (users) => users.tags)
  @JoinColumn([{ name: "userid", referencedColumnName: "id" }])
  user: Users;
}
