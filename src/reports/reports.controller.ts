import { Controller, Post, Body, UseGuards, Param, Patch, Get, Query} from '@nestjs/common';
import { CreateReportDto } from './dtos/create-report.dto';
import { ReportsService } from './reports.service';
import { AuthGuard } from 'src/guard/auth.guard';
import { CurrentUser } from 'src/users/decorators/current-user.decorator';
import { User } from 'src/users/users.entity';
import { ReportDto } from 'src/reports/dtos/report.dto';
import { serialize } from 'src/interceptors/serialize.interceptor';
import { ApproveReportDto } from './dtos/approve-report.dot';
import { AdminGuard } from 'src/guard/admin.guard';
import { GetEstimateDto } from './dtos/get-estimate.dto';


@Controller('reports')
export class ReportsController {
    constructor(private reportService: ReportsService){}

    @UseGuards(AuthGuard)
    @Post()
    @serialize(ReportDto)
    createPost(@Body() body: CreateReportDto, @CurrentUser() user: User){
        return this.reportService.create(body, user)
    }

    @Patch('/:id')
    @UseGuards(AdminGuard)
    approveReport(@Param('id') id: string, @Body() body: ApproveReportDto ){
        return this.reportService.approve(id, body.approved);
    }

    @Get('')
    getEstimate(@Query() query: GetEstimateDto){
         
    }
}
