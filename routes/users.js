import express from 'express';
import { getUsers } from '../controllers/users_controller.js';

const users_router = express.Router();

users_router.get('/users', getUsers);

export default users_router;