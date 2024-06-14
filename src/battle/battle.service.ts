import { Injectable } from '@nestjs/common';
import { SocketGateway } from '../socket/socket.gateway';

@Injectable()
export class BattleService {
  public battleStatus: 'not-start' | 'started' | 'paused' | 'ended';
  public redPoint: number;
  public bluePoint: number;
  public contestName: string;

  constructor() {}
  start() {
    this.battleStatus = 'started';
  }

  pause() {
    this.battleStatus = 'paused';
  }

  reset() {
    this.battleStatus = 'not-start';
  }

  end() {
    this.battleStatus = 'ended';
  }
}
