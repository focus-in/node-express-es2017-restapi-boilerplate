if(database && database.options.logging) {
  database.options.logging = logger.info.bind(logger);
}
