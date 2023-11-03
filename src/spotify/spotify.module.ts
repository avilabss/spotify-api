import { Module } from '@nestjs/common';
import { SpotifyService } from './spotify.service';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [UserModule],
  providers: [SpotifyService],
  exports: [SpotifyService],
})
export class SpotifyModule {}
