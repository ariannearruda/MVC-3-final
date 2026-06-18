module.exports = (req, res, next) => {
    // Se existir usuário na sessão, deixa passar
    if (req.session.user) {
        return next();
    }

    // Se não estiver logado, manda pro login
    res.redirect('/login');
};