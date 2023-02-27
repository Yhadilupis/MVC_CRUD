var express = require('express');

var userController = require('../src/user/userController');
const router = express.Router();

// ruta para login
router.route('/user/login').post(userController.loginUserControllerFunc);
// ruta para crear usuario
router.route('/user/create').post(userController.createUserControllerFunc);
//ruta para buscar 
router.route('/user/look').get(userController.lookUserControllerFunc);
//ruta para borrar 
router.route('/user/delete').delete(userController.deleteUserControllerFunc);
//ruta para actualizar un documento
router.route('/user/update').patch(userController.updateuserControllerFunc);

module.exports = router;
