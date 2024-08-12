const OPEN_API_TOKEN = process.env.OPEN_API_TOKEN || '';

export const config = {
    server: {
        port: process.env.PORT || 3000,
    },
    openApi: {
        token: OPEN_API_TOKEN,
    },
};
