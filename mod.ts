/** `URLPattern` API and `Navigation` API based React Router.
 *
 * @example
 * ```tsx
 * import { Route, Router, Switch } from "@miyauci/react-router";
 * import { type ReactNode } from "react";
 *
 * declare const Home: () => ReactNode;
 * declare const About: () => ReactNode;
 * declare const NotFound: () => ReactNode;
 *
 * function App() {
 *   return (
 *     <Router>
 *       <Switch fallback={<NotFound />}>
 *         <Route pathname="/">
 *           <Home />
 *         </Route>
 *
 *         <Route pathname="/about">
 *           <About />
 *         </Route>
 *       </Switch>
 *     </Router>
 *   );
 * }
 * ```
 *
 * @module
 */

export {
  default as Route,
  type RouteProps,
  useURLPatternResult,
} from "./src/route.ts";
export {
  default as Router,
  type GetURL,
  type RouterProps,
  type Subscribe,
  useURL,
} from "./src/router.ts";
export { default as Switch, type SwitchProps } from "./src/switch.ts";
