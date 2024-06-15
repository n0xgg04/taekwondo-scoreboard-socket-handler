import {
  WebSocketGateway,
  OnGatewayConnection,
  WebSocketServer,
  SubscribeMessage,
  ConnectedSocket,
  MessageBody,
} from '@nestjs/websockets';
import { Socket } from 'socket.io';
import { SocketService } from './socket.service';

import { BattleService } from '../battle/battle.service';
import { Injectable } from '@nestjs/common';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
@Injectable()
export class SocketGateway implements OnGatewayConnection {
  @WebSocketServer()
  public server: Socket;

  constructor(
    private readonly socketService: SocketService,
    public readonly battleService: BattleService,
  ) {}

  handleConnection(client: Socket): void {
    this.server.emit('set_status', this.battleService.battleStatus);
    this.socketService.handleConnection(client);
  }

  @SubscribeMessage('controller_change_contest_name')
  handleEvent(@ConnectedSocket() socket: Socket, @MessageBody() data: string) {
    this.server.emit('change_contest_name', data);
  }

  @SubscribeMessage('controller_inc_point_red')
  handlePointRed(
    @ConnectedSocket() socket: Socket,
    @MessageBody() data: string,
  ) {
    this.server.emit('inc_point_red', data);
  }

  @SubscribeMessage('controller_inc_point_blue')
  handlePointBlue(
    @ConnectedSocket() socket: Socket,
    @MessageBody() data: string,
  ) {
    this.server.emit('inc_point_blue', data);
  }

  @SubscribeMessage('controller_action_red')
  handleCustomActionRed(@MessageBody() data: string) {
    this.server.emit('action_red', data);
  }

  @SubscribeMessage('controller_action_blue')
  handleCustomActionBlue(@MessageBody() data: string) {
    this.server.emit('action_blue', data);
  }

  @SubscribeMessage('controller_sync_time')
  handleSync(@ConnectedSocket() socket: Socket, @MessageBody() data: string) {
    this.server.emit('controller_sync_this', data);
  }

  @SubscribeMessage('controller_up_blue')
  handleUpBlue(@MessageBody() data: string) {
    this.server.emit('up_blue');
  }

  @SubscribeMessage('controller_up_red')
  handleUpRed(@MessageBody() data: string) {
    this.server.emit('up_red');
  }

  @SubscribeMessage('controller_change_status')
  handleChangeStatus(
    @ConnectedSocket() socket: Socket,
    @MessageBody() data: string,
  ) {
    this.server.emit('set_status', data);
  }

  @SubscribeMessage('reset')
  handleReset() {
    this.server.emit('reset_all');
    this.server.emit('set_counter', 120);
  }
}
