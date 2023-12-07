import { Controller, Get, Injectable, Param } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';

@Injectable()
@Controller('sports')
export class SportsController {
  constructor(private configService: ConfigService) {}

  @Get()
  async getSports(): Promise<string> {
    const response = await axios.get(
      `https://api.the-odds-api.com/v4/sports?apiKey=${this.configService.get<string>(
        'ODDS_API_KEY',
      )}`,
    );
    return JSON.stringify(response.data);
  }

  @Get('/:sportId')
  async getMatches(@Param() params: { sportId: string }): Promise<string> {
    const response = await axios.get(
      `https://api.the-odds-api.com/v4/sports/${
        params.sportId
      }/scores/?daysFrom=3&apiKey=${this.configService.get<string>(
        'ODDS_API_KEY',
      )}`,
    );
    return JSON.stringify(response.data);
  }
}
