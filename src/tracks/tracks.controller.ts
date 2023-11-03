import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Query,
} from '@nestjs/common';
import { SpotifyService } from 'src/spotify/spotify.service';

@Controller('tracks')
export class TracksController {
  constructor(private spotifyService: SpotifyService) {}

  @Get('liked')
  async getLikedTracks(@Query() params: { email: string }) {
    if (params.email === undefined) {
      throw new HttpException('email is required', HttpStatus.NOT_FOUND);
    }

    return await this.spotifyService.getLikedTracks(params.email);
  }
}
