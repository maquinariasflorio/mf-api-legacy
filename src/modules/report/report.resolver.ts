import { Args, Query, Resolver } from '@nestjs/graphql'
import { ReportService } from './report.service'
import { DailyReport } from './results/daily.result'

@Resolver()
export class ReportResolver {

    constructor(
        private readonly reportService: ReportService
    ) {}

    @Query( () => DailyReport)
    async getDailyResume(@Args('date') date: string) {

        return await this.reportService.getDailyResume(date)
    
    }

    @Query( () => DailyReport)
    async getDailyPayState(@Args('date') date: string) {

        return await this.reportService.getDailyPayState(date)
    
    }

}
