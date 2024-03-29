# Route

`Route` is a component of the `URLPattern` API. `Route` only performs matching.

## Usage

`Route` takes the same arguments and `children` as the constructor of the
`URLPattern` API. It can be used anywhere inside the [Router](./router.md) as
often as you like.

```tsx
import { Route, Router } from "@miyauci/react-router";

<Router url="http://test.test">
  <Route pathname="/">
    <main>Home</main>
  </Route>

  <Route pathname="/about">
    <main>About</main>
  </Route>

  <div>
    <div>
      <Route>Deep Ok</Route>
    </div>
  </div>
</Router>;
```

render as:

```html
<main>Home</main><div><div>Deep Ok</div></div>
```

For exclusive matching, use [Switch](./switch.md).

## Optimization

`Route` is loosely dependent on [Switch](./switch.md) and is optimized so that
matching is not performed twice on [Switch](./switch.md) and `Route`.

## Throws

The `Route` depends on the [Router](./router.md) and works only inside the
[Router](./router.md). Otherwise, it throws an error.
