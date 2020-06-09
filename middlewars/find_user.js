const User = require('../models').User;

module.exports = (req, res, next) => {

    if(!req.session.userId) return next();
      
    User.findByPk(req.session.userId, { include: [ { association: 'tasks' }] }) // associaton carga toda una coleccion que le pertenece al usuario
        .then(user => {                    
            if(user){
                req.user = user;
                next();
            }
        })
}