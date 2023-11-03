import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Query,
} from '@nestjs/common';
import { SpotifyService } from 'src/spotify/spotify.service';
import { LikedTrack } from './interfaces/response.interface';

@Controller('tracks')
export class TracksController {
  constructor(private spotifyService: SpotifyService) {}

  @Get('liked')
  async getLikedTracks(@Query() params: { email: string }) {
    if (params.email === undefined) {
      throw new HttpException('email is required', HttpStatus.NOT_FOUND);
    }

    const sendTracks: LikedTrack[] = [];
    const likedTracks = await this.spotifyService.getLikedTracks(params.email);

    likedTracks.items.forEach((item) => {
      sendTracks.push({
        title: item.track?.name!,
        artist: item.track?.album?.artists[0].name!,
        coverUrl: item.track?.album?.images.filter((image) => {
          return image.height === 64;
        })[0].url!,
        spotifyUrl: item.track?.external_urls?.spotify!,
        addedAt: item.added_at!,
      });
    });

    return sendTracks;
  }
}
