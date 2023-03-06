module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.define(
    "joke_votes",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      jokes_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      session: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      vote: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
    },
    {
      underscored: true,
      timestamps: true,
      indexes: [
        {
          name: "joke_votes_jokes_id_vote",
          fields: ["jokes_id", "vote"],
        },
        {
          name: "joke_votes_jokes_id_session",
          fields: ["jokes_id", "session"],
        },
      ],
    }
  );

  Model.associate = (models) => {};
  return Model;
};
