import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Movementtypes } from "./Movementtypes";
import { Jars } from "./Jars";
import { Tags } from "./Tags";

@Index("movements_pkey", ["id"], { unique: true })
@Entity("movements", { schema: "public" })
export class Movements {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id: number;

  @Column("integer", { name: "amount" })
  amount: number;

  @Column("text", { name: "title" })
  title: string;

  @Column("text", { name: "desc" })
  desc: string;

  @Column("timestamp with time zone", { name: "createdat" })
  createdat: Date;

  @Column("timestamp with time zone", { name: "updatedat" })
  updatedat: Date;

  @ManyToOne(() => Movementtypes, (movementtypes) => movementtypes.movements)
  @JoinColumn([{ name: "movementtypeid", referencedColumnName: "id" }])
  movementtype: Movementtypes;

  @ManyToOne(() => Jars, (jars) => jars.movements)
  @JoinColumn([{ name: "receiverjarid", referencedColumnName: "id" }])
  receiverjar: Jars;

  @ManyToOne(() => Jars, (jars) => jars.movements2)
  @JoinColumn([{ name: "senderjarid", referencedColumnName: "id" }])
  senderjar: Jars;

  @ManyToOne(() => Tags, (tags) => tags.movements)
  @JoinColumn([{ name: "tagid", referencedColumnName: "id" }])
  tag: Tags;
}
