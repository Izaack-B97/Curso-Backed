module.exports = {
    index: (req, res) => {
       res.render('categorias/index');
    },
    new: (req, res) => {
        res.render('categorias/new');
    },
    edit: (req, res) => {
        res.render('categorias/edit');
    },
};