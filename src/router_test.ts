import { useURL } from "./router.ts";
import { assertThrows, renderHook } from "../dev_deps.ts";

Deno.test("It should throw error if useURL call outside of Router", () => {
  assertThrows(() => {
    renderHook(() => useURL());
  });
});
