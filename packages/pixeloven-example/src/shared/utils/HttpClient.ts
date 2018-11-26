import axios, { AxiosPromise, AxiosRequestConfig, AxiosResponse } from "axios";

const axiosInstance = axios.create({
    baseURL: "http://localhost/",
});

/**
 * Additions to AxiosRequestConfig
 */
interface RequestConfig extends AxiosRequestConfig {
    urlReplacements?: object;
}

/**
 * Make HTTP GET request using axios
 */
function get(url: string, config?: RequestConfig) {
    const fullUrl = applyUrlReplacements(
        url,
        config ? config.urlReplacements : undefined,
    );
    return axiosInstance.get(fullUrl, config);
}

/**
 * Make HTTP POST request using axios
 */
function post(url: string, data: object, config: RequestConfig) {
    const fullUrl = applyUrlReplacements(url, config.urlReplacements);
    return axiosInstance.post(fullUrl, data, config);
}

/**
 * Fills in values for placeholders in URL
 * (ex. /api/endpoint/:id -> /api/endpoint/123)
 */
function applyUrlReplacements(url: string, replacements: object | undefined) {
    if (!replacements) {
        return url;
    }

    const re = new RegExp(Object.keys(replacements).join("|"), "gi");
    return url.replace(re, matched => replacements[matched]);
}

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
