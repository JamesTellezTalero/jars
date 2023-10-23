import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("users_roles_pkey", ["id"], { unique: true })
@Entity("users_roles", { schema: "public" })
export class UsersRoles {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id: number;

  @Column("text", { name: "name" })
  name: string;

  @Column("timestamp without time zone", { name: "created_at", nullable: true })
  createdAt: Date | null;
}
