import * as Actions from "@storybook/addon-actions";
import * as Backgrounds from "@storybook/addon-backgrounds";
import * as Knobs from "@storybook/addon-knobs";
import * as Viewport from "@storybook/addon-viewport";

/**
 * @todo Create some helpers and use this to help build stories more efficiently
 * @todo Also can we change the default order of the pages?
 * @todo Does storybook have an official readme package that might be better?
 *
 * @todo move the addons here instead of in common that way config just imports both?
 * @should common be a peer dep instead?
 * @should can we create a common for webpack too so we have less there as well?
 */
export { Actions, Backgrounds, Knobs, Viewport };
