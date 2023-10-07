import express from 'express';
import { google } from 'googleapis';
import cors from 'cors';
import bodyParser from 'body-parser';
import s3 from './s3.js';
import dotenv from 'dotenv';


dotenv.config()
const app = express();
app.use(bodyParser.json({limit: '50mb'}));
app.use(cors());

const ABA7spreadsheetID = '106TovGIMcMQ8miOds7L8zvi_67SNA4i-nRpG4l3fKo4'
const bucketName = process.env.BUCKET_NAME

app.get('/aba7players', async (req,res)=>{
    const auth = new google.auth.GoogleAuth({
        keyFile: 'credentials.json',
        scopes: 'https://www.googleapis.com/auth/spreadsheets'
    })
    const client = await auth.getClient();
    const googleSheets = google.sheets({version: 'v4', auth: client});
    const PlayerData = await googleSheets.spreadsheets.values.get({
        auth,
        spreadsheetId: ABA7spreadsheetID,
        range: 'ABA7Players!2:900'
    })
    res.send(PlayerData.data);
})

app.get('/aba7teams', async (req,res)=>{
    const auth = new google.auth.GoogleAuth({
        keyFile: 'credentials.json',
        scopes: 'https://www.googleapis.com/auth/spreadsheets'
    })
    const client = await auth.getClient();
    const googleSheets = google.sheets({version: 'v4', auth: client});
    const TeamData = await googleSheets.spreadsheets.values.get({
        auth,
        spreadsheetId: ABA7spreadsheetID,
        range: 'ABA7Teams!2:900'
    })
    res.send(TeamData.data.values);
})

app.get('/aba6images', async(req, res)=>{

    const params = {
      Bucket: process.env.S3_BUCKET_NAME,
      Prefix: 'ABA6.0/'
    };
  
    s3.listObjects(params, (err, data) => {
      if (err) {
        console.error(err);
        res.status(500).send('Error listing objects in S3 bucket');
      } else {
        const images = data.Contents.map(obj => obj.Key);
        res.json(images);
      }
    });
  })
app.get('/aba5images', async(req, res)=>{

    const params = {
      Bucket: bucketName,
      Prefix: 'ABA5.0/'
    };
  
    s3.listObjects(params, (err, data) => {
      if (err) {
        console.error(err);
        res.status(500).send('Error listing objects in S3 bucket');
      } else {
        const images = data.Contents.map(obj => obj.Key);
        res.json(images);
      }
    });
  })



app.listen(3001, (req,res)=>{
    console.log("Running on Port: 3001")
});
