module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.define(
    "jokes",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      content: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      created_by: {
        type: DataTypes.TEXT,
        allow: null,
      },
    },
    {
      underscored: true,
      timestamps: true,
      indexes: [],
    }
  );

  Model.associate = (models) => {};
  return Model;
};
