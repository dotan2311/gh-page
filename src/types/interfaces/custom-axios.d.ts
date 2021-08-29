import {AxiosInterceptorManager, AxiosPromise, AxiosRequestConfig, AxiosResponse} from "axios";

interface AxiosInstance {
    defaults: AxiosRequestConfig;
    interceptors: {
        request: AxiosInterceptorManager<AxiosRequestConfig>;
        response: AxiosInterceptorManager<AxiosResponse>;
    };

    (config: AxiosRequestConfig): AxiosPromise;

    (url: string, config?: AxiosRequestConfig): AxiosPromise;

    getUri(config?: AxiosRequestConfig): string;

    request<T = any>(config: AxiosRequestConfig): Promise<any>;

    get<T = any>(url: string, config?: AxiosRequestConfig): Promise<any>;

    delete<T = any>(url: string, config?: AxiosRequestConfig): Promise<any>;

    head<T = any>(url: string, config?: AxiosRequestConfig): Promise<any>;

    options<T = any>(url: string, config?: AxiosRequestConfig): Promise<any>;

    post<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<any>;

    put<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<any>;

    patch<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<any>;
}