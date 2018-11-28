import { AxiosRequestConfig } from "axios";

type MockData = object | string | undefined;

interface MockAxiosInstance {
    delete<T>(url: string, config?: AxiosRequestConfig): Promise<T>;
    get<T>(url: string, config?: AxiosRequestConfig): Promise<T>;
    head<T>(url: string, config?: AxiosRequestConfig): Promise<T>;
    patch<T>(
        url: string,
        data?: MockData,
        config?: AxiosRequestConfig,
    ): Promise<T>;
    post<T>(
        url: string,
        data?: MockData,
        config?: AxiosRequestConfig,
    ): Promise<T>;
    put<T>(
        url: string,
        data?: MockData,
        config?: AxiosRequestConfig,
    ): Promise<T>;
    request<T>(config: AxiosRequestConfig): Promise<T>;
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
const mockRequestToUrl = (
    url: string,
    data?: MockData,
    config?: AxiosRequestConfig,
) => Promise.resolve("testing");

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
