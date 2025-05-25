import { Column, Entity, ManyToOne, OneToOne } from "typeorm";
import { User } from "./user";
import { Base } from "../../utils/common/entities/base";

@Entity()
export class Kid extends Base {

  @Column()
  name: string;

  @Column({ type: "date" })
  dateOfBirth: Date;
  
  @ManyToOne(() => User, (user) => user.kids)
  parent: User;



  @Column()
  asdDiagnosisPercertage: number
  @Column()
  adhdDiagnosisPercentage: number
}