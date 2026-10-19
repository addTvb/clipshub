import { create } from "zustand";
import { AUTH_COOKIE_NAME, USER_TYPE_COOKIE_NAME } from "src/config/cookies";
import Cookies from "js-cookie";

type AuthStore = {
  isAuthenticated: boolean;
  login: () => void;
  logout: () => void;
  checkAuth: () => boolean;
};

export const useAuthStore = create<AuthStore>((set) => ({
  isAuthenticated: false,

  login: () => set({ isAuthenticated: true }),

  logout: () => {
    Cookies.remove(AUTH_COOKIE_NAME, { path: "/" });
    Cookies.remove(USER_TYPE_COOKIE_NAME, { path: "/" });
    set({ isAuthenticated: false });
  },

  checkAuth: () => {
    const authCookie = Cookies.get(AUTH_COOKIE_NAME);
    const isAuth = !!authCookie;
    
    // Дополнительная проверка для Safari iOS - если cookie есть, но пустой
    if (authCookie && authCookie.trim() === '') {
      // Очищаем поврежденный cookie
      Cookies.remove(AUTH_COOKIE_NAME, { path: "/" });
      Cookies.remove(USER_TYPE_COOKIE_NAME, { path: "/" });
      set({ isAuthenticated: false });
      return false;
    }
    
    set({ isAuthenticated: isAuth });
    return isAuth;
  },
}));

if (typeof window !== "undefined") {
  useAuthStore.getState().checkAuth();
}
