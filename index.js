const express = require('express');
const app = express();
const sign = require('jsonwebtoken').sign;
const port = 1234;

const apiKey = '6e2e512773d70f6453f86548c47210a714966bd2fc4281208fbffab092854f22';

function getSignedDeveloperHubUrl(url) {
  const docsUrl = url || 'https://wirewheel.developerhub.io';
  const payload = {
    version: 1,
    vars: {
      user: {
        id: 1234,
        name: "John"
      }
  	}
  };
  const expiresIn = 24 * 60 * 60;

  const token = sign(payload, apiKey, {expiresIn: expiresIn});

  return `${docsUrl}?jwt=${token}`;
}

app.get('/login', (req, res) => {
  res.redirect(getSignedDeveloperHubUrl(req.query.redirect));
});

app.listen(port, () => {
  console.log(`Reader login app listening at http://localhost:${port}`)
});