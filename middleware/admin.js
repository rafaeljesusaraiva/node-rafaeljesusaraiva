const db = require("../models");
const User = db.user;

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

const admin = {
    getAllClients: getAllClients,
};
module.exports = admin;