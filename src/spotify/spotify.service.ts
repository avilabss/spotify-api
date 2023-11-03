import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import {
  AccessTokenResponse,
  CallbackParams,
  RequestAccessTokenBody,
  RequestUserTracksParams,
  User,
  UserTracks,
} from './interfaces/spotify.interface';
import axios, { AxiosResponse } from 'axios';
import { UserService } from 'src/user/user.service';

@Injectable()
export class SpotifyService {
  baseUrl: string;

  constructor(private userService: UserService) {
    this.baseUrl = 'https://api.spotify.com/v1';
  }

  async getAccessToken(
    callbackParams: CallbackParams,
    host: string,
  ): Promise<AccessTokenResponse> {
    const url = 'https://accounts.spotify.com/api/token';
    const clientId = process.env.SPOTIFY_CLIENT_ID;
    const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
    const credsBuffer = Buffer.from(clientId + ':' + clientSecret);
    const credsBase64 = credsBuffer.toString('base64');

    const body: RequestAccessTokenBody = {
      code: callbackParams.code,
      redirect_uri: `http://${host}/callback`,
      grant_type: 'authorization_code',
    };

    const headers = {
      'content-type': 'application/x-www-form-urlencoded',
      Authorization: 'Basic ' + credsBase64,
    };

    let response: AxiosResponse;
    let responseData: any;

    try {
      response = await axios.post(url, body, { headers });
      responseData = response.data;
    } catch (err) {
      if (axios.isAxiosError(err)) {
        throw new HttpException(err.response!.data, HttpStatus.FORBIDDEN);
      }

      throw new HttpException(err, HttpStatus.FORBIDDEN);
    }

    const accessTokenResponse = responseData as AccessTokenResponse;

    return accessTokenResponse;
  }

  async getProfile(accessToken: string): Promise<User> {
    let url = `${this.baseUrl}/me`;

    const headers = {
      Authorization: `Bearer ${accessToken}`,
    };

    let response: AxiosResponse;
    let responseData: any;

    try {
      response = await axios.get(url, { headers });
      responseData = response.data;
    } catch (err) {
      if (axios.isAxiosError(err)) {
        throw new HttpException(err.response!.data, HttpStatus.FORBIDDEN);
      }

      throw new HttpException(err, HttpStatus.FORBIDDEN);
    }

    const user = responseData as User;
    return user;
  }

  async getLikedTracks(
    email: string,
    requestUserTracksParams?: RequestUserTracksParams,
  ): Promise<UserTracks> {
    let url = `${this.baseUrl}/me/tracks`;
    let user = await this.userService.getByEmail({ where: { email } });

    if (user === null) {
      throw new HttpException('user not found', HttpStatus.NOT_FOUND);
    }

    if (requestUserTracksParams !== undefined) {
      url += '?';
      url += new URLSearchParams(
        requestUserTracksParams as Record<string, string>,
      );
    }

    const headers = {
      Authorization: `Bearer ${user?.access_token}`,
    };

    let response: AxiosResponse;
    let responseData: any;

    try {
      response = await axios.get(url, { headers });
      responseData = response.data;
    } catch (err) {
      if (axios.isAxiosError(err)) {
        throw new HttpException(err.response!.data, HttpStatus.FORBIDDEN);
      }

      throw new HttpException(err, HttpStatus.FORBIDDEN);
    }

    const tracks = responseData as UserTracks;

    return tracks;
  }
}
