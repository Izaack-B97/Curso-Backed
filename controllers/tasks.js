const Task = require('../models').Task;

module.exports = {
    index: (req, res) => {
        Task.findAll()
          .then(result => {
            res.render('tasks/index', { tasks: result});
          })
          .catch(err => {
            res.json(err);
          })
    },
    show: (req, res) => {
        Task.findByPk(req.params.id)
          .then(task => {
            res.render('tasks/show', { task })
          }).catch((err) => {
            res.json(err);
          });
    },
    create: (req, res) => {
            
        Task.create({ description: req.body.description })
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
      .then(result => {
        res.redirect('/tasks/' + req.params.id);
      })
      .catch(err => res.json(err) );
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