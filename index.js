const express = require('express');
const { google } = require('googleapis');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json({limit: '50mb'}));
app.use(cors());

const ABA7spreadsheetID = '106TovGIMcMQ8miOds7L8zvi_67SNA4i-nRpG4l3fKo4'

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
    const ABA6galleryImages = [
        {
            img: "https://abagallery.s3.ap-south-1.amazonaws.com/ABA+6.0/IMG_0869.jpeg"
        },
        {
            img: "https://abagallery.s3.ap-south-1.amazonaws.com/ABA+6.0/IMG_0870.jpeg"
        },
        {
            img: "https://abagallery.s3.ap-south-1.amazonaws.com/ABA+6.0/IMG_0873.jpeg"
        },
        {
            img: "https://abagallery.s3.ap-south-1.amazonaws.com/ABA+6.0/IMG_0874.jpeg"
        },
        {
            img: "https://abagallery.s3.ap-south-1.amazonaws.com/ABA+6.0/IMG_0882.jpeg"
        },
        {
            img: "https://abagallery.s3.ap-south-1.amazonaws.com/ABA+6.0/IMG_0889.jpeg"
        },
        {
            img: "https://abagallery.s3.ap-south-1.amazonaws.com/ABA+6.0/IMG_0895.jpeg"
        },
        {
            img: "https://abagallery.s3.ap-south-1.amazonaws.com/ABA+6.0/IMG_0899.jpeg"
        },
        {
            img: "https://abagallery.s3.ap-south-1.amazonaws.com/ABA+6.0/IMG_0907.jpeg"
        },
        {
            img: "https://abagallery.s3.ap-south-1.amazonaws.com/ABA+6.0/IMG_0911.jpeg"
        },
        {
            img: "https://abagallery.s3.ap-south-1.amazonaws.com/ABA+6.0/IMG_0915.jpeg"
        },
        {
            img: "https://abagallery.s3.ap-south-1.amazonaws.com/ABA+6.0/IMG_0928.jpeg"
        },
        {
            img: "https://abagallery.s3.ap-south-1.amazonaws.com/ABA+6.0/IMG_0930.jpeg"
        },
        {
            img: "https://abagallery.s3.ap-south-1.amazonaws.com/ABA+6.0/IMG_0935.jpeg"
        },
        {
            img: "https://abagallery.s3.ap-south-1.amazonaws.com/ABA+6.0/IMG_0941.jpeg"
        },
        {
            img: "https://abagallery.s3.ap-south-1.amazonaws.com/ABA+6.0/IMG_0956.jpeg"
        },
        {
            img: "https://abagallery.s3.ap-south-1.amazonaws.com/ABA+6.0/IMG_0969.jpg"
        },
        {
            img: "https://abagallery.s3.ap-south-1.amazonaws.com/ABA+6.0/IMG_0989.jpeg"
        },
        {
            img: "https://abagallery.s3.ap-south-1.amazonaws.com/ABA+6.0/IMG_0990.jpeg"
        },
        {
            img: "https://abagallery.s3.ap-south-1.amazonaws.com/ABA+6.0/IMG_0995.jpeg"
        },
        {
            img: "https://abagallery.s3.ap-south-1.amazonaws.com/ABA+6.0/IMG_1007.jpeg"
        },
        {
            img: "https://abagallery.s3.ap-south-1.amazonaws.com/ABA+6.0/IMG_1012.jpg"
        },
        {
            img: "https://abagallery.s3.ap-south-1.amazonaws.com/ABA+6.0/IMG_1020.jpeg"
        },
        {
            img: "https://abagallery.s3.ap-south-1.amazonaws.com/ABA+6.0/IMG_1027.jpg"
        },
    ]
    res.send(ABA6galleryImages)
})
app.get('/aba5images', async(req, res)=>{
    const ABA5galleryImages = [
        {
            img: "https://abagallery.s3.ap-south-1.amazonaws.com/ABA+2022/DSC00526.jpg"
        },
        {
            img: "https://abagallery.s3.ap-south-1.amazonaws.com/ABA+2022/DSC00550.jpg"
        },
        {
            img: "https://abagallery.s3.ap-south-1.amazonaws.com/ABA+2022/DSC00554.jpg"
        },
        {
            img: "https://abagallery.s3.ap-south-1.amazonaws.com/ABA+2022/DSC00558.jpg"
        },
        {
            img: "https://abagallery.s3.ap-south-1.amazonaws.com/ABA+2022/DSC00559.jpg"
        },
        {
            img: "https://abagallery.s3.ap-south-1.amazonaws.com/ABA+2022/DSC00566.jpg"
        },
        {
            img: "https://abagallery.s3.ap-south-1.amazonaws.com/ABA+2022/DSC00567.jpg"
        },
        {
            img: "https://abagallery.s3.ap-south-1.amazonaws.com/ABA+2022/DSC00578.jpg"
        },
        {
            img: "https://abagallery.s3.ap-south-1.amazonaws.com/ABA+2022/DSC00580.jpg"
        },
        {
            img: "https://abagallery.s3.ap-south-1.amazonaws.com/ABA+2022/DSC00584.jpg"
        },
        {
            img: "https://abagallery.s3.ap-south-1.amazonaws.com/ABA+2022/DSC00586.jpg"
        },
        {
            img: "https://abagallery.s3.ap-south-1.amazonaws.com/ABA+2022/DSC00587.jpg"
        },
        {
            img: "https://abagallery.s3.ap-south-1.amazonaws.com/ABA+2022/DSC00603.jpg"
        },
        {
            img: "https://abagallery.s3.ap-south-1.amazonaws.com/ABA+2022/DSC00605.jpg"
        },
        {
            img: "https://abagallery.s3.ap-south-1.amazonaws.com/ABA+2022/DSC00606.jpg"
        },
        {
            img: "https://abagallery.s3.ap-south-1.amazonaws.com/ABA+2022/DSC00607.jpg"
        },
        {
            img: "https://abagallery.s3.ap-south-1.amazonaws.com/ABA+2022/DSC00610.jpg"
        },
    ]
    res.send(ABA5galleryImages)
})



app.listen(3001, (req,res)=>{
    console.log("Running on Port: 3001")
});
