import {
  createContext,
  type Navigation,
  React,
  type ReactNode,
  useContext,
  useMemo,
  useSyncExternalStore,
} from "./deps.ts";
import { Msg } from "./constants.ts";

export interface RouterProps {
  /** Specifies the current URL.
   * If a function is specified, it will be called again for each dispatch.
   *
   * @default {@link getLocationHref}
   */
  url?: string | URL | GetURL;

  /** Subscribe to {@link url} changes and call dispatch to notify changes.
   *
   * @default {@link subscribeNavigateSuccess}
   */
  subscribe?: Subscribe;

  children?: ReactNode;
}

export interface GetURL {
  (): string | URL;
}

export interface Subscribe {
  (dispatch: VoidFunction): VoidFunction;
}

export default function Router(props: Readonly<RouterProps>): ReactNode {
  const {
    url: _url = getLocationHref,
    subscribe = subscribeNavigateSuccess,
    children,
  } = props;

  const getURL = useMemo<GetURL>(() => {
    return typeof _url === "function" ? _url : () => _url;
  }, [_url]);

  const rawURL = useSyncExternalStore<string | URL>(subscribe, getURL, getURL);
  const url = useMemo<URL>(() => new URL(rawURL), [rawURL]);

  return (
    <URLContext.Provider value={url}>
      {children}
    </URLContext.Provider>
  );
}

function getLocationHref(): string {
  return location.href;
}

function subscribeNavigateSuccess(callback: VoidFunction): VoidFunction {
  (globalThis as unknown as { navigation: Navigation }).navigation
    .addEventListener("navigatesuccess", callback);

  return () => {
    (globalThis as unknown as { navigation: Navigation }).navigation
      .removeEventListener("navigatesuccess", callback);
  };
}

const URLContext = createContext<URL | null>(null);

/**
 * @throws {Error}
 */
export function useURL(): URL {
  const ctx = useContext(URLContext);

  if (!ctx) throw new Error(Msg.NoURLContext);

  return ctx;
}
