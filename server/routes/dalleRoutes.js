import express from 'express';
import * as dotenv from 'dotenv';
import { Configuration, OpenAIApi } from 'openai';

// import express from 'express';
// import * as dotenv from 'dotenv';
// import { Configuration, OpenAIAPI } from 'openai';

dotenv.config();

const router = express.Router();

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

router.route('/').get((req, res) => {
  res.status(200).json({ message: 'Hello from LEO.AI' });
});

router.route('/').post(async (req, res) => {
  try {
    const { prompt } = req.body;

    const response = await openai.createImage({
      model: "dall-e-2",
      prompt: prompt,
      n: 1,
      size: "1024x1024",
    });
    // console.log(response.data.data[0].url);
    // image_url = response.data.data[0].url;
    const generatedText = response.data.data[0].url;
    res.status(200).json({ photo: generatedText });
  } catch (error) {
    console.error(error?.response?.data?.error?.message);
    res.status(500).send(error?.response?.data?.error?.message || 'Something went wrong');
  }
});

export default router;
