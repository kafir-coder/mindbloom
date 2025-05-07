import { Column, Entity, ManyToOne } from "typeorm";
import { Base } from "../utils/common/entities/base";
import { Kid } from "../database/entities/kid";

export type TestEntry = {
    question: string
    answer: "yes" | "no"
}


export enum AnswerWeight {
    "yes" = 1,
    "no" = 0,
} 

@Entity()
export class ASDDiagnosis extends Base {

  @ManyToOne(() => Kid, (kid) => kid.asdDiagnosis)
  kid: Kid;

  @Column({ type: "date" })
  diagnosisDate: Date;

  @Column({
    type: "enum",
    enum: ["Mild", "Moderate", "Severe"],
  })
  severityLevel: string;

  @Column("text", { nullable: true })
  treatmentPlan: string;

  @Column({ default: false })
  followUpRequired: boolean;

  @Column("simple-array", { nullable: true })
  medicationsPrescribed: string[];

  @Column("text", { nullable: true })
  professionalNotes: string;

}

@Entity()
export class ADHDDiagnosis extends Base{

    @ManyToOne(() => Kid, (kid) => kid.adhdDiagnosis)
    kid: Kid;
  
    @Column({ type: "date" })
    diagnosisDate: Date;
  
    @Column({
      type: "enum",
      enum: ["Mild", "Moderate", "Severe"],
    })
    severityLevel: string;
  
  
    @Column("text", { nullable: true })
    treatmentPlan: string;
  
    @Column({ default: false })
    followUpRequired: boolean;
  
    @Column("simple-array", { nullable: true })
    medicationsPrescribed: string[];
  
    @Column("text", { nullable: true })
    professionalNotes: string;
  
  }
  

export type  GenericDiagnosis = ASDDiagnosis | ADHDDiagnosis
  