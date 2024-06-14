import { forwardRef, Module } from '@nestjs/common';
import { SocketService } from './socket.service';
import { SocketGateway } from './socket.gateway';
import { SocketController } from './socket.controller';
import { BattleModule } from '../battle/battle.module';

@Module({
  providers: [SocketService, SocketGateway],
  controllers: [SocketController],
  imports: [forwardRef(() => BattleModule)],
  exports: [SocketGateway],
})
export class SocketModule {}
