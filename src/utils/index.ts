import moment from 'moment';

const utils = {
    deepCopy: (data: any) => JSON.parse(JSON.stringify(data)),
    exportCSV: (fileName: string, rawData: Array<any>, customContent?: string) => {
        let csvContent: string;
        if (!customContent) {
            if (!rawData.length) return;
            csvContent = "data:text/csv;charset=utf-8,\uFEFF";
            rawData.forEach(function (row) {
                csvContent += row + ",\r\n";
            });
        } else {
            csvContent = customContent;
        }

        let encodedUri = encodeURI(csvContent);
        let link = document.createElement("a");
        link.href = encodedUri;
        link.download = fileName ? fileName : "export.csv";
        document.body.appendChild(link);
        link.click();
        link.remove();
    },
    isEmpty(value: any) {
        return value == null || value == undefined || (typeof value == "string" && value.trim() == "");
    },
    formatDate(date: string) {
        if (!date) {
            return "";
        }
        return moment(date).format("YYYY/MM/DD");
    },
    formatDateTime(dateTime: string) {
        if (!dateTime) {
            return "";
        }
        return moment(dateTime).format("YYYY/MM/DD HH:mm");
    },
    createParam(query: any) {
        let param = '?';
        for (let obj in query) {
            param = `${param}${obj}=${query[obj]}&`;
        }
        return param.substring(0, param.length - 1);
    },
    isUrlValid(userInput: string) {
        let regex = new RegExp("(https?:\\/\\/).*");
        if (userInput.match(regex))
            return true;
        else
            return false;
    },

    isPasswordValid(passwordInput: string) {
        return passwordInput.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/);
    },

    validateEmail(email: string) {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    },
    addNumberCommas(num: number) {
        return num.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")
    },
    uuid() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            const r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    },
    getParamsFromUrl(urlStr: string): URLSearchParams {
        let url = new URL(urlStr);
        return url.searchParams;
    },
    readProperty(obj: Object, propertyAccessPath: string) {
        propertyAccessPath = propertyAccessPath.replace(/\[(\w+)\]/g, '.$1'); // convert indexes to properties
        propertyAccessPath = propertyAccessPath.replace(/^\./, '');           // strip paths leading dot
        let paths = propertyAccessPath.split('.');
        for (let i = 0, n = paths.length; i < n; ++i) {
            let k = paths[i];
            if (k in obj) {
                obj = obj[k];
            } else {
                return null;
            }
        }
        return obj;
    },
    setProperty(obj: Object, propertyAccessPath: string, val: any) {
        propertyAccessPath = propertyAccessPath.replace(/\[(\w+)\]/g, '.$1'); // convert indexes to properties
        propertyAccessPath = propertyAccessPath.replace(/^\./, '');           // strip paths leading dot
        let paths = propertyAccessPath.split('.');
        for (let i = 0, n = paths.length - 1; i < n; ++i) {
            let k = paths[i];
            if (k in obj) {
                obj = obj[k];
            } else {
                return false;
            }
        }
        obj[paths[paths.length - 1]] = val;
        return true;
    }
};

export default utils;