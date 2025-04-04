interface TelegramWebApp {
    ready(): void;
    expand(): void;
    close(): void;
    isExpanded: boolean;
    MainButton: {
        show(): void;
        hide(): void;
        setText(text: string): void;
        onClick(callback: () => void): void;
        offClick(callback: () => void): void;
        enable(): void;
        disable(): void;
    };
    BackButton: {
        show(): void;
        hide(): void;
        onClick(callback: () => void): void;
        offClick(callback: () => void): void;
    };
    HapticFeedback: {
        impactOccurred(style: string): void;
        notificationOccurred(type: string): void;
        selectionChanged(): void;
    };
    isClosingConfirmationEnabled: boolean;
    enableClosingConfirmation(): void;
    disableClosingConfirmation(): void;
    onEvent(eventType: string, eventHandler: () => void): void;
    offEvent(eventType: string, eventHandler: () => void): void;
    sendData(data: any): void;
    initData: string;
    initDataUnsafe: any;
    colorScheme: string;
    themeParams: any;
    headerColor: string;
    backgroundColor: string;
    setHeaderColor(color: string): void;
    setBackgroundColor(color: string): void;
    platform: string;
    version: string;
}

declare global {
    interface Window {
        Telegram?: {
            WebApp?: TelegramWebApp;
        };
    }
}

export const isTelegramWebApp = (): boolean => {
    return !!window.Telegram?.WebApp;
};

export const getTelegramWebApp = (): TelegramWebApp | null => {
    return window.Telegram?.WebApp || null;
};

export const hideHeader = (): void => {
    const webApp = getTelegramWebApp();
    if (webApp) {
        webApp.expand();

        webApp.setHeaderColor('secondary_bg_color');
    }
};

// Показываем хедер в Telegram
export const showHeader = (): void => {
    const webApp = getTelegramWebApp();
    if (webApp) {
        webApp.setHeaderColor('bg_color');
    }
};

export const initTelegramApp = (): void => {
    const webApp = getTelegramWebApp();
    if (webApp) {
        webApp.ready();
        hideHeader();
    }
};
