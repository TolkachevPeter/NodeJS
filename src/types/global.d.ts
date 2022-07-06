import Context from '../common_b/Context';

declare global {
 namespace Express {
     export interface Request {
        user: {_id: string}
     }
 }
}
