import express from 'express';
import { resolvePath } from '../utils/path.js';

const home_router = express.Router();

home_router.get('/', (req, res) => {

    res.sendFile(resolvePath('views', 'index.html'));
});

export default home_router;