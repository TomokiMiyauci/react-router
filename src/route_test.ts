import Route, { useURLPatternResult } from "./route.ts";
import Router from "./router.ts";
import { assertEquals, assertThrows, renderHook } from "../dev_deps.ts";
import { renderToString } from "react-dom/server";
import { createElement as h } from "react";

Deno.test("It should throw error if useURLPatternResult call outside of Route", () => {
  assertThrows(() => {
    renderHook(() => useURLPatternResult());
  });
});

Deno.test("It should throw error if Route is outside of Router", () => {
  assertThrows(() => {
    renderToString(h(Route));
  });
});

Deno.test("It should render", () => {
  assertEquals(
    renderToString(
      h(
        Router,
        { url: "http://test.test" },
        h(Route, { pathname: "/" }, "Home"),
      ),
    ),
    "Home",
  );
});
