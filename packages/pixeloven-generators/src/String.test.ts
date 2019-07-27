/**
 * @description The below string modifiers are meant for simple manipulation of strings for the purpose of the generators only.
 *              More work would be needed for these to work beyond just this purpose.
 */
const capitalize = (txt: string) => txt.charAt(0).toUpperCase() + txt.toLowerCase().slice(1);
const plural = (txt: string) => `${txt}s`;
const toLowerCase = (txt: string) => txt.toLowerCase();
const toUpperCase = (txt: string) => txt.toUpperCase();

export default {
    capitalize,
    plural,
    toLowerCase,
    toUpperCase,
}