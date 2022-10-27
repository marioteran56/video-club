module.exports = (sequelize, type) =>  {
    const Copy = sequelize.define('copies', {
        id: {type: type.INTEGER, primaryKey: true, autoIncrement: true},
        number: type.INTEGER,
        format: type.ENUM('DVD', 'BlueRay', 'VHS'),
        status: type.ENUM('LOST', 'RENTED', 'AVAILABLE')
    });
    return Copy
};