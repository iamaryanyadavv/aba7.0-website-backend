import express from 'express';
import { google } from 'googleapis';
import cors from 'cors';
import bodyParser from 'body-parser';
import s3 from './s3.js';
import dotenv from 'dotenv';

dotenv.config()
const app = express();
app.use(bodyParser.json({ limit: '50mb' }));
app.use(cors());

const ABA7spreadsheetID = '106TovGIMcMQ8miOds7L8zvi_67SNA4i-nRpG4l3fKo4'
const bucketName = process.env.BUCKET_NAME

app.get('/aba7players', async (req, res) => {
    const auth = new google.auth.GoogleAuth({
        keyFile: 'credentials.json',
        scopes: 'https://www.googleapis.com/auth/spreadsheets'
    })
    const client = await auth.getClient();
    const googleSheets = google.sheets({ version: 'v4', auth: client });
    const PlayerData = await googleSheets.spreadsheets.values.get({
        auth,
        spreadsheetId: ABA7spreadsheetID,
        range: 'ABA7Players!2:900'
    })
    res.send(PlayerData.data);
})

app.get('/aba7teams', async (req, res) => {
    const auth = new google.auth.GoogleAuth({
        keyFile: 'credentials.json',
        scopes: 'https://www.googleapis.com/auth/spreadsheets'
    })
    const client = await auth.getClient();
    const googleSheets = google.sheets({ version: 'v4', auth: client });
    const TeamData = await googleSheets.spreadsheets.values.get({
        auth,
        spreadsheetId: ABA7spreadsheetID,
        range: 'ABA7Teams!1:900'
    })
    res.send(TeamData.data.values);
})


app.get('/aba7stats', async (req, res) => {
    const auth = new google.auth.GoogleAuth({
        keyFile: 'credentials.json',
        scopes: 'https://www.googleapis.com/auth/spreadsheets'
    })
    const client = await auth.getClient();
    const googleSheets = google.sheets({ version: 'v4', auth: client });
    const StatsData = await googleSheets.spreadsheets.values.get({
        auth,
        spreadsheetId: ABA7spreadsheetID,
        range: 'ABA7Stats!2:900'
    })
    res.send(StatsData.data.values);
})

app.get('/aba6images', async (req, res) => {

    const params = {
        Bucket: bucketName,
        Prefix: 'ABA 6.0/'
    };

    s3.listObjects(params, (err, data) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error listing objects in S3 bucket');
        } else {
            const images = data.Contents.map(obj => `https://abagallery.s3.ap-south-1.amazonaws.com/${obj.Key}`);
            res.json(images);
        }
    });
});

app.get('/aba5images', async (req, res) => {

    const params = {
        Bucket: bucketName,
        Prefix: 'ABA 2022/'
    };

    s3.listObjects(params, (err, data) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error listing objects in S3 bucket');
        } else {
            const images = data.Contents.map(obj => `https://abagallery.s3.ap-south-1.amazonaws.com/${obj.Key}`);
            res.json(images);
        }
    });
});

app.get('/aba7fantasy', async (req, res) => {
    const auth = new google.auth.GoogleAuth({
        keyFile: 'credentials.json',
        scopes: 'https://www.googleapis.com/auth/spreadsheets'
    })
    const client = await auth.getClient();
    const googleSheets = google.sheets({ version: 'v4', auth: client });
    const FantasyData = await googleSheets.spreadsheets.values.get({
        auth,
        spreadsheetId: ABA7spreadsheetID,
        range: 'ABA7Fantasy!2:900'
    })
    res.send(FantasyData.data);
})

app.post('/aba7fantasy', async (req, res) =>{

    const auth = new google.auth.GoogleAuth({
        keyFile: 'credentials.json',
        scopes: 'https://www.googleapis.com/auth/spreadsheets'
    })
    const client = await auth.getClient();
    const googleSheets = google.sheets({version: 'v4', auth: client});
    const response = await googleSheets.spreadsheets.values.append({
        spreadsheetId: ABA7spreadsheetID,
        range: "ABA7Fantasy",
        valueInputOption: "USER_ENTERED",
        resource: {
            // image, firstname, middlename, lastname, emailid, batch, phone, gender, primarypos, secondpos, comment
            values: [[
                req.body.picture,
                req.body.name,
                req.body.email,
                req.body.player1,
                req.body.player1email,
                req.body.player1gender,
                req.body.player2,
                req.body.player2email,
                req.body.player2gender,
                req.body.player3,
                req.body.player3email,
                req.body.player3gender,
                req.body.player4,
                req.body.player4email,
                req.body.player4gender,
                req.body.player5,
                req.body.player5email,
                req.body.player5gender,
            ]],
        },
      });
      res.send(response)
} )


app.post('/image', async (req, res) =>{

    const auth = new google.auth.GoogleAuth({
        keyFile: 'credentials.json',
        scopes: 'https://www.googleapis.com/auth/spreadsheets'
    })
    const client = await auth.getClient();
    const googleSheets = google.sheets({version: 'v4', auth: client});
    const response = await googleSheets.spreadsheets.values.append({
        spreadsheetId: ABA7spreadsheetID,
        range: "ABA7Images",
        valueInputOption: "USER_ENTERED",
        resource: {
            // image, firstname, middlename, lastname, emailid, batch, phone, gender, primarypos, secondpos, comment
            values: [[
                req.body.image,
                req.body.name
            ]],
        },
      });
      res.send(response)
} )



app.listen(3001, (req, res) => {
    console.log("Running on Port: 3001")
});
