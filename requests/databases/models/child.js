const { sequelize, Sequelize} = require('./connection');

class Child {
    constructor(id, name, colour_team) {
        this.id = id
        this.name = name;
        this.colour_team = colour_team;
    }
}

module.exports = Child;