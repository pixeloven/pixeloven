import axios, { AxiosPromise, AxiosRequestConfig, AxiosResponse } from "axios";

/**
 * Additions to AxiosRequestConfig
 */
interface RequestConfig extends AxiosRequestConfig {
    urlReplacements?: object;
}

/**
 * Create axios instance
 * @todo based on env might be able to point this to either api.local or api.gfm-test01.com???
 */
const axiosInstance = axios.create({
    baseURL: "http://localhost/",
});

/**
 * Make HTTP GET request using axios
 */
const get = (url: string, config?: RequestConfig) => {
    const fullUrl = applyUrlReplacements(
        url,
        config ? config.urlReplacements : undefined,
    );
    return axiosInstance.get(fullUrl, config);
};

/**
 * Make HTTP POST request using axios
 */
const post = (url: string, data: object, config?: RequestConfig) => {
    const fullUrl = applyUrlReplacements(
        url,
        config ? config.urlReplacements : undefined,
    );
    return axiosInstance.post(fullUrl, data, config);
};

/**
 * Fills in values for placeholders in URL
 * (ex. /api/endpoint/:id -> /api/endpoint/123)
 */
const applyUrlReplacements = (
    url: string,
    replacements: object | undefined,
) => {
    if (!replacements) {
        return url;
    }

    const re = new RegExp(Object.keys(replacements).join("|"), "gi");
    return url.replace(re, matched => replacements[matched]);
};

const HttpClient = {
    ...axiosInstance,
    get,
    post,
};

export {
    HttpClient,
    RequestConfig,
    AxiosPromise as Promise,
    AxiosResponse as Response,
};
