const Sequelize = require("sequelize");
var sequelize = require("../dbConnection/connection");
const classModel = require("../model/classModel")
const teacherModel = require("../model/teacherModel")
const studentModel = require("../model/studentModel")

const schoolModel = sequelize.define(
  "SCHOOL",
  {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    schoolName: {
      type: Sequelize.STRING
    },
    // class: {
    //   type: Sequelize.STRING
    // },
    // teacher: {
    //   type: Sequelize.STRING
    // },
    // student: {
    //   type: Sequelize.STRING,
    // },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
  },
  {
    hooks: {
      beforeCreate: async function (SCHOOL) {
        const result = await this.findOne({
          where: {
            schoolName: SCHOOL.schoolName
          }
        })
        if (result) {
          if (result.schoolName == SCHOOL.schoolName) {
            let err = new Error("school Already Exist.")
            err.status = 400
            throw err;
          }
        }
      }
    }
  },
  {
    freezeTableName: true,
  }
);
schoolModel.sync();
schoolModel.hasMany(studentModel, { foreignKey: 'id' });
studentModel.hasOne(schoolModel, { foreignKey: 'id' });

schoolModel.hasMany(teacherModel, { foreignKey: 'id' });
teacherModel.belongsTo(schoolModel, { foreignKey: 'id' });

schoolModel.hasMany(classModel, { foreignKey: 'id' });
classModel.belongsTo(schoolModel, { foreignKey: 'id' });


module.exports = schoolModel;

schoolModel.AddSchool = async (body) => {
  try {
    const data = await schoolModel.create(body)
    return data;
  }
  catch (error) {
    throw error;
  }

}
schoolModel.GetUser = async (params) => {
  try {
    var found = await schoolModel.findOne({
      where: {
        id: params.id,
      },
      include: [{
        model: teacherModel
      }, {
        model: studentModel
      }, {
        model: classModel
      }],
    });
    return found;
  }
  catch (error) {
    throw error;
  }
};
