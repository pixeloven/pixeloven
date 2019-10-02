import { AxiosRequestConfig } from "axios";

type MockData = object | string | undefined;

interface MockAxiosInstance {
    delete(url: string, config?: AxiosRequestConfig): Promise<string>;
    get(url: string, config?: AxiosRequestConfig): Promise<string>;
    head(url: string, config?: AxiosRequestConfig): Promise<string>;
    patch(
        url: string,
        data?: MockData,
        config?: AxiosRequestConfig,
    ): Promise<string>;
    post(
        url: string,
        data?: MockData,
        config?: AxiosRequestConfig,
    ): Promise<string>;
    put(
        url: string,
        data?: MockData,
        config?: AxiosRequestConfig,
    ): Promise<string>;
    request(config: AxiosRequestConfig): Promise<string>;
}

interface MockAxiosStatic {
    create(config?: AxiosRequestConfig): MockAxiosInstance;
}

/**
 * Mock request
 * @param url
 * @param data
 * @param config
 */
const mockRequest = (config: AxiosRequestConfig) => Promise.resolve("testing");

/**
 * Mock request to url
 * @param url
 * @param data
 * @param config
 */
const mockRequestToUrl = (url: string, config?: AxiosRequestConfig) =>
    Promise.resolve("testing");

/**
 * Mock request to url with data function
 * @param url
 * @param data
 * @param config
 */
const mockRequestToUrlWithData = (
    url: string,
    data?: MockData,
    config?: AxiosRequestConfig,
) => Promise.resolve("testing");

const MockAxiosInstance: MockAxiosInstance = {
    delete: jest.fn(mockRequestToUrl),
    get: jest.fn(mockRequestToUrl),
    head: jest.fn(mockRequestToUrl),
    patch: jest.fn(mockRequestToUrlWithData),
    post: jest.fn(mockRequestToUrlWithData),
    put: jest.fn(mockRequestToUrlWithData),
    request: jest.fn(mockRequest),
};

// mocking Axios methods
const MockAxios: MockAxiosStatic = {
    create: jest.fn((config?: AxiosRequestConfig) => MockAxiosInstance),
};

export default MockAxios;
