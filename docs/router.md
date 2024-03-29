# Router

A `Router` is a provider. It shares context.

The `Router` receives the `url` field. If `url` is not specified, it refers to
`location.href` by default.

## Subscribe to URL changes

Reactively update the `Router` by notifying it of `url` changes. The `Router`
optionally receives a `subscribe` field.

`subscribe`is a callback function. Call`dispatch`to tell`Router` to update the
`url`.

The `Router` gets the latest `url` each time it calls `dispatch`.

### Default behavior

By Default, the `subscribe` field looks like this:

```ts
import { type Subscribe } from "@miyauci/react-router";

const subscribe: Subscribe = (dispatch) => {
  globalThis.navigation.addEventListener("navigatesuccess", dispatch);

  return () => {
    globalThis.navigation.removeEventListener("navigatesuccess", dispatch);
  };
};
```

By default, the `navigatesuccess` event of the Navigation API is used as the
`url` update timing.

This is why this project relies on the `Navigation` API.

For more information on polyfill, see [Polyfill](../README.md#polyfill).
