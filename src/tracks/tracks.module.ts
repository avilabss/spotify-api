import { Module } from '@nestjs/common';
import { TracksController } from './tracks.controller';
import { SpotifyModule } from 'src/spotify/spotify.module';

@Module({
  imports: [SpotifyModule],
  controllers: [TracksController],
  providers: [],
})
export class TracksModule {}
