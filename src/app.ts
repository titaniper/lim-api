import Koa from 'koa';
import bodyParser from "koa-bodyparser";
import koaBody from "koa-body";
import { errorHandlerMiddleware, requestLoggerMiddleware, uuidMiddleware } from './middlewares';
import { globalRouter } from './routes';

const app = new Koa();
app.use(koaBody({
    multipart: true, // 파일 업로드 지원
    urlencoded: true, // URL-encoded 데이터 파싱 지원
    json: true, // JSON 데이터 파싱 지원
    text: true, // 텍스트 데이터 파싱 지원
}));
// app.use(bodyParser());

// ====== Do not change the order of the following middlewares =======> 
// app.use(uuidMiddleware);
// app.use(requestLoggerMiddleware);
// app.use(errorHandlerMiddleware);

/**
 * Routes Middleware
 */
app.use(globalRouter.routes());
app.use(globalRouter.allowedMethods());

// <===================================================================

export default app;
