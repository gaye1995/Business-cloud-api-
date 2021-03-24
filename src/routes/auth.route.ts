const auth = require('express').Router();
import {UsersControllers} from '../controllers/UsersControllers'

/**
 * POST
 */
auth.post('/auth/register', UsersControllers.register);

module.exports = auth;
