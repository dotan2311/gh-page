import axios from 'axios';
import Domains from "@/utils/Domains";
import {AxiosInstance} from "@/types/interfaces/custom-axios";
// import Auth from "@/security/Authentication";
import AlertService from "@/services/AlertService";
import { StringUtils } from './StringUtils';

const createProjectRequest = (baseURL: string): AxiosInstance => {
    let timeout = 1000 * 60 * 5;
    const request = axios.create({
        baseURL: baseURL,
        timeout: timeout,
        //set request include cookie
        withCredentials: true
    });

    request.interceptors.response.use(response => {
        return response.data;
    }, async error => {
        /**
         * perform redirect to login page when server response with status 401 ( un authorization )
         *
         */
        // if (error && error.response && (error.response.status == 401 || error.response.status == 403)) {
        //
        //      await Auth.logout();
        //     AlertService.setDisabled(true);
        // }
        return Promise.reject(error);
    });
    request.interceptors.request.use(function (config) {
        /**
         * add Authorization header to request if user authenticated, run before sent request
         */
        const accessToken = localStorage.getItem('jwtToken');
        if (StringUtils.isNotEmpty(accessToken)) {
              config.headers = {
                  'Authorization': `Bearer ${accessToken}`
              }
        }
        return config;
    }, function (error) {
        return Promise.reject(error);
    })
    return request;
};
const httpProject = createProjectRequest(Domains.PROJECT);

export {httpProject};
export default httpProject;
