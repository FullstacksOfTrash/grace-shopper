const app = require('./app');
const { syncAndSeed } = require('./db/');
const PORT = process.env.PORT || 3000;

const init = () => {
  return syncAndSeed();
};

app.listen(PORT, () => console.log(`listening on port ${PORT}`));

init();
