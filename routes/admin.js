import express from 'express';

const admin_router = express.Router();

admin_router.get('/admin', (req, res) => {
    res.send('home page');
});


export default admin_router;