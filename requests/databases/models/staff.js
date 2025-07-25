const { sequelize, Sequelize} = require('./connection');

class Staff {
    constructor(
        payroll_id,
        fname,
        lname,
        email,
        //email is login username
        password,
        admin
    ){
        this.payroll_id = payroll_id;
        this.fname = fname;
        this.lname = lname;
        this.email = email;
        this.password = password;
        this.admin = admin;
    }
}
 
 module.exports = Staff;