import express from 'express';
import { google } from 'googleapis';
import cors from 'cors';
import bodyParser from 'body-parser';
import s3 from './s3.js';
import dotenv from 'dotenv';
import { start } from 'repl';

dotenv.config()
const app = express();
app.use(bodyParser.json({ limit: '50mb' }));
app.use(cors());

const ABA7spreadsheetID = '106TovGIMcMQ8miOds7L8zvi_67SNA4i-nRpG4l3fKo4'
const bucketName = process.env.BUCKET_NAME

// GAME TIME CONTENT -----------------------

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

app.get('/aba7teamlist', async (req, res) => {
    const auth = new google.auth.GoogleAuth({
        keyFile: 'credentials.json',
        scopes: 'https://www.googleapis.com/auth/spreadsheets'
    })
    const client = await auth.getClient();
    const googleSheets = google.sheets({ version: 'v4', auth: client });
    const TeamData = await googleSheets.spreadsheets.values.get({
        auth,
        spreadsheetId: ABA7spreadsheetID,
        range: 'ABA7TeamBudgetSplits!1:900'
    })
    res.send(TeamData.data.values);
})

app.get('/aba7games', async (req, res) => {
    const auth = new google.auth.GoogleAuth({
        keyFile: 'credentials.json',
        scopes: 'https://www.googleapis.com/auth/spreadsheets'
    })
    const client = await auth.getClient();
    const googleSheets = google.sheets({ version: 'v4', auth: client });
    const Games = await googleSheets.spreadsheets.values.get({
        auth,
        spreadsheetId: ABA7spreadsheetID,
        range: 'ABA7Games'
    })
    res.send(Games.data);
})

app.get('/aba7standings', async (req, res) => {
    const auth = new google.auth.GoogleAuth({
        keyFile: 'credentials.json',
        scopes: 'https://www.googleapis.com/auth/spreadsheets'
    })
    const client = await auth.getClient();
    const googleSheets = google.sheets({ version: 'v4', auth: client });
    const Standings = await googleSheets.spreadsheets.values.get({
        auth,
        spreadsheetId: ABA7spreadsheetID,
        range: 'ABA7Groups'
    })
    res.send(Standings.data);
})

app.get('/aba7standings/a', async (req, res) => {
    const auth = new google.auth.GoogleAuth({
        keyFile: 'credentials.json',
        scopes: 'https://www.googleapis.com/auth/spreadsheets'
    })
    const client = await auth.getClient();
    const googleSheets = google.sheets({ version: 'v4', auth: client });
    const Standings = await googleSheets.spreadsheets.values.get({
        auth,
        spreadsheetId: ABA7spreadsheetID,
        range: 'ABA7Groups!A2:K5'
    })
    res.send(Standings.data);
})

app.get('/aba7standings/b', async (req, res) => {
    const auth = new google.auth.GoogleAuth({
        keyFile: 'credentials.json',
        scopes: 'https://www.googleapis.com/auth/spreadsheets'
    })
    const client = await auth.getClient();
    const googleSheets = google.sheets({ version: 'v4', auth: client });
    const Standings = await googleSheets.spreadsheets.values.get({
        auth,
        spreadsheetId: ABA7spreadsheetID,
        range: 'ABA7Groups!A7:K10'
    })
    res.send(Standings.data);
})

app.get('/aba7standings/c', async (req, res) => {
    const auth = new google.auth.GoogleAuth({
        keyFile: 'credentials.json',
        scopes: 'https://www.googleapis.com/auth/spreadsheets'
    })
    const client = await auth.getClient();
    const googleSheets = google.sheets({ version: 'v4', auth: client });
    const Standings = await googleSheets.spreadsheets.values.get({
        auth,
        spreadsheetId: ABA7spreadsheetID,
        range: 'ABA7Groups!A12:K15'
    })
    res.send(Standings.data);
})

app.get('/aba7standings/d', async (req, res) => {
    const auth = new google.auth.GoogleAuth({
        keyFile: 'credentials.json',
        scopes: 'https://www.googleapis.com/auth/spreadsheets'
    })
    const client = await auth.getClient();
    const googleSheets = google.sheets({ version: 'v4', auth: client });
    const Standings = await googleSheets.spreadsheets.values.get({
        auth,
        spreadsheetId: ABA7spreadsheetID,
        range: 'ABA7Groups!A17:K20'
    })
    res.send(Standings.data);
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

app.get('/aba7/leaderboard/points', async (req, res) => {
    const auth = new google.auth.GoogleAuth({
        keyFile: 'credentials.json',
        scopes: 'https://www.googleapis.com/auth/spreadsheets'
    })
    const client = await auth.getClient();
    const googleSheets = google.sheets({ version: 'v4', auth: client });
    const LDRBPoints = await googleSheets.spreadsheets.values.get({
        auth,
        spreadsheetId: ABA7spreadsheetID,
        range: 'ABA7Stats!2:900'
    })

    var ldrbPoints = {}
    LDRBPoints.data.values.map((statRow)=>{
        ldrbPoints[statRow[0]] = [
            statRow[0],
            0,
            0,
            []
        ]
    })

    LDRBPoints.data.values.map((statRow)=>{
        var name = statRow[0]
        var newPoints = parseFloat(statRow[4])
        var newStatRow = [
            statRow[0], //name
            statRow[2], //against
            statRow[4], //points
        ]
        var previousPoints = parseFloat(ldrbPoints[name][1])
        var finalPoints = newPoints + previousPoints

        ldrbPoints[name][1] = finalPoints
        ldrbPoints[name][3].push(newStatRow)
    })

    var finalPoints = []
    for (const key in ldrbPoints){
        finalPoints.push(ldrbPoints[key])
    }

    finalPoints.map((player)=>{
        player[2] = parseFloat( parseFloat(player[1]) / parseFloat(player[3].length) )
    })

    var finalPointsAVG = finalPoints.sort((a, b) => b[2] - a[2])
    var finalPointsTotal = finalPoints.sort((a, b) => b[1] - a[1])

    var PointsData = {
        'Total' : finalPointsTotal,
        'Average' : finalPointsAVG
    }

    res.send(PointsData);
})

app.get('/aba7/leaderboard/assists', async (req, res) => {
    const auth = new google.auth.GoogleAuth({
        keyFile: 'credentials.json',
        scopes: 'https://www.googleapis.com/auth/spreadsheets'
    })
    const client = await auth.getClient();
    const googleSheets = google.sheets({ version: 'v4', auth: client });
    const LDRBAssists = await googleSheets.spreadsheets.values.get({
        auth,
        spreadsheetId: ABA7spreadsheetID,
        range: 'ABA7Stats!2:900'
    })

    var ldrbAssists = {}
    LDRBAssists.data.values.map((statRow)=>{
        ldrbAssists[statRow[0]] = [
            statRow[0],
            0,
            0,
            []
        ]
    })

    LDRBAssists.data.values.map((statRow)=>{
        var name = statRow[0]
        var newAssists = parseFloat(statRow[6])
        var newStatRow = [
            statRow[0], //name
            statRow[2], //against
            statRow[6], //assists
        ]
        var previousAssists = parseFloat(ldrbAssists[name][1])
        var finalAssists = newAssists + previousAssists

        ldrbAssists[name][1] = finalAssists
        ldrbAssists[name][3].push(newStatRow)
    })

    var finalAssists = []
    for (const key in ldrbAssists){
        finalAssists.push(ldrbAssists[key])
    }

    finalAssists.map((player)=>{
        player[2] = parseFloat( parseFloat(player[1]) / parseFloat(player[3].length) )
    })

    var finalAssistsAVG = finalAssists.sort((a, b) => b[2] - a[2])
    var finalAssistsTotal = finalAssists.sort((a, b) => b[1] - a[1])

    var AssistsData = {
        'Total' : finalAssistsTotal,
        'Average' : finalAssistsAVG
    }

    res.send(AssistsData);
})

app.get('/aba7/leaderboard/rebounds', async (req, res) => {
    const auth = new google.auth.GoogleAuth({
        keyFile: 'credentials.json',
        scopes: 'https://www.googleapis.com/auth/spreadsheets'
    })
    const client = await auth.getClient();
    const googleSheets = google.sheets({ version: 'v4', auth: client });
    const LDRBRebounds = await googleSheets.spreadsheets.values.get({
        auth,
        spreadsheetId: ABA7spreadsheetID,
        range: 'ABA7Stats!2:900'
    })

    var ldrbRebounds = {}
    LDRBRebounds.data.values.map((statRow)=>{
        ldrbRebounds[statRow[0]] = [
            statRow[0],
            0,
            0,
            []
        ]
    })

    LDRBRebounds.data.values.map((statRow)=>{
        var name = statRow[0]
        var newRebounds = parseFloat(statRow[5])
        var newStatRow = [
            statRow[0], //name
            statRow[2], //against
            statRow[5], //Rebounds
        ]
        var previousRebounds = parseFloat(ldrbRebounds[name][1])
        var finalRebounds = newRebounds + previousRebounds

        ldrbRebounds[name][1] = finalRebounds
        ldrbRebounds[name][3].push(newStatRow)
    })

    var finalRebounds = []
    for (const key in ldrbRebounds){
        finalRebounds.push(ldrbRebounds[key])
    }

    finalRebounds.map((player)=>{
        player[2] = parseFloat( parseFloat(player[1]) / parseFloat(player[3].length) )
    })

    var finalReboundsAVG = finalRebounds.sort((a, b) => b[2] - a[2])
    var finalReboundsTotal = finalRebounds.sort((a, b) => b[1] - a[1])

    var ReboundsData = {
        'Total' : finalReboundsTotal,
        'Average' : finalReboundsAVG
    }

    res.send(ReboundsData);
})

app.get('/aba7/leaderboard/steals', async (req, res) => {
    const auth = new google.auth.GoogleAuth({
        keyFile: 'credentials.json',
        scopes: 'https://www.googleapis.com/auth/spreadsheets'
    })
    const client = await auth.getClient();
    const googleSheets = google.sheets({ version: 'v4', auth: client });
    const LDRBSteals = await googleSheets.spreadsheets.values.get({
        auth,
        spreadsheetId: ABA7spreadsheetID,
        range: 'ABA7Stats!2:900'
    })

    var ldrbSteals = {}
    LDRBSteals.data.values.map((statRow)=>{
        ldrbSteals[statRow[0]] = [
            statRow[0],
            0,
            0,
            []
        ]
    })

    LDRBSteals.data.values.map((statRow)=>{
        var name = statRow[0]
        var newSteals = parseFloat(statRow[7])
        var newStatRow = [
            statRow[0], //name
            statRow[2], //against
            statRow[7], //Rebounds
        ]
        var previousSteals = parseFloat(ldrbSteals[name][1])
        var finalSteals = newSteals + previousSteals

        ldrbSteals[name][1] = finalSteals
        ldrbSteals[name][3].push(newStatRow)
    })

    var finalSteals = []
    for (const key in ldrbSteals){
        finalSteals.push(ldrbSteals[key])
    }

    finalSteals.map((player)=>{
        player[2] = parseFloat( parseFloat(player[1]) / parseFloat(player[3].length) )
    })

    var finalStealsAVG = finalSteals.sort((a, b) => b[2] - a[2])
    var finalStealsTotal = finalSteals.sort((a, b) => b[1] - a[1])

    var StealsData = {
        'Total' : finalStealsTotal,
        'Average' : finalStealsAVG
    }

    res.send(StealsData);
})

app.get('/aba7/leaderboard/blocks', async (req, res) => {
    const auth = new google.auth.GoogleAuth({
        keyFile: 'credentials.json',
        scopes: 'https://www.googleapis.com/auth/spreadsheets'
    })
    const client = await auth.getClient();
    const googleSheets = google.sheets({ version: 'v4', auth: client });
    const LDRBBlocks = await googleSheets.spreadsheets.values.get({
        auth,
        spreadsheetId: ABA7spreadsheetID,
        range: 'ABA7Stats!2:900'
    })

    var ldrbBlocks = {}
    LDRBBlocks.data.values.map((statRow)=>{
        ldrbBlocks[statRow[0]] = [
            statRow[0],
            0,
            0,
            []
        ]
    })

    LDRBBlocks.data.values.map((statRow)=>{
        var name = statRow[0]
        var newBlocks = parseFloat(statRow[12])
        var newStatRow = [
            statRow[0], //name
            statRow[2], //against
            statRow[12], //blocks
        ]
        var previousBlocks = parseFloat(ldrbBlocks[name][1])
        var finalBlocks = newBlocks + previousBlocks

        ldrbBlocks[name][1] = finalBlocks
        ldrbBlocks[name][3].push(newStatRow)
    })

    var finalBlocks = []
    for (const key in ldrbBlocks){
        finalBlocks.push(ldrbBlocks[key])
    }

    finalBlocks.map((player)=>{
        player[2] = parseFloat( parseFloat(player[1]) / parseFloat(player[3].length) )
    })

    var finalBlocksAVG = finalBlocks.sort((a, b) => b[2] - a[2])
    var finalBlocksTotal = finalBlocks.sort((a, b) => b[1] - a[1])

    var BlocksData = {
        'Total' : finalBlocksTotal,
        'Average' : finalBlocksAVG
    }

    res.send(BlocksData);
})

// ------------------------------------------


// IMAGES FOR GALLERY -----------------------

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

// ------------------------------------------


// FANTASY ENDPOINTS -----------------------

app.get('/fantasy/getTeam', async (req, res) => {
    const userEmail = req.query.email;

    if (!userEmail) {
        return res.status(400).send({ error: 'Email parameter is required.' });
    }

    const auth = new google.auth.GoogleAuth({
        keyFile: 'credentials.json',
        scopes: 'https://www.googleapis.com/auth/spreadsheets'
    });

    const client = await auth.getClient();
    const googleSheets = google.sheets({ version: 'v4', auth: client });

    const FantasyData = await googleSheets.spreadsheets.values.get({
        auth,
        spreadsheetId: ABA7spreadsheetID,
        range: 'ABA7Fantasy!2:900'
    });

    // Assuming the email is in the 3rd column (index 2 of the array)
    const userRow = [...FantasyData.data.values].reverse().find(row => row[2] === userEmail);


    if (!userRow) {
        return res.status(200).send([
            [], [], [], [], []
        ]);
    }

    res.send(userRow);
});

app.post('/fantasy/saveTeam', async (req, res) => {

    const auth = new google.auth.GoogleAuth({
        keyFile: 'credentials.json',
        scopes: 'https://www.googleapis.com/auth/spreadsheets'
    })
    const client = await auth.getClient();
    const googleSheets = google.sheets({ version: 'v4', auth: client });
    const response = await googleSheets.spreadsheets.values.append({
        spreadsheetId: ABA7spreadsheetID,
        range: "ABA7Fantasy",
        valueInputOption: "USER_ENTERED",
        resource: {
            values: [[
                req.body.picture,
                req.body.name,
                req.body.email,
                req.body.player1photo,
                req.body.player1,
                req.body.player1gender,
                req.body.player1price,
                req.body.player1team,
                req.body.player1tier,
                req.body.player1key,


                req.body.player2photo,
                req.body.player2,
                req.body.player2gender,
                req.body.player2price,
                req.body.player2team,
                req.body.player2tier,
                req.body.player2key,

                req.body.player3photo,
                req.body.player3,
                req.body.player3gender,
                req.body.player3price,
                req.body.player3team,
                req.body.player3tier,
                req.body.player3key,

                req.body.player4photo,
                req.body.player4,
                req.body.player4gender,
                req.body.player4price,
                req.body.player4team,
                req.body.player4tier,
                req.body.player4key,

                req.body.player5photo,
                req.body.player5,
                req.body.player5gender,
                req.body.player5price,
                req.body.player5team,
                req.body.player5tier,
                req.body.player5key,
            ]],
        },
    });
    res.send(response)
})

app.post('/fantasy/validateTeam', (req, res) => {
    // Destructuring player data
    const players = [
        {
            name: req.body.player1,
            gender: req.body.player1gender,
            price: req.body.player1price,
            team: req.body.player1team
        },
        {
            name: req.body.player2,
            gender: req.body.player2gender,
            price: req.body.player2price,
            team: req.body.player2team
        },
        {
            name: req.body.player3,
            gender: req.body.player3gender,
            price: req.body.player3price,
            team: req.body.player3team
        },
        {
            name: req.body.player4,
            gender: req.body.player4gender,
            price: req.body.player4price,
            team: req.body.player4team
        },
        {
            name: req.body.player5,
            gender: req.body.player5gender,
            price: req.body.player5price,
            team: req.body.player5team
        },
    ];

    // Check for missing player data
    if (players.some(player => !player.name || !player.gender || !player.price || !player.team)) {
        return res.status(400).send('Incomplete player data. Please ensure all players have their data properly set.');
    }

    // Condition 1: Maximum team value <= $50Mil
    const totalValue = players.reduce((total, player) => total + parseFloat(player.price), 0);
    if (totalValue > 50) {
        return res.status(400).send('Total team value exceeds $50 million.');
    }

    // Condition 2: Minimum number of players to save your team = 5
    if (players.length !== 5) {
        return res.status(400).send('You must select 5 players.');
    }

    // Condition 3: Minimum number of women in your team = 2
    const femalePlayers = players.filter(player => player.gender === 'Non Cis-Man').length;
    if (femalePlayers < 2) {
        return res.status(400).send('You must have at least 2 non-cis men players.');
    }

    // Condition 4: No more than 2 players from one team
    const teamCounts = {};
    players.forEach(player => {
        if (!teamCounts[player.team]) {
            teamCounts[player.team] = 1;
        } else {
            teamCounts[player.team]++;
        }
    });

    const overrepresentedTeams = Object.values(teamCounts).filter(count => count > 2);
    if (overrepresentedTeams.length > 0) {
        return res.status(400).send('You cannot have more than 2 players from the same team.');
    }

    // Condition 5: Cannot have the same player more than once in your team.
    const uniquePlayers = new Set(players.map(player => player.name));
    if (uniquePlayers.size !== players.length) {
        return res.status(400).send('You cannot have duplicate players.');
    }

    // If all conditions are satisfied
    res.status(200).send('Team is valid.');
});

app.get('/fantasy/getAllTeams', async (req, res) => {
    const auth = new google.auth.GoogleAuth({
        keyFile: 'credentials.json',
        scopes: 'https://www.googleapis.com/auth/spreadsheets'
    });

    const client = await auth.getClient();
    const googleSheets = google.sheets({ version: 'v4', auth: client });

    const FantasyData = await googleSheets.spreadsheets.values.get({
        auth,
        spreadsheetId: ABA7spreadsheetID,
        range: 'ABA7Fantasy!3:900'
    });

    var allTeams = {}

    FantasyData.data.values.map((team) => {

        // allTeams[team[2]] = team

        allTeams[team[2]] = [
            team[0], //pic 
            team[1], //name
            team[2], //email

            team[3], //p1 pic
            team[4], //p1 name
            team[5], //p1 gender
            team[6], //p1 fantasy price

            team[10], //p2 pic
            team[11], //p2 name
            team[12], //p2 gender
            team[13], //p2 fantasy price

            team[17], //p3 pic
            team[18], //p3 name
            team[19], //p3 gender
            team[20], //p3 fantasy price

            team[24], //p4 pic
            team[25], //p4 name
            team[26], //p4 gender
            team[27], //p4 fantasy price

            team[31], //p5 pic
            team[32], //p5 name
            team[33], //p5 gender
            team[34], //p5 fantasy price

            team[38]
        ]

    })

    var teams = []

    for (const key in allTeams) {
        if (allTeams[key][1] != '') {
            teams.push(allTeams[key])
        }
    }
    teams.sort((a, b) => a[23] - b[23])
    teams.reverse()

    res.send(teams)
});

app.get('/fantasy/getAllPlayers', async (req, res) => {
    const auth = new google.auth.GoogleAuth({
        keyFile: 'credentials.json',
        scopes: 'https://www.googleapis.com/auth/spreadsheets'
    });

    const client = await auth.getClient();
    const googleSheets = google.sheets({ version: 'v4', auth: client });

    const PlayerData = await googleSheets.spreadsheets.values.get({
        auth,
        spreadsheetId: ABA7spreadsheetID,
        range: 'ABA7Players!2:900'
    });

    var allPlayers = {}

    PlayerData.data.values.map((player)=>{
        allPlayers[player[1]] = [
            player[0], //pic
            player[1], //name
            player[13], // points
            player[14], // rebounds
            player[15], // assists
            player[16], // steals
            player[17], // fouls
            player[18], // blocks
            player[19], //fantasy points
            player[20], //fantasy price
            [], //stats array
        ]
    })

    // allPlayers.sort((a, b) => b[8] - a[8])

    res.send(allPlayers)
});


// ------------------------------------------

// app.post('/image', async (req, res) =>{

//     const auth = new google.auth.GoogleAuth({
//         keyFile: 'credentials.json',
//         scopes: 'https://www.googleapis.com/auth/spreadsheets'
//     })
//     const client = await auth.getClient();
//     const googleSheets = google.sheets({version: 'v4', auth: client});
//     const response = await googleSheets.spreadsheets.values.append({
//         spreadsheetId: ABA7spreadsheetID,
//         range: "ABA7Images",
//         valueInputOption: "USER_ENTERED",
//         resource: {
//             // image, firstname, middlename, lastname, emailid, batch, phone, gender, primarypos, secondpos, comment
//             values: [[
//                 req.body.image,
//                 req.body.name
//             ]],
//         },
//       });
//       res.send(response)
// } )

app.listen(3001, (req, res) => {
    console.log("Running on Port: 3001")
});
