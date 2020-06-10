const { render } = require('pug');

const Category = require('../models').Category;

module.exports = {
    create: (req, res) => {
        Category.create(req.body)
            .then(category => {
                res.json(category);
            })
            .catch(err => {
                console.log(err);
                res.json(err);
            })
    },
    new: (req, res) => {
        res.render('categorias/new');
    },
    index: (req, res) => {
        Category.findAll()
            .then(categorias => {
                // console.log(categorias);
                res.render('categorias/index', { categorias })
            })
            .catch(err => {
                res.json(err);
            });
    },
    show: (req, res) => {
        Category.findByPk(req.params.id)
            .then(categoria => {
                console.log(categoria);
                res.render('categorias/show', { categoria });
            })
            .catch(err => {
                console.log(err);
                res.json(err);
            });
    },
    update: (req, res) => {
        Category.update({ title: req.body.title, color: req.body.color }, {
          where: { id: req.params.id }
        })
        .then(result => {
          res.redirect('/categories/' + req.params.id);
        })
        .catch(err => res.json(err) );
    },
    edit: (req, res) => {
        Category.findByPk(req.params.id)
            .then(categoria => {
              res.render('categorias/edit', { categoria })
            }).catch((err) => {
              res.json(err);
            });
    },
    destroy: (req, res) => {
        Category.destroy({
            where: {id: req.params.id}
        })
        .then(result => {
           res.redirect('/categories');
        })
        .catch(err => {
            console.log(err);
        });

    }
};