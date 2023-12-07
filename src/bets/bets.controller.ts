import { Body, Controller, Get, Post, Query, Res } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { BetsService } from './bets.service';
import { Response } from 'express';

@Controller('bets')
export class BetsController {
  constructor(
    private configService: ConfigService,
    private betsService: BetsService,
  ) {}

  @Post()
  createBet(
    @Body()
    body: {
      sport: string;
      matchId: string;
      value: number;
      signature: string;
      validTill: number;
      homeToWin: boolean;
    },
    @Res() res,
  ): Promise<Response> {
    return this.betsService.createBet(body, res);
  }

  @Get()
  getBets(@Res() res): Promise<Response> {
    return this.betsService.getAllActiveBets(res);
  }

  @Post('/accept')
  acceptBet(
    @Body()
    body: {
      id: string;
      signature: string;
    },
    @Res() res,
  ): Promise<Response> {
    return this.betsService.acceptBet(body, res);
  }

  @Post('/settle')
  settleBets(
    @Body()
    body: {
      sport: string;
    },
    @Res() res,
  ): Promise<Response> {
    return this.betsService.settleBets(body.sport, res);
  }
}
