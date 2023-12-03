/*
  Elevenlabs mod by qschnitzel
  Licensed under MIT License

  Create Text-To-Speech audio files using Elevenlabs API.
*/
const fs = require("fs").promises;
const path = require("path");

module.exports = {
  data: {
    name: "Elevenlabs",
  },
  UI: [
    {
      element: "input",
      storeAs: "api_key",
      name: "API Key",
    },
    "-",
    {
      element: "input",
      storeAs: "voice_id",
      name: "Voice ID",
    },
    "-",
    {
      element: "input",
      storeAs: "text",
      name: "Text to Speech",
    },
    "-",
    {
      element: "storageInput",
      storeAs: "store",
    },
  ],

  async run(values, interaction, client, bridge) {
    const text = bridge.transf(values.text);
    const voice_id = bridge.transf(values.voice_id);
    const key = bridge.transf(values.api_key);

    const file_name = text.toLowerCase().replaceAll(" ", "-");

    const options = {
      method: "POST",
      headers: {
        Accept: "audio/mpeg",
        "Content-Type": "application/json",
        "xi-api-key": key,
      },
      body: `{"text":"${text}"}`,
    };

    const response = await fetch(
      `https://api.elevenlabs.io/v1/text-to-speech/${voice_id}`,
      options
    );

    const buffer = await streamToBuffer(response.body);

    await fs.writeFile(
      path.join(__dirname, "..", "LICENSES", file_name + ".mp3"),
      buffer
    );
    await bridge.store(values.store, "AppData/LICENSES/" + file_name + ".mp3");
  },
};

// idk never worked with buffers and such, so thats from ChatGPT ggwp
async function streamToBuffer(stream) {
  const chunks = [];
  for await (const chunk of stream) {
    chunks.push(chunk);
  }

  if (stream.body) {
    stream.body = streamToBuffer(stream.body);
  }

  return Buffer.concat(chunks);
}
