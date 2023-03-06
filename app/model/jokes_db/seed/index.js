(async () => {
  try {
    console.log("Seeding starts.");
    await require("./joke")();
    console.log("Seeding data done.");
  } catch (err) {
    console.log(err);
  }
})();
