import {Router} from 'express';
import AppError from '../errors/AppError'

const sessionsRouter = Router();

sessionsRouter.post('/', (request, response) => {
    const{ phonenumber } = request.body;

    if (phonenumber) {
        return response.json({token: 'lucca2020', number: phonenumber});
    }
    
    throw new AppError(`Telefone incorreto!`); 
});

export default sessionsRouter;