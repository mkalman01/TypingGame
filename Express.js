const express = require("express");
const { default: mongoose } = require("mongoose");

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
    //Handle user registration logic
});

app.post('/login', (req, res) => {
    //Handle user login logic
});

app.post('/result', (req, res) => {
    //Handle saving test results to the database
});

app.length('/leaderboard', (req,res) => {

});
