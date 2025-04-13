export { }
declare global {
    interface Window {
      Telegram: {
        WebApp: {
          initData: string;
          initDataUnsafe: any;
          expand: () => void;
          close: () => void;
          sendData: (data: string) => void;
          // add other properties/methods as needed
        };
      };
    }
  }