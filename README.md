# react-router

[![JSR](https://jsr.io/badges/@miyauci/react-router)](https://jsr.io/@miyauci/react-router)
[![GitHub](https://img.shields.io/github/license/TomokiMiyauci/react-router)](https://github.com/TomokiMiyauci/react-router/blob/main/LICENSE)

[![test](https://github.com/TomokiMiyauci/react-router/actions/workflows/test.yaml/badge.svg)](https://github.com/TomokiMiyauci/react-router/actions/workflows/test.yaml)
[![standard-readme compliant](https://img.shields.io/badge/readme%20style-standard-brightgreen.svg)](https://github.com/RichardLitt/standard-readme)

Next generation React router.

A minimal router based on `URLPattern` API and `Navigation` API. No more need
for `<Link>` or `<A>`.

## Table of Contents <!-- omit in toc -->

- [Install](#install)
- [Usage](#usage)
  - [Client Side Navigation](#client-side-navigation)
  - [Polyfill](#polyfill)
- [Documentation](#documentation)
- [Remarks](#remarks)
  - [URLPatternList](#urlpatternlist)
- [API](#api)
- [Contributing](#contributing)
- [License](#license)

## Install

deno:

```bash
deno add @miyauci/react-router
```

npm:

```bash
npx jsr add @miyauci/react-router
```

## Usage

The basic exclusive routing is as follows:

```tsx
import {
  Route,
  Router,
  Switch,
  useURL,
  useURLPatternResult,
} from "@miyauci/react-router";
import { type ReactNode } from "react";

function Home(): ReactNode {
  const url = useURL();
  const result = useURLPatternResult();

  return <main>Home</main>;
}
declare const About: () => ReactNode;
declare const NotFound: () => ReactNode;

function App(props: { url?: string | URL }): ReactNode {
  return (
    <Router url={props.url}>
      <Switch fallback={<NotFound />}>
        <Route pathname="/">
          <Home />
        </Route>

        <Route pathname="/about">
          <About />
        </Route>
      </Switch>
    </Router>
  );
}
```

It is best practice to specify the `url` on the server side and nothing on the
client side.

### Client Side Navigation

To perform client-side navigation, intercept the `navigate` event.

At your client entry point:

```ts
globalThis.navigation.addEventListener("navigate", (e) => {
  // if (shouldNotIntercept(e)) return;
  e.intercept({
    async handler() {},
  });
});
```

This ensures that navigation is done only for URL changes. The Router will also
subscribe to URL changes and route them reactively.

This ensures that navigation is only done with URL changes. In addition,
`Router` will subscribe to URL changes and route them reactively.

See
[Modern client-side routing: the Navigation API](https://developer.chrome.com/docs/web-platform/navigation-api)
about `shouldNotIntercept`.

This script may be provided by this project in the future.

### Polyfill

This project relies on a relatively new API.

The API and Polyfill are as follows:

| API                                                                            | Polyfill                                                               |
| ------------------------------------------------------------------------------ | ---------------------------------------------------------------------- |
| [URLPattern](https://developer.mozilla.org/en-US/docs/Web/API/URL_Pattern_API) | [urlpattern-polyfill](https://github.com/kenchris/urlpattern-polyfill) |
| [Navigation](https://developer.mozilla.org/en-US/docs/Web/API/Navigation_API)  | [@virtualstate/navigation](https://github.com/virtualstate/navigation) |

## Documentation

- [Router](./docs/router.md)
- [Switch](./docs/switch.md)
- [Route](./docs/route.md)
- [Hooks](./docs/hooks.md)

## Remarks

This chapter supplements the project.

### URLPatternList

This project is based on the
[`URLPatternList`](https://pr-preview.s3.amazonaws.com/lucacasonato/urlpattern/pull/166.html#urlpatternlist-class)
interface. This API is still Draft, but will be replaced when it is generalized.
This should further reduce the bundle size.

## API

See [deno doc](https://jsr.io/@miyauci/react-router) for all APIs.

## Contributing

See [contributing](CONTRIBUTING.md).

## License

[MIT](LICENSE) © 2024 Tomoki Miyauchi
