const express = require('express');
const puppeteer = require('puppeteer');
const axios = require('axios');
const app = express();
const PORT = process.env.PORT || 8000;
const getYouTubeID = require('get-youtube-id');

if (process.env.NODE_ENV !== 'production') require('./secrets');

const generateScreenshot = async (url) => {
  try {
    const browser = await puppeteer.launch({
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });
    const page = await browser.newPage();
    await page.goto(url);
    await page.setViewport({ width: 1920, height: 1080 });
    const video = await page.$('.html5-video-player');
    await page.evaluate(() => {
      let dom = document.querySelector('.ytp-chrome-bottom');
      dom.style.display = 'none';
    });
    await page.keyboard.press('Space');
    let image = await video.screenshot({ encoding: 'base64' });
    browser.close();
    return image;
  } catch (err) {
    console.error(err.response);
  }
};

const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY;

const getText = async (screenshot) => {
  const requestBody = {
    requests: [
      {
        image: { content: screenshot },
        features: [
          {
            type: 'DOCUMENT_TEXT_DETECTION',
            maxResults: 100,
          },
        ],
      },
    ],
  };
  const response = await axios.post(
    `https://vision.googleapis.com/v1/images:annotate?key=${GOOGLE_API_KEY}`,
    requestBody
  );
  return response.data;
};

// gets text - needs to be passed params t (time in seconds) and the url of the yt video
app.get('/api', async (req, res, next) => {
  try {
    if (req.query.videoURL === undefined || req.query.t === undefined) {
      res.send('Invalid URL / time ');
      return;
    }
    const { videoURL, t } = req.query;
    const ytvidID = getYouTubeID(decodeURI(videoURL));
    const url = `https://www.youtube.com/watch?v=${ytvidID}&t=${t}s`;
    let screenshot = await generateScreenshot(url);
    let text = await getText(screenshot);
    let response = text.responses[0].textAnnotations[0].description;
    res.send(response);
  } catch (err) {
    console.error(err);
  }
});
app.listen(PORT, () => {
  console.log('Listening on port ', PORT);
});
