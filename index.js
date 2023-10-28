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

app.get('/fantasy/getPlayers', async (req, res) => {
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
