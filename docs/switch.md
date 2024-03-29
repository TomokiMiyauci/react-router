# Switch

A `Switch` is an exclusive control mechanism.

Inside the `Switch` is restricted to only components that receives the
constructor arguments of the `URLPattern` API.

This is usually assumed to be [Route](./route.md), but can be anything else.

The `Switch` also receives a `fallback` field. It is rendered if it does not
match all.

## `fallback` VS Any route

Route matches all if none is specified.

This is equivalent as follow:

```ts
const pattern = new URLPattern({});
```

Thus, the following codes are almost identical in both cases.

```tsx
import { Route, Router, Switch } from "@miyauci/react-router";

const node = (
  <Switch>
    <Route pathname="/">Home</Route>
    <Route>Not Found</Route>
  </Switch>
);
```

or

```tsx
import { Route, Router, Switch } from "@miyauci/react-router";

const node = (
  <Switch fallback={"Not Found"}>
    <Route pathname="/">Home</Route>
  </Switch>
);
```

Both are correct, but using `fallback` gives slightly better performance. This
is because one extra matching can be skipped.

## Throws

The `Switch` depends on the [Router](./router.md) and works only inside the
[Router](./router.md). Otherwise, it throws an error.
