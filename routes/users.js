import express from 'express';
import { addUsers, getUsers } from '../controllers/users_controller.js';

const users_router = express.Router();

users_router.get('/users', getUsers);
users_router.post('/users', addUsers);

export default users_router;