const express = require('express');
const cors = require('cors');  // Import cors for handling CORS issues
const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());  // Enable CORS
app.use(express.json());  // Parse JSON bodies

// Handle POST requests to /bfhl
app.post('/bfhl', (req, res) => {
    try {
        const { data } = req.body;

        // Validate input
        if (!Array.isArray(data)) {
            return res.status(400).json({ error: 'Invalid input: Data should be an array' });
        }

        // Process data
        const processedData = processData(data);

        // Send response
        res.json({
            status: 'true',
            user_id: 'BurlagaddaSaiNikhil2642004',
            email: 'burlagaddasai.nikhil2021@vitstudent.ac.in',
            roll_number: '21BAI11398',
            ...processedData
        });
    } catch (error) {
        console.error('Error processing request:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Handle GET requests to /bfhl
app.get('/bfhl', (req, res) => {
    res.json({ operation_code: '1398' });
});

// Optionally, handle root URL requests
app.get('/', (req, res) => {
    res.send('Welcome to the API');
});

// Function to process data
const processData = (data) => {
    const numbers = [];
    const alphabets = [];
    let highestLowercaseAlphabet = '';

    data.forEach(item => {
        if (!isNaN(item)) {
            numbers.push(item);
        } else if (typeof item === 'string' && item.match(/[a-zA-Z]/)) {
            alphabets.push(item);
            if (item === item.toLowerCase() && item > highestLowercaseAlphabet) {
                highestLowercaseAlphabet = item;
            }
        }
    });

    return {
        numbers,
        alphabets,
        highestLowercaseAlphabet: highestLowercaseAlphabet ? [highestLowercaseAlphabet] : []
    };
};

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
