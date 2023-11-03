import { Module } from '@nestjs/common';
import { CallbackController } from './callback.controller';
import { SpotifyModule } from 'src/spotify/spotify.module';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [SpotifyModule, UserModule],
  controllers: [CallbackController],
  providers: [],
})
export class CallbackModule {}
