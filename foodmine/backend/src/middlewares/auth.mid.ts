import { HTTP_UNAUTHORIZED } from "../constants/http_status";

export default(req: any, res:any, next:any) => {
    const token = req.header.access_token as string;
    if(!token) return res.status(HTTP_UNAUTHORIZED).send();
}