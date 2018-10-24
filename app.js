const express = require('express');
const { syncAndSeed } = require('./server/db/');

const app = express();

const init = () => {
  return syncAndSeed();
};

init();

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`listening on port ${PORT}`));
