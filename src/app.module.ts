import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { SportsModule } from './sports/sports.module';
import { BetsModule } from './bets/bets.module';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DatabaseModule,
    SportsModule,
    BetsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
