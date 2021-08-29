export class ComparatorUtils {

    public static compareArray(arr1: Array<any>, arr2: Array<any>): boolean {
        if (arr1.length !== arr2.length) return false;
        for (let i = 0, len = arr1.length; i < len; i++) {
            if (arr1[i] !== arr2[i]) {
                return false;
            }
        }
        return true;
    }

    public static compareArrayObject(arr1: Array<Object>, arr2: Array<Object>): boolean {
        if (arr1.length !== arr2.length) return false;
        for (let i = 0, len = arr1.length; i < len; i++) {
            if (!this.compareObject(arr1[i], arr2[i])) {
                return false;
            }
        }
        return true;
    }

    public static compareObject(o1: any, o2: any) {
        for (const propertyName in o1) {
            if (o1.hasOwnProperty(propertyName) && o2.hasOwnProperty(propertyName)) {
                if (o1[propertyName] !== o2[propertyName]) {
                    return false;
                }
            }
        }
        return true;
    }

}
