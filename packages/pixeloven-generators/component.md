# Generating components

Pixeloven comes with it’s own component generator to produce all the files you need to start working on a fresh component. To begin:

1. Run `yarn generate`.
2. Choose `component`.
3. Choose the atomic level of the component.
4. Choose the type of component to build (most cases it should be `function`).
5. Decide if it should manage state (if in doubt, choose `n`, it’s easy enough to add later).
6. Decide if it should mange it’s own styles (if in doubt, choose `n`, it’s easy enough to add later).
7. Give the component a name (our naming convention is `PascaleCase`).
8. Give a brief description of what the component should do (you’ll need to edit the Readme anyway, so start simple here).
9. Update the `index.js` file within the atomic level of your new component to import the component. (ex. navigate to `src/components/atoms/index.js`).
10. Enjoy your new component.

If you have suggestions for improvements or you've found a bug, please [open a ticket](https://github.com/pixeloven/pixeloven/issues/new/choose) with a good description and steps to reproduce.
