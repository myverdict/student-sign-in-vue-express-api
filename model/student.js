///class Student extends Sequelize.Model {}

module.exports = (sequelize, DataTypes) => {

    var Student = sequelize.define('Student', {
        name: {
            type: DataTypes.STRING,
            allowNull: false
        }, starID: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        }, present: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false 
        }
    })

    //force specifies whether to drop the table or not
    Student.sync({force: true}).then( () => {
        console.log('synced table')
    })

    return Student
    
} 