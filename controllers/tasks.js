const Task = require('../models').Task;
const User = require('../models').User;

module.exports = {
    index: (req, res) => {
        Task.findAll()
          .then(result => {
            res.render('tasks/index', { tasks: req.user.tasks});
          })
          .catch(err => {
            res.json(err);
          })
    },
    show: (req, res) => {
        Task.findByPk(req.params.id, { include: [{ model:User, as: 'user' }] }) // Include se le puede pasar el modelo o el nombre de la relacion
          .then(task => {
            // console.log(task);
            res.render('tasks/show', { task })
          }).catch((err) => {
            res.json(err);
          });
    },
    create: (req, res) => {
            
        Task.create({ description: req.body.description, userId: req.user.id})
        .then(result => {
          res.json(result);
        }).catch(err => {
          res.json(err);
        });
    },
    update: (req, res) => {
      
      Task.update({ description: req.body.description }, {
        where: { id: req.params.id }
      })
      .then(task => {
        res.redirect('/tasks/' + req.params.id);
      })
      .catch(err => res.json(err) );

      // let task = Task.findByPk(req.params.id)
      //   .then(task => {
      //     task.description = req.body.description;
      //     task.save()
      //       .then(() => {
      //         let categoryIds = req.body.categories.split(',');

      //         task.addCategories(categoryIds)
      //           .then(() => {
      //             res.redirect(`/tasks/${task.id}`);
      //           });
      //       });
      //   })
      //   .catch(err => {
      //     console.log(err);
      //     res.json(err)
      //   })
    },
    edit: (req, res) => {
      Task.findByPk(req.params.id)
          .then(task => {
            res.render('tasks/edit', { task })
          }).catch((err) => {
            res.json(err);
          });
    },
    new: (req, res) => {
      res.render('tasks/new');
    },
    destroy: (req, res) => {
      Task.destroy({
        where: { id: req.params.id }
      }).then(result => {
        res.redirect('/tasks')
      })
      .catch(err => res.json(err));
    }
};