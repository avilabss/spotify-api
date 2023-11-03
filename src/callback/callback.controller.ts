import { Controller, Get, Headers, Query } from '@nestjs/common';
import { CallbackParams } from 'src/spotify/interfaces/spotify.interface';
import { SpotifyService } from 'src/spotify/spotify.service';
import { UserService } from 'src/user/user.service';

@Controller('callback')
export class CallbackController {
  constructor(
    private spotifyService: SpotifyService,
    private userService: UserService,
  ) {}

  @Get()
  async getAccessToken(
    @Headers() headers: any,
    @Query() params: CallbackParams,
  ) {
    const accessToken = await this.spotifyService.getAccessToken(
      params,
      headers.host,
    );

    const user = await this.spotifyService.getProfile(accessToken.access_token);

    const userExists = await this.userService.getByEmail({
      where: { email: user.email! },
    });

    if (userExists !== null) {
      return { message: 'user already registered' };
    }

    await this.userService.create({
      email: user.email!,
      access_token: accessToken.access_token,
      refresh_token: accessToken.access_token,
    });

    return { message: 'ok' };
  }
}
