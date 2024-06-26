import {
  createContext,
  createElement,
  type ReactNode,
  useContext,
  useMemo,
} from "../deps.ts";
import { useURL } from "./router.ts";
import { usePreResult } from "./switch.ts";
import { useURLPattern } from "./utils.ts";
import { Msg } from "./constants.ts";

export interface RouteProps extends URLPatternInit {
  children?: ReactNode;
}

/** Matching by `URLPattern`.
 *
 * @example
 * ```tsx
 * import { Route } from "@miyauci/react-router";
 *
 * const node = <Route pathname="/">Home</Route>;
 * ```
 *
 * @throws {Error} If it used outside of the `<Router>`.
 */
export default function Route(props: Readonly<RouteProps>): ReactNode {
  const { children, ...urlPatternInit } = props;
  const url = useURL();
  const preResult = usePreResult();
  const pattern = useURLPattern(urlPatternInit);
  const result = useMemo<URLPatternResult | null>(() => {
    // Prevent `pattern.exec` from being executed twice to improve performance.
    if (preResult) return preResult;

    return pattern.exec(url);
  }, [preResult, pattern, url]);

  if (result) {
    return (
      createElement(
        URLPatternResultContext.Provider,
        { value: result },
        children,
      )
    );
  }
}

const URLPatternResultContext = createContext<URLPatternResult | null>(null);

/** Hooks for matching result.
 *
 * @example
 * ```tsx
 * import { Route, useURLPatternResult } from "@miyauci/react-router";
 *
 * <Route pathname="/users/:id">
 *   <User />
 * </Route>;
 *
 * function User() {
 *   const result = useURLPatternResult();
 *   const id = result.pathname.groups.id;
 *
 *   return null;
 * }
 * ```
 *
 * @throws {Error} If used outside of the {@link Route}.
 */
export function useURLPatternResult(): URLPatternResult {
  const ctx = useContext(URLPatternResultContext);

  if (!ctx) throw new Error(Msg.NoURLPatternResultContext);

  return ctx;
}
