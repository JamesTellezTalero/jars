import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Jars } from "./Jars";
import { Tags } from "./Tags";

@Index("jars_pkey", ["id"], { unique: true })
@Entity("users", { schema: "public" })
export class Users {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id: number;

  @Column("boolean", { name: "darkmode", default: () => "false" })
  darkmode: boolean;

  @Column("text", { name: "email" })
  email: string;

  @Column("text", { name: "password" })
  password: string;

  @Column("text", { name: "username" })
  username: string;

  @Column("text", { name: "image" })
  image: string;

  @Column("timestamp with time zone", { name: "createdat" })
  createdat: Date;

  @Column("timestamp with time zone", { name: "updatedat" })
  updatedat: Date;

  @OneToMany(() => Jars, (jars) => jars.user)
  jars: Jars[];

  @OneToMany(() => Tags, (tags) => tags.user)
  tags: Tags[];
}
