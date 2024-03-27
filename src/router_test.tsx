import { useURL } from "./router.tsx";
import { assertThrows, renderHook } from "../dev_deps.ts";
// // // // @deno-types="npm:/@types/react-dom@18.2.19/server"
import { renderToString } from "react-dom/server";

function App() {
  const url = useURL();

  return null;
}

Deno.test("It should throw error if useURL call outside of Router", () => {
  assertThrows(() => {
    renderHook(() => useURL());
  });
});
