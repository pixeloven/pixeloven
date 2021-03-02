# ErrorBoundary Atom component

ErrorBoundry is a generic client error handler similar to a try/catch for react code. It provides a simple mechanism for falling back to another view.

## Source

```js
<ErrorBoundary fallback={<p>Fallback render</p>}>
    <p>Successful render</p>
</ErrorBoundary>
```

## Props

-   `fallback` - (required) Provide a fallback render
