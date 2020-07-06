'use strict';
const {
  Model
} = require('sequelize');
const bcrypt = require(`bcrypt`)
const saltRounds = 10;
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.List)
    }

    static dataForm(data) {
      let obj = {
        email: data.email,
        password: data.password
      }

      return obj
    }
  };
  User.init({
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: {
          args: true,
          msg: `Email field must be in email format! e.g: yourname@example.com`
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: `Password must be filled!`
        }
      }
    }
  }, {
    sequelize,
    modelName: 'User',
    validate: {
      emptyField() {
        if(this.email === `` || this.password === ``) {
          throw new Error (`All field must be filled!`)
        }
      }
    }
  });

  User.beforeCreate((instance, option) => {
    const salt = bcrypt.genSaltSync(saltRounds);
    const hash = bcrypt.hashSync(instance.password, salt)
    instance.password = hash
  })
  return User;
};