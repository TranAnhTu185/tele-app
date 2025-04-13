import type { TelegramWebApps } from 'telegram-webapps-types';

declare global {
  interface Window {
    Telegram: TelegramWebApps.SDK;
  }

  namespace NodeJS {
    interface ProcessEnv {
      /** Authorization token for the bot. This is used to validate the hash's authenticity. */
      BOT_TOKEN: "7630455135:AAFoPJQEMcL5hX860nfaW0rQnl2eEk_gSe0";
    }
  }
}

export {};