const app = require('./server');

const PORT = process.env.SERVER_PORT || 3000;
app.listen(PORT, () => console.log('Server running'));