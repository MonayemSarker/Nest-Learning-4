import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ReportsModule } from './reports/reports.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/users.entity';
import { Report } from './reports/reports.entity';
import { ConfigService, ConfigModule } from '@nestjs/config';
const cookieSession = require('cookie-session');


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env`,
    }),
    // TypeOrmModule.forRoot()
  //   type: 'sqlite',
  //   database: 'db.sqlite',
  //   entities: [User, Report],
  //   synchronize: true

  // }),
  TypeOrmModule.forRootAsync({
    inject: [ConfigService],
    useFactory: (config: ConfigService) => {
      return {
        type: 'sqlite',
        database: config.get<string>('DB_NAME'),
        entities: [User, Report],
        synchronize: true,
        migrations: ['migrations/*.js'],
        cli: {
          migrationDir: 'migrations',
        }
      }
    }
  }),
  UsersModule,
  ReportsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(private configService: ConfigService){}
    configure(consume: MiddlewareConsumer){
      consume.apply(
        cookieSession(
         { keys: [this.configService.get('COOKIE_KEY')]}
        )
      ).forRoutes('*');
    }  
}
 