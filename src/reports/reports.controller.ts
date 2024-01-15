import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { CreateReportDto } from './dtos/create-report.dto';
import { ReportsService } from './reports.service';
import { AuthGuard } from 'src/guard/auth.guard';
import { CurrentUser } from 'src/users/decorators/current-user.decorator';
import { User } from 'src/users/users.entity';
import { ReportDto } from 'src/reports/dtos/report.dto';
import { serialize } from 'src/interceptors/serialize.interceptor';

@Controller('reports')
export class ReportsController {
    constructor(private reportService: ReportsService){}

    @UseGuards(AuthGuard)
    @Post()
    @serialize(ReportDto)
    createPost(@Body() body: CreateReportDto, @CurrentUser() user: User){
        return this.reportService.create(body, user)
    }
}
