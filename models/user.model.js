module.exports = (sequelize, Sequelize) => {

    const attributes = {
        id: { autoIncrement: true, primaryKey: true, type: Sequelize.INTEGER }, 
        name: { type: Sequelize.STRING, notEmpty: true }, 
        username: { type: Sequelize.TEXT }, 
        profileImg: { type: Sequelize.STRING, defaultValue: '/img/user-placeholder.jpg' }, 
        email: { type: Sequelize.STRING, validate: { isEmail: true } }, 
        password: { type: Sequelize.STRING, allowNull: false }
    };
  
    return sequelize.define('User', attributes);
  };