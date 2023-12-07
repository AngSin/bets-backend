import { Module } from '@nestjs/common';
import { SportsController } from './sports.controller';

@Module({
  imports: [],
  controllers: [SportsController],
  providers: [],
})
export class SportsModule {}
