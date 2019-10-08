/**
 * Validate word
 * @param word
 */
export function isAWord(word: string) {
    if (word.length > 0) {
        if (/^[a-z]+$/i.test(word.trim())) {
            return true;
        }
        return "Must be a valid alpha string.";
    }
    return `Must be a minimum of 1 character.`;
}

/**
 * Creates a validator that checks min length
 * @param min
 */
export function minLength(min: number) {
    return (str: string) => {
        if (str.length >= min) {
            return true;
        }
        return `Must be a minimum of ${min} characters.`;
    };
}
