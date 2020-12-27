const { DataTypes } = require('sequelize');

module.exports = model;

function model(sequelize) {
    const attributes = {
        id: { autoIncrement: true, primaryKey: true, type: DataTypes.INTEGER }, 
        role: { type: DataTypes.ENUM('admin', 'client'), defaultValue: 'client' },
        firstname: { type: DataTypes.STRING, notEmpty: true }, 
        lastname: { type: DataTypes.STRING, notEmpty: true }, 
        username: { type: DataTypes.TEXT }, 
        profileImg: { type: DataTypes.STRING }, 
        email: { type: DataTypes.STRING, validate: { isEmail: true } }, 
        password: { type: DataTypes.STRING, allowNull: false }, 
        last_login: { type: DataTypes.DATE }, 
        hash: { type: DataTypes.STRING, allowNull: false },
        status: { type: DataTypes.ENUM('active', 'inactive'), defaultValue: 'active' }
    };

    const options = {
        defaultScope: {
            // exclude hash by default
            attributes: { exclude: ['hash'] }
        },
        scopes: {
            // include hash with this scope
            withHash: { attributes: {}, }
        }
    };

    return sequelize.define('User', attributes, options);
}