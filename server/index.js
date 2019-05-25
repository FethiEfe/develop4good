require("dotenv").config();
const express = require("express")
const massive = require("massive")
const session = require("express-session")
const AWS = require('aws-sdk');
const fs = require('fs');
const fileType = require('file-type');
const bluebird = require('bluebird');
const multiparty = require('multiparty');
const cors = require('cors')
const bodyParser = require("body-parser");
const { SERVER_PORT, SESSION_SECRET, CONNECTION_STRING, AWS_ACCESS_KEY, AWS_SECRET_ACCESS_KEY, AWS_BUCKET_NAME } = process.env
const Controller = require("./controller/Controller")
const bcrypt = require("bcryptjs")
const path = require('path'); 



const app = express()
app.use(express.json())
app.use( express.static( `${__dirname}/../build` ) );

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors())
const configureRoutes = require("./routes")
configureRoutes(app);

massive(CONNECTION_STRING)
  .then(db => {
    app.set("db", db)
  })
  .catch(err => { console.log(err) })


app.use(session({
  secret: SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24
  }
}))

AWS.config.update({
  accessKeyId: AWS_ACCESS_KEY,
  secretAccessKey: AWS_SECRET_ACCESS_KEY
});

AWS.config.setPromisesDependency(bluebird);
const s3 = new AWS.S3();

const uploadFile = (buffer, name, type) => {
  const params = {
    ACL: 'public-read',
    Body: buffer,
    Bucket: AWS_BUCKET_NAME,
    ContentType: type.mime,
    Key: `${name}.${type.ext}`
  };
  return s3.upload(params).promise();
};



app.post("/auth/developers", Controller.signupDev)
app.post("/auth/signupchar", Controller.signupChar)
app.post("/auth/login", Controller.login)
app.get("/auth/logout", Controller.logout)

app.get("/auth/developers", Controller.getAllDevelopers)


app.put("/api/updateprofile", Controller.updateMyProfileInfo)
app.get("/api/getprofile/:id", Controller.getDevProfilePic)
app.post(`/api/postproject/:char_id`, Controller.postProject)

app.put("/api/updatecharprofile", Controller.updateCharProfileInfo)
app.get(`/api/getcharprofile/:id`, Controller.getCharProfilePic)
app.get(`/api/displayprojects`, Controller.displayProjects)
app.get(`/dev/displayprojects/:project_id`, Controller.displayProject)
app.post(`/api/applyproject/:dev_id/:project_id/:char_id`, Controller.applyProject)
app.get(`/dev/appliedprojects/:dev_id`, Controller.appliedProject)
app.delete(`/dev/deleteproject/:project_id/:dev_id`, Controller.withdrawalProject)


app.get("/char/myprojects/:char_id", Controller.getCharProject)
app.get(`/char/getdevnumint/:project_id`, Controller.getInterestedDevNum)
app.post(`/api/contact`, Controller.main)
app.get("/auth/cookie", Controller.getSession)
app.delete(`/char/deleteproject/:project_id`, Controller.deleteProject)




app.put('/api/updateprofilepic/:id', (request, response) => {
  const { id } = request.params;
  const db = request.app.get("db")
  const form = new multiparty.Form();
  form.parse(request, async (error, fields, files) => {
    if (error) throw new Error(error);
    try {
      const path = files.file[0].path;
      const buffer = fs.readFileSync(path);
      const type = fileType(buffer);
      const timestamp = Date.now().toString();
      const fileName = `bucketFolder/${timestamp}-lg`;
      const data = await uploadFile(buffer, fileName, type);
      db.addImageToDev([+id, data.Location])
      return response.status(200).send(data);
    } catch (error) {
      return response.status(400).send(error);
    }
  });
})


app.put('/api/updatecharprofilepic/:char_id', (request, response) => {
  const { char_id } = request.params;
  const db = request.app.get("db")
  const form = new multiparty.Form();
  form.parse(request, async (error, fields, files) => {
    if (error) throw new Error(error);
    try {
      const path = files.file[0].path;
      const buffer = fs.readFileSync(path);
      const type = fileType(buffer);
      const timestamp = Date.now().toString();
      const fileName = `bucketFolder/${timestamp}-lg`;
      const data = await uploadFile(buffer, fileName, type);
      db.addImageToChar([+char_id, data.Location])
      return response.status(200).send(data.Location);
    } catch (error) {
      return response.status(400).send(error);
    }
  });
})

app.get('*', (req, res)=>{
  res.sendFile(path.join(__dirname, '../build/index.html'));
});

app.listen(SERVER_PORT, () => {
  console.log(`I am listening on ${SERVER_PORT}`)
})