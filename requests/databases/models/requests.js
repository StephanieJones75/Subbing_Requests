const { sequelize, Sequelize } = require('./connection');

const Requests = sequelize.define('requests', {
    request_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    child: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    colour_team: {
        type: Sequelize.STRING,
        allowNull: false
    },
    date_requested: {
        type: Sequelize.DATE,
        allowNull: false
    },
    date_required1: {
        type: Sequelize.DATE,
        allowNull: false
    }
});

module.exports = Requests;