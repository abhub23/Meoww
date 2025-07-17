import dotenv from 'dotenv';
import express from 'express';
import cron from 'node-cron';
import cors from 'cors';
import axios from 'axios';

dotenv.config({ path: '../.env' });

const api_secret = process.env.CATAPI;

const app = express();
app.use(express.json());
app.use(cors({
  origin: '*',
})
);

const PORT = 8090;

app.get('/', (_, res) => {
  res.json({ message: 'Server is alive' });
});

let caturl: string;

cron.schedule('* * * * *', async () => {
  try {
    const response = await axios.get('https://api.thecatapi.com/v1/images/search', {
      headers: {
        'x-api-key': api_secret,
      },
    });

    caturl = response.data[0].url;
    console.log(caturl);
  } catch (error) {
    console.error('Error occured in Api call: ', error);
  }
});

app.get('/getimage', async (_, res) => {
  res.status(200).json({
    caturl,
    success: true,
  });
});

if (process.env.VERCEL !== '1') {
  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Local Server listening on port ${PORT}`);
  });
}

export default app;