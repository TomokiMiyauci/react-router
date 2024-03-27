import {
  createContext,
  React,
  type ReactNode,
  useContext,
  useMemo,
} from "./deps.ts";
import { useURL } from "./router.tsx";
import { usePreResult } from "./switch.tsx";
import { useURLPattern } from "./utils.ts";
import { Msg } from "./constants.ts";

export interface RouteProps extends URLPatternInit {
  children?: ReactNode;
}

/**
 * @throws {Error}
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
      <URLPatternResultContext.Provider value={result}>
        {children}
      </URLPatternResultContext.Provider>
    );
  }
}

const URLPatternResultContext = createContext<URLPatternResult | null>(null);

/**
 * @throws {Error}
 */
export function useURLPatternResult(): URLPatternResult {
  const ctx = useContext(URLPatternResultContext);

  if (!ctx) throw new Error(Msg.NoURLPatternResultContext);

  return ctx;
}
