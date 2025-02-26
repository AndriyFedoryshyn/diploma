import express from "express";

import axios from "axios";

import bodyParser from "body-parser";

import cors from "cors";

import dotenv from "dotenv";

dotenv.config();

const app = express();
const port = 5000;

app.use(cors());
app.use(bodyParser.json());

const API_KEY = process.env.API_KEY;

app.post("/synthesize", async (req, res) => {
  const { text } = req.body;

  console.log("Received text:", text);

  if (!text || !text.trim()) {
    return res.status(400).send("Text is required");
  }

  try {
    const response = await axios.post(
      `https://texttospeech.googleapis.com/v1/text:synthesize?key=${API_KEY}`,
      {
        input: { text },
        voice: {
          languageCode: "uk-UA",
          ssmlGender: "NEUTRAL",
          name: "uk-UA-Wavenet-A",
        },

        audioConfig: { audioEncoding: "MP3" },
      }
    );

    if (response.data.audioContent) {
      res.json({ audioContent: response.data.audioContent });
    } else {
      res.status(500).send("No audio content returned from API");
    }
  } catch (error) {
    console.error(
      "Error generating speech:",
      error.response ? error.response.data : error.message
    );
    res.status(500).send("Error generating speech");
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
