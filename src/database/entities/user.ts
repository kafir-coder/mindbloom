import { Column, Entity, OneToMany } from "typeorm";
import { Kid } from "./kid";
import { Base } from "../../utils/common/entities/base";

@Entity()
export class User extends Base {

  @Column()
  name: string
  @Column({ unique: true })
  email: string;

  @Column()
  passwordHash: string;

  @Column({
    type: "enum",
    enum: ["Parent", "Psychologist"],
  })
  role: string;

  @Column({ default: true })
  isActive: boolean;

  @Column()
  gender: string

  @OneToMany(() => Kid, (kid) => kid.parent)
  kids: Kid[];


  @Column({nullable: true})
  description: string

  @Column({nullable: true, type: 'double precision'})
  rating: number

  @Column({nullable: true})
  ratingCount: number

  @Column({nullable: true})
  image: string

  @Column({nullable: true})
  occupation: string


}