var userModel = require('./userModel');
var key = 'somekey234567884456753456';
var encryptor = require('simple-encryptor')(key);

module.exports.createUserDBService = (userDetails) => {

   return new Promise(function myFn(resolve, reject) {
       var userModelData = new userModel();

       userModelData.firstname = userDetails.firstname;
       userModelData.lastname = userDetails.lastname;
       userModelData.email = userDetails.email;
       userModelData.password = userDetails.password;
       var encrypted = encryptor.encrypt(userDetails.password);
       userModelData.password = encrypted;

       userModelData.save(function resultHandle(error, result) {

           if (error) {
               reject(false);
           } else {
               resolve(true);
           }
       });
   });
}

module.exports.loginuserDBService = (userDetails)=>  {
   return new Promise(function myFn(resolve, reject)  {
      userModel.findOne({ email: userDetails.email},function getresult(errorvalue, result) {
         if(errorvalue) {
            reject({status: false, msg: "Datos Invalidos"});
         }
         else {
            if(result !=undefined &&  result !=null) {
               var decrypted = encryptor.decrypt(result.password);

               if(decrypted== userDetails.password) {
                  resolve({status: true,msg: "Usuario Validado"});
               }
               else {
                  reject({status: false,msg: "Falla en validacion de usuario"});
               }
            }
            else {
               reject({status: false,msg: "Detalles de usuario invalido"});
            }
         }
      });
   });
}


module.exports.lookUserDBService = (userDetails) => {
   return new Promise(function findDocument(resolve, reject){
      userModel.findOne({"$and": [{ firstname: userDetails.firstname, email: userDetails.email }] }, function search(req, res){
         try {
            if(res !== null){
               console.log("Verdadero")
               resolve({ status: true, nombre: res.firstname, apellido: res.lastname, email: res.email });
            }else{
               reject({ status: false, msg: "Usuario No Existente" });
            }
         } catch (e) {
            reject("Error")
         }
      } )
   }).catch((error) => {
      console.log(error)
   })
}

module.exports.deleteUserDBService = (userDetails) => {
   return new Promise(function findDocument(resolve, reject){
      userModel.findOne({"$and": [{ firstname: userDetails.firstname, email: userDetails.email }] }, function search(req, res){
         try {
            if(res !== null){
               var desencriptado = encryptor.decrypt(res.password);
               if(desencriptado === userDetails.password){
                  userModel.deleteOne({"$and": [{ firstname: userDetails.firstname, lastname: userDetails.lastname, email: userDetails.email }] }, function deleteUser(req, res){
                     try {
                        if(res.deletedCount === 1){
                           resolve({ status: true, msg: "Usuario Eliminado" });
                        }else {
                           console.log("Falso")
                           reject({ status: false, msg: "Usuario No Existente o No Eliminado" });
                           console.log("Envio")
                        }
                     } catch (e) {
                        reject({ status: false, msg: "Algo sucedio mal" })
                     }
                  })
               }else{
                  reject({ status: false, msg: "Contraseña Incorrecta" })
               }
            }else{
               reject({ status: false, msg: "Usuario no existente" })
            }
         } catch (e) {
            console.log("Error")
         }
      } )
   })
}

module.exports.updateuserDBService = (userDetails) => {
   return new Promise(function updateDocument(resolve, reject){
     userModel.updateOne({email:userDetails.email}, {$set:{firstname:userDetails.firstname, lastname:userDetails.lastname}}, function search(req, res){
       console.log(res) 
       if(res.modifiedCount === 1){
         resolve({ status:true, msg:"El usuario se modifico exitosamente", firstname:userDetails.firstname, lastname:userDetails.lastname })
        }else{
         reject({ status:false, msg:"No se pudo actualizar ya que envio los mismos datos" })
        }
     })
  }).catch((error) => {
    console.log(error)
  })
 }