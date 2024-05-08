export { assertEquals, assertThrows } from "jsr:@std/assert@^0.225.0";
export { type Navigation } from "npm:/@virtualstate/navigation@1.0.1-alpha.201";

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
