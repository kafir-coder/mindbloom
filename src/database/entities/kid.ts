import { Column, Entity, ManyToOne, OneToOne } from "typeorm";
import { User } from "./user";
import { ADHDDiagnosis, ASDDiagnosis } from "../../entities/diagnosis";
import { Base } from "../../utils/common/entities/base";

@Entity()
export class Kid extends Base {

  @Column()
  name: string;

  @Column({ type: "date" })
  dateOfBirth: Date;

  @ManyToOne(() => User, (user) => user.kids)
  parent: User;

  @OneToOne(() => ADHDDiagnosis, (adhdDiagnosis) => adhdDiagnosis.kid, { nullable: true })
  adhdDiagnosis: ADHDDiagnosis;

  @OneToOne(() => ASDDiagnosis, (asdDiagnosis) => asdDiagnosis.kid, { nullable: true })
  asdDiagnosis: ASDDiagnosis;
}