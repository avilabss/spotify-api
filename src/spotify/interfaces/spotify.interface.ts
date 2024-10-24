export interface CallbackParams {
  code: string;
  state: string;
}

export interface RequestAccessTokenBody {
  grant_type: string;
  code: string;
  redirect_uri: string;
}

export interface AccessTokenResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
  refresh_token: string;
  scope: string;
}

export interface RequestUserTracksParams {
  market?: string;
  limit?: number;
  offset?: number;
}

export interface UserTracks {
  href: string;
  limit: number;
  next: string | null;
  offset: number;
  previous: string | null;
  total: number;
  items: SavedTrack[];
}

export interface SavedTrack {
  added_at?: string;
  track?: Track;
}

export interface Track {
  album?: Album;
  artists?: Artist[];
  available_markets?: string[];
  disc_number?: number;
  duration_ms?: number;
  explicit?: boolean;
  external_ids?: ExternalIDs;
  external_urls?: ExternalURLs;
  href?: string;
  id?: string;
  is_playable?: boolean;
  linked_from?: LinkedFrom;
  restrictions?: Restrictions;
  name?: string;
  popularity?: number;
  preview_url?: string | null;
  track_number?: number;
  type?: string;
  uri?: string;
  is_local?: boolean;
}

export interface Album {
  album_type: string;
  total_tracks: number;
  available_markets: string[];
  external_urls: ExternalURLs;
  href: string;
  id: string;
  images: Image[];
  name: string;
  release_date: string;
  release_date_precision: string;
  restrictions?: Restrictions;
  type: string;
  uri: string;
  artists: SimplifiedArtist[];
}

export interface SimplifiedArtist {
  external_urls?: ExternalURLs;
  href?: string;
  id?: string;
  name?: string;
  type?: string;
  uri?: string;
}

export interface Artist {
  external_urls?: ExternalURLs;
  followers?: Followers;
  genres?: string[];
  href?: string;
  id?: string;
  images?: Image[];
  name?: string;
  popularity?: number;
  type?: string;
  uri?: string;
}

export interface Followers {
  href?: string | null;
  total?: number;
}

export interface Image {
  url: string;
  height: number | null;
  width: number | null;
}

export interface ExternalIDs {
  isrc?: string;
  ean?: string;
  upc?: string;
}

export interface ExternalURLs {
  spotify?: string;
}

export interface LinkedFrom {}

export interface Restrictions {
  reason?: string;
}

export interface User {
  country?: string;
  display_name?: string;
  email?: string;
  explicit_content?: ExplicitContent;
  external_urls?: ExternalURLs;
  followers?: Followers;
  href?: string;
  id?: string;
  images?: Image[];
  product?: string;
  type?: string;
  uri?: string;
}

export interface ExplicitContent {
  filter_enabled: boolean;
  filter_locked: boolean;
}

export interface Device {
  id: string;
  is_active: boolean;
  is_private_session: boolean;
  is_restricted: boolean;
  name: string;
  type: string;
  volume_percent: number;
  supports_volume: boolean;
}

export interface Context {
  type: string;
  href: string;
  external_urls: ExternalURLs;
  uri: string;
}

export interface Actions {
  interrupting_playback: boolean;
  pausing: boolean;
  resuming: boolean;
  seeking: boolean;
  skipping_next: boolean;
  skipping_prev: boolean;
  toggling_repeat_context: boolean;
  toggling_shuffle: boolean;
  toggling_repeat_track: boolean;
  transferring_playback: boolean;
}

export interface TrackObject {
  album: Album;
  artists: Artist[];
  available_markets: string[];
  disc_number: number;
  duration_ms: number;
  explicit: boolean;
  external_ids: ExternalIDs;
  external_urls: ExternalURLs;
  href: string;
  id: string;
  is_playable: boolean;
  linked_from: LinkedFrom;
  restrictions: Restrictions;
  name: string;
  popularity: number;
  preview_url: string;
  track_number: number;
  type: string;
  uri: string;
  is_local: boolean;
}

export interface ResumePoint {
  fully_played: boolean;
  resume_position_ms: number;
}

export interface Copyright {
  text: string;
  type: string;
}

export interface Show {
  available_markets: string[];
  copyrights: Copyright[];
  description: string;
  html_description: string;
  explicit: boolean;
  external_urls: ExternalURLs;
  href: string;
  id: string;
  images: Image[];
  is_externally_hosted: boolean;
  languages: string[];
  media_type: string;
  name: string;
  publisher: string;
  type: string;
  uri: string;
  total_episodes: number;
}

export interface EpisodeObject {
  audio_preview_url: string | null;
  description: string;
  html_description: string;
  duration_ms: number;
  explicit: boolean;
  external_urls: ExternalURLs;
  href: string;
  id: string;
  images: Image[];
  is_externally_hosted: boolean;
  is_playable: boolean;
  languages: string[];
  name: string;
  release_date_precision: string;
  resume_point: ResumePoint;
  type: string;
  uri: string;
  restrictions: Restrictions;
  show: Show;
}

export interface CurrentlyPlayingTrack {
  device: Device;
  repeat_state: string;
  shuffle_state: boolean;
  context: Context;
  timestamp: number;
  progress_ms: number;
  is_playing: boolean;
  item: TrackObject | EpisodeObject;
  currently_playing_type: string;
  actions: Actions;
}
