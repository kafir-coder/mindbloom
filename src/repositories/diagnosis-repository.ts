import { ILike, Repository } from "typeorm";
import { AppDataSource } from "../database/data-source";
import { ADHDDiagnosis, ASDDiagnosis, TestEntry } from "../entities/diagnosis";
import { IDiagnosisRepository } from "../interfaces/diagnosis";
import { Question } from "../database/entities/questions";

export class DiagnosisRepository implements IDiagnosisRepository {
    adhdDiagnosisRepository: Repository<ADHDDiagnosis>
    asdDiagnosisRepository: Repository<ASDDiagnosis>
    questionsRepository: Repository<Question>

    constructor (

    ) {
        this.adhdDiagnosisRepository = AppDataSource.getRepository(ADHDDiagnosis)
        this.asdDiagnosisRepository = AppDataSource.getRepository(ASDDiagnosis)
        this.questionsRepository = AppDataSource.getRepository(Question)
    }

    getASDTest(kid_id: string): Promise<ASDDiagnosis | null> {
        return this.asdDiagnosisRepository.findOne({
            where: {kid: {id: kid_id}},
            relations: ["kid"]
        })
    }
    getADHDTest(kid_id: string): Promise<ADHDDiagnosis | null> {
        return this.adhdDiagnosisRepository.findOne({
            where: {kid: {id: kid_id}},
            relations: ["kid"]
        })
    }

    async listAdhdDiagnosis(
        page: number = 1,
        limit: number = 10,
        filters?: { severityLevel?: string }
    ) {
        const offset = (page - 1) * limit;

        const where: any = {};
        if (filters?.severityLevel) where.name = ILike(`%${filters.severityLevel}%`);

        const [diagnosies, totalCount] = await this.adhdDiagnosisRepository.findAndCount({
            where,
            take: limit,
            skip: offset,
            relations: ['kid']
        });

        return {
            data: diagnosies,
            totalCount,
            totalPages: Math.ceil(totalCount / limit),
            currentPage: page
        };
    }

    async listASDDIagnosis(
        page: number, 
        limit: number, 
        filters?: { severityLevel?: string }
    ): Promise<{ 
        data: ASDDiagnosis[]; 
        totalCount: number; 
        totalPages: number; 
        currentPage: number; 
    }> {
        const offset = (page - 1) * limit;

        const where: any = {};
        if (filters?.severityLevel) where.name = ILike(`%${filters.severityLevel}%`);

        const [diagnosies, totalCount] = await this.asdDiagnosisRepository.findAndCount({
            where,
            take: limit,
            skip: offset,
            relations: ['kid']
        });

        return {
            data: diagnosies,
            totalCount,
            totalPages: Math.ceil(totalCount / limit),
            currentPage: page
        };
    }
    async getASDTestQuestions() {
        const questions = await this.questionsRepository.find({
            where: {
                type: 'asd'
            }
        })

        return questions.map(({question}) => question)
    }
    async getADHDTestQuestions(){
        const questions = await  this.questionsRepository.find({
            where: {
                type: 'adhd'
            }
        })
        return questions.map(({question}) => question)
    }
    async createASDTest(kid_id: string, severityLevel: string) {
        await this.asdDiagnosisRepository.save({
            kid: {
                id: kid_id
            },
            diagnosisDate: new Date(),
            severityLevel,
        })
    }

    async createADHDTest(kid_id: string, severityLevel: string) {
        await this.adhdDiagnosisRepository.save({
            kid: {
                id: kid_id
            },
            diagnosisDate: new Date(),
            severityLevel,
        })
    }
    
}