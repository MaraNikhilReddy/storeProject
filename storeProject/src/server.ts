import express, { Request, Response } from 'express';
import bodyParser from 'body-parser'
import cors from "cors";
import userRouter from './handlers/user';
import OrderRouter from './handlers/order';
import productRouter from './handlers/product';

const app: express.Application = express()
const address: string = "0.0.0.0:3000"

app.use(bodyParser.json())



app.get('/', function (req: Request, res: Response) {
    res.send('server started')
})
userRouter(app);
OrderRouter(app);
productRouter(app);

app.listen(3000, function () {
    console.log(`starting app on: ${address}`)
})

export default app;
