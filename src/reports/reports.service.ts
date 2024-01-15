import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateReportDto } from './dtos/create-report.dto';
import { Report } from './reports.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/users.entity';
import { ApproveReportDto } from './dtos/approve-report.dot';

@Injectable()
export class ReportsService {
    constructor(@InjectRepository(Report) private repo:Repository<Report>){

    }

    create(reportDto: CreateReportDto, user: User){
        const report = this.repo.create(reportDto);
        report.user = user;
        return this.repo.save(report);
    }

    async approve(id: string, approved: boolean){
        const report = await this.repo.findOne({
            where: {id: parseInt(id)}
        });
        if(!report){
            throw new NotFoundException('Report not found');
        }


        report.approved = approved;
        return this.repo.save(report);
    }
}
