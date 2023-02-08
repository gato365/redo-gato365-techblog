const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const sequelize = require('../config/connection.js');





// Check password
class User extends Model {
    checkPassword(loginPw) {
      return bcrypt.compareSync(loginPw, this.password);
    }
  }
  
// Define table columns and configuration
User.init(
    {
    

        username: {
            type: DataTypes.STRING,
            allowNull: false
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [4]
            }
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isEmail: true
            }
        }

    },

    // {

    //     // set up beforeCreate password, push hash version of password then push password to database
    //     hooks: {
    //         // set up beforeCreate password, push hash version of password then push password to database
    //         beforeCreate: async (newUserData) => {
    //             newUserData.password = await bcrypt.hash(newUserData.password, 10);
    //             return newUserData;
    //         },

    //         beforeUpdate: async (updatedUserData) => {
    //             updatedUserData.password = await bcrypt.hash(updatedUserData.password, 10);
    //             return updatedUserData;
    //         },
    //     },
    // },

    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'user'
    }
);


module.exports = User;