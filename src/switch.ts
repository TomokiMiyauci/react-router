import { createElement } from "../deps.ts";
import {
  createContext,
  type ReactElement,
  type ReactNode,
  URLPatternList,
  type URLPatternListResult,
  useContext,
  useMemo,
} from "../deps.ts";
import { useURL } from "./router.ts";

export interface SwitchProps {
  /** Fallback if nothing matches. */
  fallback?: ReactNode;

  children?:
    | ReactElement<URLPatternInit>
    | ReactElement<URLPatternInit>[]; // TODO: Iterable
}

/** Exclusive conditional branching of `Route`.
 *
 * @example
 * ```tsx
 * import { Route, Switch } from "@miyauci/react-router";
 *
 * <Switch fallback={"NotFound"}>
 *   <Route pathname="/"></Route>
 *   <Route pathname="/about"></Route>
 * </Switch>;
 * ```
 *
 * @throws {Error} If it used outside of the `<Router>`.
 */
export default function Switch(props: SwitchProps): ReactNode {
  const url = useURL();
  const { children: _children, fallback } = props;

  const children = useMemo<ReactElement<URLPatternInit>[]>(() => {
    const defaultChildren = _children ?? [];

    return Array.isArray(defaultChildren) ? defaultChildren : [defaultChildren];
  }, [_children]);

  const patternEntry = useMemo<[URLPattern, ReactElement][]>(() => {
    return children.map(toEntry);
  }, [children]);

  const patternList = useMemo<URLPatternList>(() => {
    const patterns = patternEntry.map(([first]) => first);

    return new URLPatternList(patterns);
  }, [patternEntry]);

  const map = useMemo<WeakMap<URLPattern, ReactElement>>(() => {
    return new WeakMap<URLPattern, ReactElement>(patternEntry);
  }, [patternEntry]);

  const result = useMemo<URLPatternListResult | null>(() => {
    return patternList.exec(url);
  }, [patternList, url]);

  if (result) {
    const child = map.get(result.pattern);

    return createElement(PreResultContext.Provider, { value: result }, child);
  }

  return fallback;
}

const PreResultContext = createContext<URLPatternResult | null>(null);

export function usePreResult(): URLPatternResult | null {
  const ctx = useContext(PreResultContext);

  return ctx;
}

function toEntry(child: ReactElement): [pattern: URLPattern, ReactElement] {
  return [new URLPattern(child.props), child];
}
