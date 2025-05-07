import { ADHDDiagnosis, ASDDiagnosis, TestEntry } from "../entities/diagnosis"

export interface IDiagnosisSvc {
    

    getASDTest(kid_id: string): Promise<ASDDiagnosis | null>
    getADHDTest(kid_id: string): Promise<ADHDDiagnosis | null>

    getASDTestQuestions(): Promise<string[]>
    getADHDTestQuestions(): Promise<string[]>

    generateASDTestResult(kid_id: string, answers: TestEntry[]): Promise<ASDDiagnosis | null>
    generateADHDTestResult(kid_id: string, answers: TestEntry[]): Promise<ADHDDiagnosis | null>


    listAdhdDiagnosis(
        page: number,
        limit: number,
        filters?: { severityLevel?: string }
    ): Promise<{
        data: ASDDiagnosis[],
        totalCount: number,
        totalPages: number,
        currentPage: number
    }>

    listASDDIagnosis(
        page: number,
        limit: number,
        filters?: { severityLevel?: string }
    ): Promise<{
        data: ASDDiagnosis[],
        totalCount: number,
        totalPages: number,
        currentPage: number
    }>
}

export interface IDiagnosisRepository {

    createASDTest(kid_id: string, severityLevel: string): void
    createADHDTest(kid_id: string, severityLevel:string): void

    getASDTest(kid_id: string): Promise<ASDDiagnosis | null>
    getADHDTest(user_id: string): Promise<ADHDDiagnosis | null>


    listAdhdDiagnosis(
        page: number,
        limit: number,
        filters?: { severityLevel?: string }
    ): Promise<{
        data: ASDDiagnosis[],
        totalCount: number,
        totalPages: number,
        currentPage: number
    }>

    listASDDIagnosis(
        page: number,
        limit: number,
        filters?: { severityLevel?: string }
    ): Promise<{
        data: ASDDiagnosis[],
        totalCount: number,
        totalPages: number,
        currentPage: number
    }>
    listAdhdDiagnosis(
        page: number,
        limit: number,
        filters?: { severityLevel?: string }
    ): Promise<{
        data: ASDDiagnosis[],
        totalCount: number,
        totalPages: number,
        currentPage: number
    }>

    listASDDIagnosis(
        page: number,
        limit: number,
        filters?: { severityLevel?: string }
    ): Promise<{
        data: ASDDiagnosis[],
        totalCount: number,
        totalPages: number,
        currentPage: number
    }>

    getASDTestQuestions(): Promise<string[]>
    getADHDTestQuestions(): Promise<string[]>
}