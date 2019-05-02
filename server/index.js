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
const {SERVER_PORT, SESSION_SECRET, CONNECTION_STRING, AWS_ACCESS_KEY ,AWS_SECRET_ACCESS_KEY,AWS_BUCKET_NAME} = process.env
const authController = require("./controller/authController")
const bcrypt = require("bcryptjs")


const app = express()
app.use(cors())
app.use(express.json())

massive(CONNECTION_STRING)
.then(db => {
    app.set("db", db)
})
.catch(err => {console.log(err)})


app.use(session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized : false,
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




app.get("/auth/developers", authController.getAllDevelopers)
app.post("/auth/developers", authController.signupDev)
app.post("/auth/signupchar", authController.signupChar)

app.post("/auth/login", authController.login)
app.get("/auth/logout",authController.logout )

app.post("/api/updateprofile", authController.updateMyProfileInfo)

app.post("/api/updatecharprofile",authController.updateCharProfileInfo )



app.post('/api/updateprofilepic/:id', (request, response) =>{
    const{id} = request.params
    console.log(request.params);
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
          console.log(typeof data.Location)
          console.log(id, typeof id);
          db.addImageToDev([+id,data.Location]).then(res => {console.log(" img sent to db")})
          return response.status(200).send(data);
        } catch (error) {
          return response.status(400).send(error);
        }
      });
})

app.listen(SERVER_PORT, () => {
    console.log(`I am listening on ${SERVER_PORT}`)
})