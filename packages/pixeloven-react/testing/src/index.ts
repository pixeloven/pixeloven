import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";

/**
 * @todo Need to implement this everywhere?
 */
Enzyme.configure({
    adapter: new Adapter(),
});

// https://github.com/testing-library
// support both enzyme and this

// NOTE: jest-dom adds handy assertions to Jest and it is recommended, but not required.
// import '@testing-library/jest-dom/extend-expect'

// export * from "@testing-library/react";
// export * from "@testing-library/react-hooks";

// "@testing-library/react": "11.1.1",
// "@testing-library/react-hooks": "3.4.2",

// create a wrapper for sandboxes that we can auto destroy
// const sandbox = sinon.createSandbox(); Some sort of easy wrapper for this???

// create a wrapper for enyzome shallow and regular mount
// https://medium.com/beamdental/cleaner-react-enzyme-tests-2dc478a581eb

/* tslint:disable:no-null-keyword */
// ReactWrapper | null = null;

// https://github.com/elastic/eui/pull/3255/files
// https://github.com/cgood92/enzyme-cleanup/blob/master/index.js
