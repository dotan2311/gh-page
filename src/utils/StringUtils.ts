export class StringUtils {
    public static isEmpty(str: string): boolean {
        return !(str != null && str != "");
    }

    public static isNotEmpty(str: string): boolean {
        return !this.isEmpty(str);
    }
}