import chalk from "chalk";
import winston from "winston";

/**
 * Can we just use the colors provided by winston or does that apply to the whole line?
 */
function getColor(level: string) {
    switch(level) {
        case "error":
            return chalk.red;
        case "info":
        case "notice":
            return chalk.blue;
        case "success":
            return chalk.green;
        case "warn":
        case "warning":
            return chalk.yellow;
    }
    return chalk.white;
};

/**
 * @todo Add colors and what not
 * @todo replace the print function in the cli with this one
 * @todo can we replace storybooks logger? or make our looks similar
 * 
 * @todo we can extend the AbstractConfigSetLevels and others for specific functionality
 * @todo we want our logger to look good!
 */
const console = winston.format.printf(info => {
    const color = getColor(info.level);
    return `${color(info.level.toUpperCase())}: ${chalk.gray(info.meta.timestamp)} ${
        info.message
    }`;
});

export default {
    console,
    getColor
}