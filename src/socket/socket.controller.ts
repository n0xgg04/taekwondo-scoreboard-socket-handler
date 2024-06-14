import { Controller, Get, Param, ParseIntPipe, Query } from '@nestjs/common';
import { SocketService } from './socket.service';
import { SocketGateway } from './socket.gateway';
import { TeamPipe } from './socket.pipe';
import { SocketResponse } from './socket.interface';
import { BattleService } from '../battle/battle.service';

@Controller('')
export class SocketController {
  constructor(
    private service: SocketService,
    private socket: SocketGateway,
    private battleService: BattleService,
  ) {}

  @Get('/setTimer')
  setCounter(@Query('time', ParseIntPipe) time: number): SocketResponse {
    this.socket.server.emit('set_counter', time);
    return {
      message: 'Success',
    };
  }

  @Get('/increasePoint/:team')
  setPoint(
    @Param('team', TeamPipe) team: 'red' | 'blue',
    @Query('point', ParseIntPipe) point: number,
  ): SocketResponse {
    if (team == 'red') {
      this.battleService.redPoint += point;
    } else {
      this.battleService.bluePoint += point;
    }
    this.socket.server.emit(`inc_point_${team}`, point);
    return {
      message: `Increased team ${team} ${point} point`,
    };
  }

  @Get('/setName/:team')
  setName(
    @Param('team', TeamPipe) team: 'red' | 'blue',
    @Query('name') name: string,
  ) {
    this.socket.server.emit(`change_name_${team}`, name);
    return {
      message: `Changed name`,
    };
  }

  @Get('/setContestName')
  setContestName(@Query('name') name: string) {
    this.battleService.contestName = name;
    this.socket.server.emit('change_contest_name', name);
    return {
      message: `Changed name`,
    };
  }
}
