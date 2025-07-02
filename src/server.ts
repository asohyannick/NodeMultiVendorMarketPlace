import express, { Application } from 'express';
import morgan from 'morgan';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import { rateLimit } from 'express-rate-limit';
import connectToDB from './config/databaseConfig/databaseConfig';
import userRoute from './controller/user/user.controller';
import profileRoute from './controller/profile/profile.controller';
import vendorRoute from './controller/vendor/vendor.controller';
import productRoute from './controller/product/product.controller';
import notFoundRoute from './middleware/404/notFoundRoute';
import backendServerError from './middleware/500/backendServerError';
const app: Application = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const APP_NAME: string = process.env.APP_NAME || 'NodeMultiVendorMarketPlace';
const APP_PORT: string | number = parseInt(process.env.APP_PORT || '8080', 10);
const APP_HOST: string = process.env.APP_HOST || 'localhost';
const App_OWNER: string = process.env.APP_OWNER || 'codingLamb';
const API_VERSION: string | number = process.env.API_VERSION || 'v1';
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
    windowMs: 15 * 60 * 1000, // 15 minutes
    limit: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
    standardHeaders: 'draft-8', // draft-6: `RateLimit-*` headers; draft-7 & draft-8: combined `RateLimit` header
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
    // store: ... , // Redis, Memcached, etc. See below.
})
app.use(limiter);
app.use(`/api/${API_VERSION}/user`, userRoute);
app.use(`/api/${API_VERSION}/profile`, profileRoute);
app.use(`/api/${API_VERSION}/vendor`, vendorRoute);
app.use(`/api/${API_VERSION}/product`, productRoute);

// Custom middleware routes to handle 404 incoming http request and 500 server-side error
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