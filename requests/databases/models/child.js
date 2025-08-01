const { sequelize, Sequelize } = require('./connection');

const Child = sequelize.define('child', {

    ChildId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    Name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    ColourTeam: {
        type: Sequelize.STRING,
        allowNull: false

    },
});

module.exports = Child;