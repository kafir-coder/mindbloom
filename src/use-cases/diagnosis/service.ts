import { ASDDiagnosis, TestEntry } from '../../entities/diagnosis';
import { IDiagnosisSvc, IDiagnosisRepository } from '../../interfaces/diagnosis';
import { calculateDiagnosis } from '../../utils/functions/calculate-diagnosis';
export class DiagnosisSvc implements IDiagnosisSvc {

    constructor(
        private readonly diagnosisRepository: IDiagnosisRepository
    ) {

    }
    listAdhdDiagnosis(page: number, limit: number, filters?: { severityLevel?: string; }): Promise<{ data: ASDDiagnosis[]; totalCount: number; totalPages: number; currentPage: number; }> {
        return this.diagnosisRepository.listAdhdDiagnosis(page, limit, filters)
    }
    listASDDIagnosis(page: number, limit: number, filters?: { severityLevel?: string; }): Promise<{ data: ASDDiagnosis[]; totalCount: number; totalPages: number; currentPage: number; }> {
        return this.diagnosisRepository.listASDDIagnosis(page, limit, filters)
    }
    getASDTest(kid_id: string): Promise<ASDDiagnosis | null> {
        return this.diagnosisRepository.getASDTest(kid_id)
    }
    async getADHDTest(kid_id: string) {
        return this.diagnosisRepository.getADHDTest(kid_id)
    }
    getASDTestQuestions(){
        return this.diagnosisRepository.getASDTestQuestions()
    }
    getADHDTestQuestions(){
        return this.diagnosisRepository.getADHDTestQuestions()
    }
    async generateASDTestResult(kid_id: string, answers: TestEntry[]) {

        const result = calculateDiagnosis(answers)


        await this.diagnosisRepository.createASDTest(kid_id, result.severity)
        
        return this.diagnosisRepository.getASDTest(kid_id)

    }
    async generateADHDTestResult(kid_id: string, answers: TestEntry[]) {
        const result = calculateDiagnosis(answers)


        await this.diagnosisRepository.createADHDTest(kid_id, result.severity)
        
        return this.diagnosisRepository.getADHDTest(kid_id)
    }

}