import * as Joi from 'joi';
import { Router } from 'koa-x-router';
import { Container } from 'typedi';
import { OpenApiClient } from '../../../../libs/openapi';

const router = new Router();

// /v1/gpt 라우트 정의
router.post('/gpt', async (ctx) => {
    // 1. ctx destructuring
    // 2. 서비스 호출
    // 2.1 서비스 객체 획득
    const client = Container.get(OpenApiClient).getClient();

    // 2.2 서비스 params 선언
    const props = ctx.request.body;

    // let result = '';
    // // 2.3 서비스 호출

    console.log('props', props);

    // const stream = await client.chat.completions.create({
    //     model: 'gpt-4o',
    //     messages: [{ role: 'user', content: '대한민국은 어디있나?' }],
    //     stream: true,
    // });
    // for await (const chunk of stream) {
    //     result += chunk.choices[0]?.delta?.content || ''; 
    //     console.log(chunk.choices[0]?.delta?.content || '')
    //     // process.stdout.write(chunk.choices[0]?.delta?.content || '');
    // }

    // 3. 서비스 결과 값 body로 설정
    // ctx.body = result;
    ctx.status = 200;
});

export const privateGptRoutes = router.routes();