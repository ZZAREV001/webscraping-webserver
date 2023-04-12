import express from 'express';
import bodyParser from 'body-parser';
import { fetchCars } from './extractors-service.js';

const app = express();
const port = process.env.PORT || 3000;

// Middleware for parsing request bodies
app.use(bodyParser.json());

app.post('/scrape', async (req, res) => {
    const { url } = req.body;
  
    if (!url) {
      res.status(400).send({ error: 'URL is required' });
      return;
    }
  
    try {
      const cars = await fetchCars(url);
      res.status(200).send(cars);
    } catch (error) {
      res.status(500).send({ error: `Error fetching car data: ${error.message}` });
    }
  });
  
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
  