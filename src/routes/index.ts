import Router from 'koa-router';
// import { JoiAdaptor, Router } from 'koa-x-router';
import { OpenApiClient } from '../libs/openapi';
import { Container } from 'typedi';
// import { v1PublicRouter } from './v1';

export const globalRouter = new Router();
  
globalRouter.get('/ping', async (ctx: any) => {
    ctx.body = 'pong';
});

// globalRouter.use(v1PublicRouter.routes());

globalRouter.post('/gpt', async (ctx) => {
    // 1. ctx destructuring
    // 2. 서비스 호출
    // 2.1 서비스 객체 획득
    const client = Container.get(OpenApiClient).getClient();

    // 2.2 서비스 params 선언
    const props = ctx.request.body;

    console.log("props", props);

    // // 2.3 서비스 호출
    let result = '';
    const stream = await client.chat.completions.create({
        model: 'gpt-4o',
        messages: [{ role: 'user', content: props.message }],
        stream: true,
    });
    for await (const chunk of stream) {
        result += chunk.choices[0]?.delta?.content || ''; 
        console.log(chunk.choices[0]?.delta?.content || '')
        // process.stdout.write(chunk.choices[0]?.delta?.content || '');
    }

    // 3. 서비스 결과 값 body로 설정
    // ctx.body = result;
    ctx.body = result;
    ctx.status = 200;
});

