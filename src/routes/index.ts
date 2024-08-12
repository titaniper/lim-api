import { Router } from 'koa-x-router';
import { OpenApiClient } from '../libs/openapi';
import { Container } from 'typedi';

export const globalRouter = new Router();
globalRouter.get('/ping', async (ctx: any) => {
    const client = Container.get(OpenApiClient).getClient();

    let result = '';
    const stream = await client.chat.completions.create({
        model: 'gpt-4o',
        messages: [{ role: 'user', content: '대한민국은 어디있나?' }],
        stream: true,
    });
    for await (const chunk of stream) {
        result += chunk.choices[0]?.delta?.content || ''; 
        console.log(chunk.choices[0]?.delta?.content || '')
        // process.stdout.write(chunk.choices[0]?.delta?.content || '');
    }

    // ctx.body = 'pong';
    ctx.body = result;
});
