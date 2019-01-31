import {
    HttpBadRequestException,
    HttpInternalServerErrorException,
    HttpNotFoundException,
} from "@pixeloven/exceptions";

/**
 * Throws Http Bad Request
 */
export const throwHttpBadRequest = () => {
    throw new HttpBadRequestException();
};

/**
 * Throws Http Internal Server Error
 */
export const throwHttpInternalServerError = () => {
    throw new HttpInternalServerErrorException();
};

/**
 * Throws Http not found
 */
export const throwHttpNotFound = () => {
    throw new HttpNotFoundException();
};
