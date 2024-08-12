import OpenAI from 'openai';
import { Inject, Service } from 'typedi';

@Service()
class OpenApiClient {
    private readonly client: OpenAI;

    constructor(apiKey: string) {
        this.client = new OpenAI({
            apiKey,
        });
    }

    public getClient(): OpenAI {
        return this.client;
    }
}

export { OpenApiClient };