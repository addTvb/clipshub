export interface TawkUser {
  name: {
    first: string;
    last: string;
  };
  email: string;
  userId: string;
  userType: string;
  hash: string;
}

export interface TawkError {
  message: string;
  code?: string;
}

export interface TawkAPI {
  logout?: () => void;
  login?: (user: TawkUser, callback: (error: TawkError | null) => void) => void;
  isChatMaximized?: () => boolean;
  minimize?: () => void;
  maximize?: () => void;
  isChatHidden?: () => boolean;
  hideWidget?: () => void;
  showWidget?: () => void;
  start?: (options: { showWidget: boolean }) => void;
  autoStart?: boolean;
}

declare global {
  interface Window {
    Tawk_API?: TawkAPI;
  }
} 