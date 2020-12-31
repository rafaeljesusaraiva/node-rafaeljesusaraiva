module.exports = (sequelize, Sequelize) => {

    const attributes = {
        id: { autoIncrement: true, primaryKey: true, type: Sequelize.INTEGER }, 
        coverFile: { type: Sequelize.STRING, allowNull: false },
        name: { type: Sequelize.STRING, notEmpty: true }, 
        price: { type: Sequelize.STRING, defaultValue: '40' }, 
        location: { type: Sequelize.STRING }, 
        date: { type: Sequelize.STRING }, 
        totalImages: { type: Sequelize.INTEGER, defaultValue: 0 }, 
        fileFormat: { type: Sequelize.STRING, allowNull: false },
        feedback: { type: Sequelize.STRING }
    };
  
    return sequelize.define('Project', attributes);
  };