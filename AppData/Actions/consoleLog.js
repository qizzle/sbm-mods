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
  ],

  async run(values, interaction, client, bridge) {
    const log = bridge.transf(values.log);
    console.log(log);
  },
};
