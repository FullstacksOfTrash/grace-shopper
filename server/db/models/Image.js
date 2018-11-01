const conn = require('../conn');
const S3 = require('../../S3')

const Image = conn.define('image', {
  // id: {
  //   type: conn.Sequelize.UUID,
  //   defaultValue: conn.Sequelize.UUIDV4,
  //   primaryKey: true
  // },
  url: {
    type: conn.Sequelize.STRING,
  },
});

Image.upload = async function(data, bucketName) {
  try {
    const image = this.build();
    const result = await S3.createBucket({ Bucket: bucketName }).promise();
    const extensions = data.split(';')[0].split('/');
    const extension = extensions[extensions.length - 1];
    const Body = new Buffer(data.replace(/^data:image\/\w+;base64,/, ''), 'base64');
    const Key = `${image.id.toString()}.${extension}`;

    await S3.putObject({
      Bucket: bucketName,
      ACL: 'public-read',
      Body,
      ContentType: `image/${extension}`,
      Key
    }).promise();

    image.url = `https://s3.amazonaws.com/${bucketName}/${Key}`;
    await image.save();
  }
  catch(ex){
    throw ex;
  }
}

module.exports = Image;