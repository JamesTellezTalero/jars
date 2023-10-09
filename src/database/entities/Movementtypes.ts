import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Movements } from "./Movements";

@Index("movementtypes_pkey", ["id"], { unique: true })
@Entity("movementtypes", { schema: "public" })
export class Movementtypes {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id: number;

  @Column("text", { name: "name" })
  name: string;

  @Column("timestamp with time zone", { name: "createdat" })
  createdat: Date;

  @OneToMany(() => Movements, (movements) => movements.movementtype)
  movements: Movements[];
}
