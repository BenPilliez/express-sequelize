'use strict';
const {Model} = require('sequelize');
const bcrypt = require('bcrypt');

module.exports = (sequelize, DataTypes) => {
    class User extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            User.hasMany(models.Post, {
                foreignKey: 'userId',
            })
        }
    }

    User.init({
        firstname: {
            type: DataTypes.STRING, allowNull: false,
            validate: {
                notEmpty: {
                    msg: "Il me faut un prénom"
                },
                notNull: {
                    msg: "il me faut un prénom"
                }
            }
        },
        lastname: {
            type: DataTypes.STRING, allowNull: false, validate: {
                notEmpty: {
                    msg: "Il me faut un nom de famille"
                },
                notNull: {
                    msg: "Il me faut un nom de famille"
                }
            }
        },
        email: {
            type: DataTypes.STRING, allowNull: false,
            unique: {
                msg: "L'email est déjà pris"
            }, validate: {
                notEmpty: {
                    msg: "Il me faut un email"
                },
                isEmail: {
                    msg: "T'es sur que c'est un email valide ?"
                },
                notNull: {
                    msg: "Il me faut un email"
                },

            }
        },
        password: {
            type: DataTypes.STRING, allowNull: false, validate: {
                notEmpty: {
                    msg: "Et ton mot de passe ?"
                },
                notNull: true,
            }
        },
        roles: {
            type: DataTypes.STRING,
            defaultValue: "ROLE_USER",
            get(){
                return this.getDataValue('roles').split(",");
            },
            set(value){
                return this.setDataValue('roles', value.join(',') )
            }
        }
    }, {
        hooks: {
            beforeCreate: (user, options) => {
                const hash = bcrypt.genSaltSync(12);
                user.password = bcrypt.hashSync(user.password, hash);
            },
            beforeUpdate(user, options) {
                if (user.password) {
                    const hash = bcrypt.genSaltSync(12);
                    user.password = bcrypt.hashSync(user.password, hash);
                }
            }
        },
        sequelize,
        modelName: 'User',
    });
    User.prototype.validatePassword = function (password) {
        return bcrypt.compareSync(password, this.password);
    }
    return User;
};