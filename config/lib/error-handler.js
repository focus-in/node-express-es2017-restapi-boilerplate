// dependencies

class ErrorHandler
{

  /**
   * Configure error handling
   */
  initErrorRoutes(app) {
    app.use((err, req, res, next) => {
      // If the error object doesn't exists
      if (!err) {
        return next();
      }

      // Log it
      console.error(err.stack);

      // Redirect to error page
      res.redirect('/server-error');
    });

    // Showing stack errors
    app.set('showStackError', true);
  };

}

