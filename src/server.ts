import gracefulShutdown from 'http-graceful-shutdown';
import app from './app';
import { config } from './config';
import { OpenApiClient } from './libs/openapi';
import { Container } from 'typedi';

async function main() {
    const port = config.server.port;
    const server = app.listen(port);

    // NOTE: 임시 주입
    Container.set(OpenApiClient, new OpenApiClient(config.openApi.token));

    gracefulShutdown(server, {
        signals: 'SIGINT SIGTERM',
        timeout: 30000,
        onShutdown: async () => {
            console.log('The server shuts down when the connection is cleaned up.');
        },
        finally: () => {
            console.log('bye 👋');
            process.exit();
        },
    });

    console.log(`Server running on port ${port}`);
}

main();
