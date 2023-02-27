var userService = require('./userServices');

var createUserControllerFunc = async (req, res) =>  {
    try {
    console.log(req.body);
    var status = await userService.createUserDBService(req.body);
    console.log(status);

    if (status) {
        res.send({ "status": true, "message": "Usuario creado" });
    } else {
        res.send({ "status": false, "message": "Error creando usuario" });
    }
    }
    catch(err) {
        console.log(err);
    }
}

var loginUserControllerFunc = async (req, res) => {
    var result = null;
    try {
        result = await userService.loginuserDBService(req.body);
        if (result.status) {
            res.send({ "status": true, "message": result.msg });
        } else {
            res.send({ "status": false, "message": result.msg });
        }

    } catch (error) {
        console.log(error);
        res.send({ "status": false, "message": error.msg });
    }
}

var lookUserControllerFunc = async(req, res) => {
    var result = await userService.lookUserDBService(req.body);
    console.log("Controller")
    console.log(result)
    try {
        if(result.status){
            res.send({ "status": true,  "user": result.nombre, "lastname": result.apellido, "email": result.email })
        }
    } catch (error){
        console.log(error)
        res.send({ "status": false, "message": "Usuario No Existente" });
    }
}

var deleteUserControllerFunc = async(req, res) => {
    try{
        console.log("usuario eliminado")
        var result = await userService.deleteUserDBService(req.body);
        if(result.status){
            res.send({ "status": true, "message": result.msg })
        }
    } catch(error) {
        //console.log("Entro en el Controller (Catch) ")
        console.log(error)
        res.send({ "status": false, "message": "Usuario No Existente o No Se Pudo Eliminar" });
    }
}

var updateuserControllerFunc = async (req, res) => {
    try{
        var result = await userService.updateuserDBService(req.body)
        if(result.status){
            res.send({ status:true, msg: result.msg, firstname: result.firstname, lastname:result.lastname})
        }else{
            res.send({ status:false, msg: result.msg })
        }
    }catch{
        res.send({ status:false, msg: "Intentelo mas tarde" })
    }
}

module.exports = { createUserControllerFunc, loginUserControllerFunc, lookUserControllerFunc, deleteUserControllerFunc, updateuserControllerFunc };