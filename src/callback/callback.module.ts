import { Module } from '@nestjs/common';
import { CallbackController } from './callback.controller';
import { SpotifyModule } from 'src/spotify/spotify.module';

@Module({
  imports: [SpotifyModule],
  controllers: [CallbackController],
  providers: [],
})
export class CallbackModule {}
