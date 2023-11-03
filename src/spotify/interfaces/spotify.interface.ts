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
  availableMarkets?: string[];
  discNumber?: number;
  durationMS?: number;
  explicit?: boolean;
  externalIDs?: ExternalIDs;
  externalURLs?: ExternalURLs;
  href?: string;
  id?: string;
  isPlayable?: boolean;
  linkedFrom?: LinkedFrom;
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
  albumType: string;
  totalTracks: number;
  availableMarkets: string[];
  externalURLs: ExternalURLs;
  href: string;
  id: string;
  images: Image[];
  name: string;
  releaseDate: string;
  releaseDatePrecision: string;
  restrictions?: Restrictions;
  type: string;
  uri: string;
  artists: SimplifiedArtist[];
}

export interface SimplifiedArtist {
  externalURLs?: ExternalURLs;
  href?: string;
  id?: string;
  name?: string;
  type?: string;
  uri?: string;
}

export interface Artist {
  externalURLs?: ExternalURLs;
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
  displayName?: string;
  email?: string;
  explicitContent?: ExplicitContent;
  externalURLs?: ExternalURLs;
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
