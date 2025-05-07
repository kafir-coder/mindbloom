import { Column, Entity } from "typeorm";
import { Base } from "../../utils/common/entities/base";

@Entity() 
export class Question extends Base{
    @Column()
    question: string
    
    @Column()
    type: string
}