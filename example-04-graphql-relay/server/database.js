import Sequelize from "Sequelize";

const sequelize = new Sequelize("database", "username", "password", {
  host: "localhost",
  dialect: "sqlite",

  pool: {
    max: 5,
    min: 0,
    idle: 10000
  },

  storage: "database.db"
});

const Stage = sequelize.define("stages", {
  name:       { type: Sequelize.STRING,  field: "name" },
  festivalId: { type: Sequelize.INTEGER, field: "festivalId" }
}, {
  freezeTableName: true
});

const Festival = sequelize.define("festivals", {
  name: { type: Sequelize.STRING, field: "name" },
  tags: { type: Sequelize.STRING, field: "tags" }
}, {
  freezeTableName: true
});
Festival.hasMany(Stage);

sequelize.sync({ force: true }).then(() => {
  Festival.create({ name: "Global Gathering", tags: "Commercial,UK,Dance" }).then((festival) => {
    festival.createStage({ name: "Beach Stage" });
    festival.createStage({ name: "RnB Stage" });
  });

  Festival.create({ name: "Creamfields", tags: "UK,EDM,House" }).then((festival) => {
    festival.createStage({ name: "Cream" });
  });

  Festival.create({ name: "Tomorrowland", tags: "EU,EDM,House,Trance" }).then((festival) => {
    festival.createStage({ name: "Freedom Stage" });
  });
})

exports.FestivalDB = Festival;
exports.StageDB = Stage;
