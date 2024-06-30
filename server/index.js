const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const EmployeeModel = require('./models/Employee');
const uploadRouter = require('./routes/router.js');
const chatgptService = require('./services/chatgptService');  

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use('/upload-receipt', uploadRouter);

// Connect to MongoDB
async function connectDB() {
    try {
        await mongoose.connect("mongodb+srv://test:test123@atlascluster.ijk5v95.mongodb.net/?retryWrites=true&w=majority&appName=AtlasCluster", {
            useNewUrlParser: true,
            useUnifiedTopology: true    
        });
        console.log("Connected to MongoDB");
    } catch (error) {
        console.error("Error connecting to MongoDB", error);
    }
}
connectDB();

// Login endpoint
app.post("/login", (req, res) => {
    const { email, password } = req.body;
    EmployeeModel.findOne({ email: email })
        .then(user => {
            if (user) {
                if (user.password === password) {
                    res.json("Success");
                } else {
                    res.json("Incorrect password");
                }
            } else {
                res.json("No user found");
            }
        })
        .catch(err => {
            console.error(err);
            res.status(500).json({ error: 'Internal server error' });
        });
});

// Register endpoint
app.post('/register', async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const newEmployee = await EmployeeModel.create({ name, email, password });
        res.status(201).json(newEmployee);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Endpoint for ChatGPT service
app.post("/chatgptService", async (req, res) => {
    const { selectedimage } = req.body; 
    try {
        const image = await chatgptService(selectedimage); // Call the chatgptService function
        res.json({ image });
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
