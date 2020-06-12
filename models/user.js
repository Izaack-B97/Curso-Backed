'use strict';
const bcrypt = require('bcrypt')

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
    },
    password: DataTypes.STRING,
    password_virtual: DataTypes.VIRTUAL
  }, {});

  User.login = function(email, password){
    // Buscar al usuario
    return User.findOne({
      where: {
        email: email
      }
    }).then(user => {
        if(!user)  return null;
        // Comparar los passwords hasheados
        return user.authenticaPassword(password)
          .then(valid => valid ? user : null);
    });
  }

  User.prototype.authenticaPassword = function(password){
    return new Promise((res,rej) => {
      bcrypt.compare(password, this.password, function(err, valid){
        if(err) return rej(err);
        res(valid);
      });
    });
  }
  // Este objeto se define las relaciones del modelo con otras entidades
  User.associate = function(models) {
    // associations can be defined here
    // hasMany -> Tiene muchos , belongTo -> Le pertenece A
    User.hasMany(models.Task, {
      as: 'tasks',
    }); 
  };
  User.beforeCreate(function(user, options){
    return new Promise((res, rej) => {
      
      if(user.password_virtual){ // Si viene algo en el passoword
        bcrypt.hash(user.password_virtual, 10, function(error, hash){
          user.password = hash; // Asignamos el hash para que se guarde en la bd como contraseña
          res();
        });
      }
    
    });
  });
  return User;
};