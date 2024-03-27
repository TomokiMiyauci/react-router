import { List } from "./list.ts";

/**
 * @see https://pr-preview.s3.amazonaws.com/lucacasonato/urlpattern/pull/166.html#urlpatternlist
 */
export class URLPatternList {
  #patternList: List<URLPattern> = new List();
  /**
   * @see https://pr-preview.s3.amazonaws.com/lucacasonato/urlpattern/pull/166.html#dom-urlpatternlist-urlpatternlist
   */
  constructor(patterns: Iterable<URLPattern>) {
    // 1. For each pattern in patterns, run the following steps:
    for (const pattern of patterns) {
      // 1. If this's pattern list contains pattern, throw a TypeError.
      if (this.#patternList.contain(pattern)) throw new TypeError();

      // 2. Append the pattern to this's pattern list.
      this.#patternList.append(pattern);
    }

    // 2. If this's pattern list is empty, throw a TypeError.
    if (this.#patternList.isEmpty()) throw new TypeError();
  }

  /**
   * @see https://pr-preview.s3.amazonaws.com/lucacasonato/urlpattern/pull/166.html#dom-urlpatternlist-test
   */
  test(input: URLPatternInput = {}, baseURL?: string): boolean {
    // 1. For each pattern in this's pattern list, run the following steps:
    for (const pattern of this.#patternList) {
      // 1. Let result be the result of match given pattern, input, and baseURL if given.
      const result = match(pattern, input, baseURL);

      // 2. If result is null, continue.
      if (result === null) continue;

      // 3. Return true.
      return true;
    }

    // 2. Return false.
    return false;
  }

  /**
   * @see https://pr-preview.s3.amazonaws.com/lucacasonato/urlpattern/pull/166.html#dom-urlpatternlist-match
   */
  exec(
    input: URLPatternInput = {},
    baseURL?: string,
  ): URLPatternListResult | null {
    // 1. For each pattern in this's pattern list, run the following steps:
    for (const pattern of this.#patternList) {
      // 1. Let result be the result of match given pattern, input, and baseURL if given.
      const result = match(
        pattern,
        input,
        baseURL,
      );

      // 2. If result is null, continue.
      if (result === null) continue;

      // 3. Set result’s pattern to pattern.
      result.pattern = pattern;

      // 4. Return result.
      return result;
    }

    // 2. Return null.
    return null;
  }
}

function match(
  urlpattern: URLPattern,
  input: URLPatternInput,
  baseURL?: string,
): URLPatternListResult | null {
  const result = urlpattern.exec(input, baseURL);

  if (!result) return null;

  return { ...result, pattern: urlpattern };
}

export interface URLPatternListResult extends URLPatternResult {
  pattern: URLPattern;
}
