export type TokenPair = {
  access_token: string;
  refresh_token: string;
};

export type LoginResponse = {
  token: TokenPair;
};

export type JwtPayload = {
  email?: string;
  id?: number;
  role?: string;
  type?: string;
  exp?: number;
};
