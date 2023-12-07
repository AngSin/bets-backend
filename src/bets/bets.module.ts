import { Module } from '@nestjs/common';
import { BetsController } from './bets.controller';
import { BetsService } from './bets.service';
import { Bet } from './bets.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Bet])],
  controllers: [BetsController],
  providers: [BetsService],
})
export class BetsModule {}
