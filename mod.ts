/** `URLPattern` API and `Navigation` API based React Router.
 *
 * @example
 * ```tsx
 * import { Route, Router, Switch } from "https://deno.land/x/react_router/mod.ts";
 *
 * <Router>
 *   <Switch fallback={"NotFound"}>
 *     <Route pathname="/"></Route>
 *     <Route pathname="/about"></Route>
 *   </Switch>;
 * </Router>;
 * ```
 *
 * @module
 */

export {
  default as Route,
  type RouteProps,
  useURLPatternResult,
} from "./route.tsx";
export {
  default as Router,
  type GetURL,
  type RouterProps,
  type Subscribe,
  useURL,
} from "./router.tsx";
export { default as Switch, type SwitchProps } from "./switch.tsx";
