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

  @Column("boolean", { name: "dark_mode", default: () => "false" })
  darkMode: boolean;

  @Column("text", { name: "email" })
  email: string;

  @Column("text", { name: "password" })
  password: string;

  @Column("text", { name: "username" })
  username: string;

  @Column("text", { name: "image" })
  image: string;

  @Column("timestamp with time zone", { name: "created_at" })
  createdAt: Date;

  @Column("timestamp with time zone", { name: "updated_at" })
  updatedAt: Date;

  @OneToMany(() => Jars, (jars) => jars.user)
  jars: Jars[];

  @OneToMany(() => Tags, (tags) => tags.user)
  tags: Tags[];
}
