'use strict';
const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class List extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      List.belongsTo(models.User)
    }
  };
  List.init({
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: `Title is required!`
        },
        notEmpty: {
          args: true,
          msg: `Title field can't be empty!`
        }
      }
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: `Description is required!`
        },
        notEmpty: {
          args: true,
          msg: `Description field can't be empty!`
        }
      }
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: `Status is required!`
        },
        notEmpty: {
          args: true,
          msg: `Status field can't be empty!`
        }
      }
    },
    due_date: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: `Due date is required!`
        },
        notEmpty: {
          args: true,
          msg: `Due date field can't be empty!`
        },
        isDate: {
          args: true,
          msg: `Please use date format MM/DD/YYYY or YYYY/MM/DD`
        },
        isAfter: {
          args: new Date().toDateString(),
          msg: `Due Date can be filled with Date after today.`
        }
      }
    },
    UserId: {
      type: DataTypes.INTEGER
    }
  }, {
    sequelize,
    modelName: 'List'
  });
  return List;
};