import Cookies from 'js-cookie';

export class CookieUtils {
    public static getCookie(name: string): string {
        return Cookies.get(name);
    }

    public static clearCookie(name: string): void {
        Cookies.remove(name);
    }
}