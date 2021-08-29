import {Notification as ElNotification} from 'element-ui';

const defaultDuration = 3000;

class AlertService {
    disableAlert: boolean;

    constructor() {
        this.disableAlert = false;
    }

    setDisabled(disableAlert: boolean) {
        this.disableAlert = disableAlert;
    }

    show(type: any, title: string, message: string, duration: number) {
        if (this.disableAlert) return;
        ElNotification({
            type: type,
            title: title,
            message: message,
            duration: duration ? duration : defaultDuration,
        });
    }

    success(title = "Success", message?: any, duration = defaultDuration) {
        if (this.disableAlert) return;
        ElNotification.success({title: title, message: message, duration: duration});
    }

    error(title = "Error", message?: any, duration = defaultDuration) {
        if (this.disableAlert) return;
        ElNotification.error({title: title, message: message, duration: duration ? duration : defaultDuration});
    }

    warning(title = "Warning", message?: any, duration = defaultDuration) {
        if (this.disableAlert) return;
        ElNotification.warning({title: title, message: message, duration: duration ? duration : defaultDuration});
    }

    info(title = "Information", message?: any, duration = defaultDuration) {
        if (this.disableAlert) return;
        ElNotification.info({title: title, message: message, duration: duration ? duration : defaultDuration});
    }
}

export default new AlertService();
