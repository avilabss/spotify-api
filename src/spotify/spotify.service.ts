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

@Injectable()
export class SpotifyService {
  baseUrl: string;

  constructor() {
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

  async getProfile(): Promise<User> {
    const authToken =
      'BQAgpZyjdNMwoGOVzzJGs25K3AfSn2LPNYeeuP0lLaWqhN7TeSz0f6TCgGNWNE3DbA7tnaZ8mo-A21EHNkz5NtW2mrYYaD4d1Hs1nbbrwiBB8GwUo-nm6tEmY_LJ8y5_3IQr9z9pwPbX6vipqnNioNRkAKAEfEisWYJakBtF-LLqVzZWETxk95hvJ91DccbGU-Iev2kjYdbKJnpaZIp0N6UVhkzoT2Fc';
    let url = `${this.baseUrl}/me/tracks`;

    const headers = {
      Authorization: `Bearer ${authToken}`,
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
    requestUserTracksParams?: RequestUserTracksParams,
  ): Promise<UserTracks> {
    const authToken =
      'BQAgpZyjdNMwoGOVzzJGs25K3AfSn2LPNYeeuP0lLaWqhN7TeSz0f6TCgGNWNE3DbA7tnaZ8mo-A21EHNkz5NtW2mrYYaD4d1Hs1nbbrwiBB8GwUo-nm6tEmY_LJ8y5_3IQr9z9pwPbX6vipqnNioNRkAKAEfEisWYJakBtF-LLqVzZWETxk95hvJ91DccbGU-Iev2kjYdbKJnpaZIp0N6UVhkzoT2Fc';
    let url = `${this.baseUrl}/me/tracks`;

    if (requestUserTracksParams !== undefined) {
      url += '?';
      url += new URLSearchParams(
        requestUserTracksParams as Record<string, string>,
      );
    }

    const headers = {
      Authorization: `Bearer ${authToken}`,
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
