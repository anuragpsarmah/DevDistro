export const OAUTH_STATE_MAX_AGE_MS = 10 * 60 * 1000;

export const authCookieOptions = {
  httpOnly: true,
  secure: true,
  sameSite: "none" as const,
};
