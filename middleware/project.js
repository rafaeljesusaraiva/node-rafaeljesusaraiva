const db = require("../models");
const User = db.user;
const Project = db.project;

getAllClients = async (req, res, next) => {
    let query = await User.findAll({
        include: [{
            model: db.role,
            where: { name: 'client' }
        }]
    });
    res.locals.clientList = query;
    next();
    return;
};

const project = {
    getAllClients: getAllClients,
};
module.exports = project;