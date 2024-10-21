import { Injectable } from '@nestjs/common';
import { UtilsService } from 'src/utils/utils.service';

@Injectable()
export class LoginService {
  constructor(private utilsService: UtilsService) {}

  get(host: string): string {
    const redirectUri = `http://${host}/callback`;
    const state = this.utilsService.generateRandomString(16);
    const clientId = process.env.SPOTIFY_CLIENT_ID;

    const scope =
      'user-read-private user-read-email user-library-read user-read-currently-playing';

    return (
      'https://accounts.spotify.com/authorize?' +
      new URLSearchParams({
        response_type: 'code',
        client_id: clientId!,
        scope: scope,
        state: state,
        redirect_uri: redirectUri,
      })
    );
  }
}
