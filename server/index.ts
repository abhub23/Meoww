import dotenv from 'dotenv';
import { Context, Hono } from 'hono'
import cron from 'node-cron';
import { cors } from 'hono/cors'
import axios from 'axios';

dotenv.config({ path: '../.env' });

const api_secret = process.env.CATAPI as string;

const app = new Hono()


app.use(
  '*',
  cors({
    origin: '*',
  })
);

const PORT = 8090;

app.get('/', (c: Context) => {
  return c.json({ message: 'Server is alive' });
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

app.get('/getimage', (c: Context) => {

  return c.json({
    caturl,
    success: Boolean(caturl),
  }, 200);

});


Bun.serve({
  port: PORT,
  fetch: app.fetch
})

console.log( `Server running on http://localhost:${PORT}`)