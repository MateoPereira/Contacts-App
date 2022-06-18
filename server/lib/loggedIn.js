module.exports = {
  isLoggedIn(req, res, next) {
    if (req.isAuthenticated()){
      console.log('AUTHENTICATED')
      return next();
    }
    else{ 
      console.log('NOT AUTHENTICATED');
      return res.redirect('/signin');
    }
  }
}