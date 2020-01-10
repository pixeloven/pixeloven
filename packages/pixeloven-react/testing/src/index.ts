import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";

/**
 * @todo Need to implement this everywhere?
 */
Enzyme.configure({
    adapter: new Adapter(),
});
