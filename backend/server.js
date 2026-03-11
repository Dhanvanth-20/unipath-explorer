import express from 'express';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Routes

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', message: 'UniPath Explorer API is running' });
});

// Countries endpoints
app.get('/api/countries', (req, res) => {
    // Placeholder - will return country data for comparison
    res.json({
        countries: [
            { id: 'usa', name: 'United States', tuitionRange: '$10,000 - $55,000', livingCost: '$1,000 - $2,500/month' },
            { id: 'uk', name: 'United Kingdom', tuitionRange: '$10,000 - $35,000', livingCost: '$1,200 - $2,000/month' },
            { id: 'canada', name: 'Canada', tuitionRange: '$8,000 - $30,000', livingCost: '$1,000 - $2,000/month' },
            { id: 'australia', name: 'Australia', tuitionRange: '$10,000 - $35,000', livingCost: '$1,500 - $2,500/month' },
            { id: 'germany', name: 'Germany', tuitionRange: '$0 - $5,000', livingCost: '$900 - $1,500/month' }
        ]
    });
});

// Universities endpoints
app.get('/api/universities', (req, res) => {
    // Placeholder - will return university data
    res.json({
        universities: [
            { id: 1, name: 'Harvard University', country: 'USA', ranking: 1, tuition: 55000 },
            { id: 2, name: 'University of Oxford', country: 'UK', ranking: 2, tuition: 35000 },
            { id: 3, name: 'MIT', country: 'USA', ranking: 3, tuition: 57500 },
            { id: 4, name: 'Stanford University', country: 'USA', ranking: 4, tuition: 56100 },
            { id: 5, name: 'University of Cambridge', country: 'UK', ranking: 5, tuition: 38000 }
        ]
    });
});

// Eligibility checker endpoint
app.post('/api/eligibility', (req, res) => {
    const { gpa, greScore, toeflScore, budget } = req.body;

    // Placeholder eligibility logic
    const results = [];

    if (gpa >= 3.5 && budget >= 50000) {
        results.push({ country: 'USA', universities: 50, eligibility: 'High' });
    }
    if (gpa >= 3.0 && budget >= 30000) {
        results.push({ country: 'UK', universities: 30, eligibility: 'Medium' });
    }
    if (gpa >= 3.0 && budget >= 25000) {
        results.push({ country: 'Canada', universities: 25, eligibility: 'Medium' });
    }
    if (budget >= 10000) {
        results.push({ country: 'Germany', universities: 20, eligibility: 'High' });
    }

    res.json({ eligible: results });
});

// Cost calculator endpoint
app.post('/api/calculate-cost', (req, res) => {
    const { country, university, duration, livingStyle } = req.body;

    // Placeholder cost calculation
    const tuitionPerYear = 20000;
    const livingMultiplier = livingStyle === 'luxury' ? 2 : livingStyle === 'budget' ? 0.7 : 1;
    const livingPerMonth = 1500 * livingMultiplier;

    const total = {
        tuition: tuitionPerYear * duration,
        living: livingPerMonth * 12 * duration,
        total: (tuitionPerYear * duration) + (livingPerMonth * 12 * duration)
    };

    res.json(total);
});

// Start server
app.listen(PORT, () => {
    console.log(`UniPath Explorer API running on port ${PORT}`);
});