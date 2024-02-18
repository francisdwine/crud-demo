
module.exports=(sequelize,DataTypes)=>{
    const User=sequelize.define("User",{
        email:{
            type:DataTypes.STRING,
            allowNull:false,
            unique:true,
            validate:{
                notEmpty:true
            },
            noUpdate : false
        },
        firstName:{
            type:DataTypes.STRING,
            allowNull:false,
            validate:{
                notEmpty:true
            }
        },
        age:{
            type:DataTypes.INTEGER,
            allowNull:false,
            validate:{
                notEmpty:true
            }
        },
        lastName:{
            type:DataTypes.STRING,
            allowNull:false,
            validate:{
                notEmpty:true
            }
        },
              
    })

    return User;
}