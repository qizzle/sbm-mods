/*
  Console Log mod by qschnitzel
  Licensed under MIT License

  Log something to the bots console.
*/
module.exports = {
  data: {
    name: "Console Log",
  },
  UI: [
    {
      element: "input",
      storeAs: "log",
      name: "Input to log",
    },

    {
      element: "input",
      storeAs: "nothing",
      name: "Autoupdater showcase",
    },
  ],

  async run(values, interaction, client, bridge) {
    const log = bridge.transf(values.log);
    // Add something to showcase autoupdater
    console.log(log);
  },
};
