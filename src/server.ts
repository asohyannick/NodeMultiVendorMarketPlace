import express, { Application } from 'express';
const app: Application = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));
const port = 8080;
app.get('/test', (_req, res) => {
    res.status(200).json({message: "Hello world"});
});
app.listen(port, () => {
    console.log(`Server is running on port ${port}...`)
})