import { privateGptRoutes } from './gpt';
import { Router } from 'koa-x-router';

const v1PublicRouter = new Router();
v1PublicRouter.prefix('/v1');
v1PublicRouter.add([...privateGptRoutes]);

export { v1PublicRouter };
