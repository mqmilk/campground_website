//model
const User = require("../models/user.js");

module.exports.renderRegister = (req, res) => {
    res.render("users/register.ejs");
};

module.exports.register = async (req, res, next) => {
    try {
        const { username, email, password } = req.body;
        const user = new User({ email, username });
        const regUser = await User.register(user, password);
        //after register, direct login
        req.login(regUser, (err) => {
            if(err) {
                return next(err);
            }else {
                req.flash("success", "Now Register!")
                res.redirect("/");                
            }
        });
    } catch (e) {
        req.flash("error", e.message);
        res.redirect("/users/register");
    }
};

module.exports.login = async (req, res) => {
    req.flash("success", "Welcome Back!");
    //if user has some url required to login, redirect to that url
    const redirectUrl = req.session.oriUrl || "/";
    //console.log(redirectUrl);
    delete req.session.oriUrl;
    res.redirect(redirectUrl);
};


module.exports.renderLogin = (req, res) => {
    res.render("users/login.ejs");
};

module.exports.logout = (req, res) => {
    req.logout();
    req.flash("success", "Successfully logged out.")
    res.redirect("/");
};