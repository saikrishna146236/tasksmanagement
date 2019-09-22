let appConfig = {};

  appConfig.db = {
    uri: 'mongodb://localhost:27017/tasks'
    } 

module.exports = {
    db :appConfig.db,
    jwtSecret: 'tasksmanagement'
};
