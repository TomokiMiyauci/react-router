import { useMemo } from "../deps.ts";

export function useURLPattern(
  input: URLPatternInit,
  baseURL?: string | undefined,
): URLPattern {
  const {
    baseURL: base,
    hash,
    hostname,
    pathname,
    password,
    port,
    protocol,
    search,
    username,
  } = input;
  const pattern = useMemo<URLPattern>(() => {
    return new URLPattern({
      baseURL: base,
      hash,
      hostname,
      pathname,
      password,
      port,
      protocol,
      search,
      username,
    }, baseURL);
  }, [
    base,
    baseURL,
    hash,
    hostname,
    pathname,
    password,
    port,
    protocol,
    search,
    username,
  ]);

  return pattern;
}
