function authValidation(config) {
  const {requiredRole, excent} = config;
  return function(req, res, next) {
    if(Array.isArray(excent) && excent.includes(req.originalUrl)) {
      return next();
    }
    
    const {user} = req.session;
    if(user?.loggedIn && user.role === requiredRole) {
      return next();
    }

    return res.redirect("/not-allowed");
  };
}

module.exports = authValidation;