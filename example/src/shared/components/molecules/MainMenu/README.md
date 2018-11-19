# MainMenu Organism component

MainMenu Organism component.

## Source
```js

const items = [
    {name: "Home", path: "/", exact: true},
    {name: "About", path: "/about/", exact: true},
    {name: "Blog", path: "/blog/", exact: false},
];

<MainMenu as={'a'} items={items} currentPath={'/blog'} fixed />
```
If `exact` is `false`, any `pathname` that starts with `path` will provide an active item.



