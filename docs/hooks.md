# Hooks

Provides several react hooks.

## useURL

Hooks for reactive `URL`.

```tsx
import { Router, useURL } from "@miyauci/react-router";

<Router>
  <Html />
</Router>;

function Html() {
  const url = useURL();
  return null;
}
```

If it call outside of `Router`, it throws error.

## useURLPatternResult

Hooks for matching result.

```tsx
import { Route, useURLPatternResult } from "@miyauci/react-router";

<Route pathname="/users/:id">
  <User />
</Route>;

function User() {
  const result = useURLPatternResult();
  const id = result.pathname.groups.id;

  return null;
}
```

If it call outside of `Route`, it throws error.
