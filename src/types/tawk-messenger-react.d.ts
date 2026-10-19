declare module '@tawk.to/tawk-messenger-react' {
  import { Component } from 'react';
  
  interface TawkMessengerProps {
    propertyId?: string;
    widgetId?: string;
    onLoad?: () => void;
    onBeforeLoad?: () => void;
    onChatStarted?: () => void;
    onChatMinimized?: () => void;
    onChatMaximized?: () => void;
    autoStart?: boolean;
  }

  export default class TawkMessengerReact extends Component<TawkMessengerProps> {}
} 