import { forwardRef, Module } from '@nestjs/common';
import { BattleService } from './battle.service';
import { SocketModule } from '../socket/socket.module';

@Module({
  providers: [BattleService],
  exports: [BattleService],
  imports: [forwardRef(() => SocketModule)],
})
export class BattleModule {}
