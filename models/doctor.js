

module.exports = function(sequelize,DataTypes){
var Doctor = sequelize.define("doctor", {
  name: {

      type: DataTypes.STRING,
      allowNull: false,
  },

  email:{
        
      type: DataTypes.STRING,
      allowNull: false,
  },
  phone: {
        
      type:DataTypes.INTEGER,
      allowNull: false,
  },

  city:{
    type: DataTypes.STRING,
    allowNull: false,
  },
  zipcode:{
    type:DataTypes.INTEGER,
    allowNull: false,

  },

  state:{
    type: DataTypes.STRING,
    allowNull: false,

  },

  speciality:{
    type: DataTypes.STRING,
    allowNull: false,
  }


});


  console.log('table created');


return Doctor;
};
