import express, { Application } from 'express';
import morgan from 'morgan';
import cors from 'cors';
import http from 'http';
import { Server } from 'socket.io';
import helmet from 'helmet';
import compression from 'compression';
import { rateLimit } from 'express-rate-limit';
import connectToDB from './config/databaseConfig/databaseConfig';
import userRoute from './controller/user/user.controller';
import profileRoute from './controller/profile/profile.controller';
import vendorRoute from './controller/vendor/vendor.controller';
import productRoute from './controller/product/product.controller';
import categoryRoute from './controller/category/category.controller';
import orderRoute from './controller/order/order.controller';
import cartRoute from './controller/cart/cart.controller';
import paymentRoute from './controller/stripe/stripe.controller';
import reviewRoute from './controller/review/review.controller';
import notificationRoute from './controller/notification/notification.controller';
import wishListRoute from './controller/wishList/wishList.controller';
import contactRoute from './controller/contact/contact.controller';
import notFoundRoute from './middleware/404/notFoundRoute';
import backendServerError from './middleware/500/backendServerError';
const app: Application = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const APP_NAME: string = process.env.APP_NAME as string || 'NodeMultiVendorMarketPlace';
const APP_PORT: string | number = parseInt(process.env.APP_PORT as string || '5000', 10);
const APP_HOST: string | number = process.env.APP_HOST as string | number || 'localhost';
const App_OWNER: string = process.env.APP_OWNER as string || 'codingLamb';
const API_VERSION: string | number = process.env.API_VERSION as string || 'v1';
const server = http.createServer(app);
const io = new Server(server);
io.on('connection', (socket) => {
    console.log('A user connected', socket.id);
    socket.on('disconnect', () => {
        console.log('User disconnected', socket.id);
    });
});
if (process.env.NODE_ENV as string === 'development') {
    app.use(morgan('dev'));
}
app.use(cors({
    origin: process.env.CLIENT_SIDE as string || '*',
    credentials: true,
}));
app.use(helmet());
app.use(compression());
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 100,
    standardHeaders: 'draft-8',
    legacyHeaders: false,
});
app.use(limiter);
app.use(`/api/${API_VERSION}/user`, userRoute);
app.use(`/api/${API_VERSION}/profile`, profileRoute);
app.use(`/api/${API_VERSION}/vendor`, vendorRoute);
app.use(`/api/${API_VERSION}/product`, productRoute);
app.use(`/api/${API_VERSION}/category`, categoryRoute);
app.use(`/api/${API_VERSION}/order`, orderRoute);
app.use(`/api/${API_VERSION}/cart`, cartRoute);
app.use(`/api/${API_VERSION}/payment`, paymentRoute);
app.use(`/api/${API_VERSION}/review`, reviewRoute);
app.use(`/api/${API_VERSION}/notification`, notificationRoute);
app.use(`/api/${API_VERSION}/wishlist`, wishListRoute);
app.use(`/api/${API_VERSION}/contact`, contactRoute);

app.use(notFoundRoute);
app.use(backendServerError);
async function serve() {
    try {
        await connectToDB(),
            app.listen(APP_PORT, () => {
                console.log(`Server is called ${APP_NAME} running on ${APP_HOST}:on port ${APP_PORT} on /api/${API_VERSION} owned by ${App_OWNER}`)
            });
    } catch (error) {
        console.error("Error occurred!", error);
    }
}
serve();