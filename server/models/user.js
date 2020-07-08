'use strict';
const {
  Model
} = require('sequelize');
const {hashPassword} = require(`../helpers/bcrypt`)

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
      unique: true,
      validate: {
        isEmail: {
          args: true,
          msg: `Email field must be in email format! e.g: yourname@example.com`
        },
        notEmpty: {
          args: true,
          msg: `Email field can't be empty!`
        },
        notNull: {
          args: true,
          msg: `Email is required!`
        }
      }
    },  
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: `Password is required!`
        },
        notEmpty: {
          args: true,
          msg: `Password field can't be empty!`
        }
      }
    }
  }, {
    sequelize,
    modelName: 'User'
  });

  User.beforeCreate((instance, option) => {
    instance.password = hashPassword(instance)
  })
  return User;
};