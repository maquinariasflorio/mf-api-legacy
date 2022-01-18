import { Args, Query, Resolver } from '@nestjs/graphql'
import { ReportService } from './report.service'
import { DailyReport } from './results/daily.result'
import { DailyPayStateReport } from './results/dailyPayStateReport.result'

@Resolver()
export class ReportResolver {

    constructor(
        private readonly reportService: ReportService
    ) {}

    @Query( () => DailyReport)
    async getDailyResume(@Args('date') date: string) {

        return await this.reportService.getDailyResume(date)
    
    }

    @Query( () => [ DailyPayStateReport ] )
    async getDailyPayState(@Args('date') date: string) {

        return await this.reportService.getDailyPayState(date)
    
    }

}
