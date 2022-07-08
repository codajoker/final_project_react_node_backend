const route = require('express').Router();
const { User } = require('../service/shemas/shema');
const bcrypt = require('bcrypt');
const { registerController } = require('../controller/authController');
const { joiSchema } = require('../service/shemas/shema');
const { validationAuth } = require('../../service/validations/validations');

route.post('/register', validationAuth(joiSchema), registerController);
module.exports = route;