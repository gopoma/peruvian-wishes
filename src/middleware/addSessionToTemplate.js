function addSessionToTemplate(req, res, next) {
  const user = req.session.user;
  res.locals.user = user;

  return next();
}

module.exports = addSessionToTemplate;