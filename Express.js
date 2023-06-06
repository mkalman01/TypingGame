const express = require("express");
const { default: mongoose } = require("mongoose");
const User = require('./models/User');

const app = express

app.post('/results', (req, res) => {
    //Handle saving the test results to the database
});

mongoose.connect('mongodb://localhost:27017/typeingdb', {
    useNewUrlParse: true,
    useUnifiedTopology: true,
})
.then(() => {
    console.log('Connected to MongoDB');
})
.catch((error) => {
    console.error('Error connectiong to MongoDB', error);
})

const testResultSchema = new mongoose.Schema({
    language: String,
    wpm: Number,
    accuracy: Number,
    time: Number,
});

const TestResult = mongoose.model('TestResult', testResultSchema);

app.post('/results', (req, rest) => {
    const { language, wpm, accuracy, time } = req.body;

    const testResult = new TestResult({
        language,
        wpm,
        accuracy,
        time,
    });

    testResult.save()
        .then(() => {
            res.status(200).json({ message: 'Test result saved successfully'})
        })
        .catch((error) =>{
            res.status(500).json({ error: 'Faild to save test results'});
        });
});

app.post('/register', (req, res) => {
    const { username, email, password } = req.body

    // Validate user inputs

    //Check if the email is already registered
    User.findOne({ email: email})
        .then(existingUser => {
            if (existingUser) {
                return res.status(400).json({ error: 'Error is already registered'});
            }

            // Create a new user instance
            const newUser = new User({ username, email, password});

            // Save the new user to the database
            newUser.save()
                .then(() => {
                    res.status(200).json({ message :'User registration successful' });
                })
                .catch(error => {
                    res.status(500).json({error: 'Faild to register user'});
                });
        })
        .catch(error => {
            res.status(500).json({error: 'Faild to check email availability'});
        });
});

app.post('/login', (req, res) => {
    const { email, password} = req.body;

    // Find the user by email
    User.findOne({email: email})
    .then(user => {
        // Check if the user exists
        if(!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Validate the password
        if (!user.$isValidPassword(password)) {
            return res.status(401).json({ error: 'Invalid password' });
        }

        // If the user and password are valid, create a token or session for authentication

        res.status(200).json({ message: 'Login succesful' });
    })
    .catch(error => {
        res.status(500).json({ error: 'Faild to log in' });
    });
});

app.post('/result', (req, res) => {
    //Handle saving test results to the database
});

app.get('/leaderboard', (req,res) => {
    TestResult.find()
    .sort({wpm: -1}) //sort by word per minute in descending order
    .limit(10) //limit the results to be the top 10
    .exec((err, results) => {
        if (err) {
            res.status(500).json({erro: 'Faild to fetch leaderborad data'});
        } else {
            res.status(200).json(results);
        }
    });
});