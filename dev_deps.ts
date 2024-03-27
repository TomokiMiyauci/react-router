export { assertThrows } from "https://deno.land/std@0.220.1/assert/assert_throws.ts";
export { assertEquals } from "https://deno.land/std@0.220.1/assert/assert_equals.ts";
import { createElement } from "react";
import { renderToString } from "react-dom/server";

export function renderHook<T>(renderCallback: () => T): T {
  let result: { value: T } | undefined;

  function Component() {
    const value = renderCallback();

    result = { value };

    return null;
  }

  renderToString(createElement(Component));

  if (!result) {
    throw new Error();
  }

  return result.value;
}
