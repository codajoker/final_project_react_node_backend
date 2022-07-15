export function getTokenExpiration() {
  const now = new Date();
  const expirationSeconds = 60 * 60; //1h
  const tokenExpires = new Date(now.valueOf() + expirationSeconds * 1000);
  return {
    expirationSeconds,
    tokenExpires,
  };
}
