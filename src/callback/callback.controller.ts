import { Controller, Get, Headers, Query } from '@nestjs/common';
import { CallbackParams } from 'src/spotify/interfaces/spotify.interface';
import { SpotifyService } from 'src/spotify/spotify.service';

@Controller('callback')
export class CallbackController {
  constructor(private spotifyService: SpotifyService) {}

  @Get()
  async getAccessToken(
    @Headers() headers: any,
    @Query() params: CallbackParams,
  ) {
    return await this.spotifyService.getAccessToken(params, headers.host);
  }
}
