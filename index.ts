const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 3000;
app.use(cors());

app.get('/topstories', async (req, res) => {
  try {
    const topStoriesResponse = await fetch('https://hacker-news.firebaseio.com/v0/topstories.json');
    const topStoryIds = await topStoriesResponse.json();


    const storiesDetails =  await Promise.all (topStoryIds.map(async id => {
      const storyResponse = await fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`);
      const storyData = await storyResponse.json();
      return {
        title: storyData.title,
        score: storyData.score,
        by: storyData.by,
        id: storyData.id
        }
      })
    );

    res.json(storiesDetails);

  } catch (err) {
    res.status(500).send('Error fetching top stories');
  }
});

app.get('/beststories', async (req, res) => {
    try {
      const bestStoriesResponse = await fetch('https://hacker-news.firebaseio.com/v0/beststories.json');
      const bestStoryIds = await bestStoriesResponse.json();
  
  
      const storiesDetails =  await Promise.all (bestStoryIds.map(async id => {
        const storyResponse = await fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`);
        const storyData = await storyResponse.json();
        return {
          title: storyData.title,
          score: storyData.score,
          by: storyData.by,
          id: storyData.id
          }
        })
      );

    res.json(storiesDetails);

    } catch (err) {
      res.status(500).send('Error fetching best stories');
    }
  });

  app.get('/newstories', async (req, res) => {
    try {
      const newStoriesResponse = await fetch('https://hacker-news.firebaseio.com/v0/newstories.json');
      const newStoryIds = await newStoriesResponse.json();
  
      const storiesDetails =  await Promise.all (newStoryIds.map(async id => {
      const storyResponse = await fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`);
      const storyData = await storyResponse.json();
      return {
        title: storyData.title,
        score: storyData.score,
        by: storyData.by,
        id: storyData.id
        }
      })
    );
  
      res.json(storiesDetails);
  
    } catch (err) {
      res.status(500).send('Error fetching new stories');
    }
  });

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});