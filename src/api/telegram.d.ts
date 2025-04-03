interface TelegramWebApp {
    ready: () => void;
    viewportWidth: number;
    viewportHeight: number;
    viewportStableHeight: number;
    onEvent: (eventName: string, callback: (event: any) => void) => void;
}

interface Telegram {
    WebApp: TelegramWebApp;
}

declare global {
    interface Window {
        Telegram: Telegram;
    }
}
