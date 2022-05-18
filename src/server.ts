import 'reflect-metadata';
import express, { Request, Response } from 'express';
import 'express-async-errors';
import cors from 'cors';
import { errors } from 'celebrate';
import routes from './routes';
import AppError from 'src/utils/AppError';
import 'src/database';
import bcrypt from 'bcrypt';
const app = express();
app.use(cors());
app.use(express.json());

app.use(routes);

app.use(errors());

app.use((error: Error, request: Request, response: Response) => {
    if (error instanceof AppError) {
        return response.status(error.statusCode).json({
            status: 'error',
            message: error.message,
        });
    }
    return response.status(500).json({
        status: 'error',
        message: 'Internal server error',
    });
});
let senha = 'a';
async function gerarsenha() {
    senha = await bcrypt.hash('teste', 12);
}

app.listen(3333, () => {
    console.log('Server started on port 3333! 🏆');
    gerarsenha();
    setTimeout(() => {
        // console.log(senha);
    }, 2000);
});
