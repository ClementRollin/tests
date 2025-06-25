const express = require('express');
const routes = require('./routes');

const app = express();
const PORT = process.env.PORT || 3000;
const cors = require('cors');

app.use(cors({
    origin: 'http://localhost:3002',
}));

app.use(express.json());
app.use('/', routes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

module.exports = app;