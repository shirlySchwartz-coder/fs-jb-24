const express = require('express');
const app = express();
const cors = require('cors');
const multer = require('multer');
const bodyParser = require('body-parser');

2; //ADD BODY-PARSER CODE
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

1; //ADD CORS CODE:
const corsOrigin = 'http://localhost:3000';
app.use(
  cors({
    origin: [corsOrigin],
    methods: ['GET', 'POST'],
    credentials: true,
  })
);

//const imageUploadPath = 'C:\Dev2024\fileUpload\sever-file';

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
      cb(null, 'C:/Dev2024/fileUpload/sever-file/public_html/uploaded_images')
    },
   /*  filename: function(req, file, cb) {
      cb(null, `${file.fieldname}_dateVal_${Date.now()}_${file.originalname}`)
    } */
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, file.fieldname + '-' + uniqueSuffix)
    }
  })
  const imageUpload = multer({storage: storage})

app.post('/image-upload', imageUpload.array('my-image-file'), (req, res) => {
  console.log('POST request received to /image-upload.');
  console.log('Axios POST body: ', req.body);
  res.send('POST request recieved on server to /image-upload.');
});

const port = 8080;
app.listen(port, function () {
  console.log(`Server is running on port ${port}`);
});
