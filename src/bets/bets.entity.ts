import { Entity, Column, Index, PrimaryGeneratedColumn, Check } from 'typeorm';

@Entity('bets')
@Index(['creatorId', 'matchId', 'completed'])
export class Bet {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  sport: string;

  @Column()
  matchId: string;

  @Column({
    type: 'timestamp',
  })
  validTill: Date;

  @Column()
  creatorId: string;

  @Column({
    nullable: true,
  })
  competitorId: string;

  @Column({
    nullable: true,
  })
  winnerId: string;

  @Column({
    type: 'bigint',
  })
  @Check(`"value" >= 0`)
  value: number;

  @Column()
  homeToWin: boolean;

  @Column({
    type: 'boolean',
    default: false,
  })
  completed: boolean;
}
