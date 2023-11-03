import { Controller, Get } from '@nestjs/common';
import { SpotifyService } from 'src/spotify/spotify.service';

@Controller('tracks')
export class TracksController {
  constructor(private spotifyService: SpotifyService) {}

  @Get('liked')
  async getLikedTracks() {
    return await this.spotifyService.getLikedTracks();
  }
}
