import Route, { useURLPatternResult } from "./route.tsx";
import Router from "./router.tsx";
import { assertEquals, assertThrows, renderHook } from "../dev_deps.ts";
import { renderToString } from "react-dom/server";

Deno.test("It should throw error if useURLPatternResult call outside of Route", () => {
  assertThrows(() => {
    renderHook(() => useURLPatternResult());
  });
});

Deno.test("It should throw error if Route is outside of Router", () => {
  assertThrows(() => {
    renderToString(<Route />);
  });
});

Deno.test("It should render", () => {
  assertEquals(
    renderToString(
      <Router url="http://test.test">
        <Route pathname="/">
          Home
        </Route>
      </Router>,
    ),
    "Home",
  );
});
