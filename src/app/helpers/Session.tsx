import { Validate } from "./Validate";
import { Bounce, toast } from 'react-toastify';


const Session = {

    setCookie: (cname: string, cvalue: string) => {
        const d = new Date();
        if (cvalue === '') d.setTime(d.getTime() - (360 * 24 * 60 * 60 * 1000));
        else d.setTime(d.getTime() + (14 * 60 * 60 * 1000));
        let expires = 'expires=' + d.toUTCString();
        document.cookie = cname + '=' + cvalue + ';' + expires + ';path=/;SameSite=Strict;secure;';
    },
    getCookie: (cname: string) => {
        const name = `${cname}=`;
        const decodedCookie = decodeURIComponent(document.cookie);
        const ca = decodedCookie.split(';');
        
        for (let c of ca) {
            c = c.trim(); // Trim spaces
            if (c.startsWith(name)) {
                return c.substring(name.length, c.length);
            }
        }
        return '';
    },

    clearAllCookies: () => {
        const cookies = document.cookie.split(";");

        for (let cookie of cookies) {
            const eqPos = cookie.indexOf("=");
            const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
            document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/`;
        }
    },

    get: (key: string) => {
        const val = localStorage.getItem(key) || '';
        if (!val) return null;
        try {
            return JSON.parse(val);
        } catch (e) {
            return null;
        }
    },
    set: (key: string, value: any) => {
        localStorage.setItem(key, JSON.stringify(value));
    },

    saveAlert: (value: string, type: 'info' | 'success' | 'warning' | 'error' | 'default' = 'default') => {
        let item = localStorage.getItem('alerts');
        let obj: Record<string, any> = {};
        if (item) {
            obj = JSON.parse(item);
        }
        if (!obj[type]) obj[type] = [];
        obj[type].push(value);
        localStorage.setItem('alerts', JSON.stringify(obj));
    },
    countAlert: () => {
        const items = localStorage.getItem('alerts');
        if (!items) {
            return 0;
        }
        const obj = JSON.parse(items);
        return Object.keys(obj).length;
    },
    remove: (key: string) => {
        localStorage.removeItem(key);
    },
    removeAll: () => {
        localStorage.clear();
    },
    showAlert: ({ str, type = 'default' }: { str?: string, type?: 'info' | 'success' | 'warning' | 'error' | 'default' }) => {
        let item = localStorage.getItem('alerts');
        localStorage.removeItem('alerts');
        let obj: Record<string, any> = {};
        if (item) {
            obj = JSON.parse(item);
        }
        if (Validate.string(str)) {
            if (!obj[type]) obj[type] = [];
            obj[type].push(str);
        }
        const showTheToast: Record<string, any> = {
            info: toast.info,
            success: toast.success,
            warning: toast.warning,
            error: toast.error,
            default: toast
        }
        Object.keys(obj).forEach((color: string) => {
            if (obj[color].length > 0) {
                obj[color].forEach((element: string) => {
                    showTheToast[color](element, {
                        position: "top-center",
                        autoClose: 10000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "colored",
                        transition: Bounce,
                    });


                    // try {
                    //     notificationSound.play();
                    // } catch (error) {
                    //     console.log(JSON.stringify(error, null, 2));
                    // }
                })
            }
        })
    }

};

export default Session;