import express from 'express'
import { dirname, join } from 'path'
import { fileURLToPath } from 'url';

const app = express()
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename)

app.use(express.static(join(__dirname, 'dist')))
app.get('/*', function(req, res) {
    res.sendFile(join(__dirname, 'dist', 'index.html'))
});
app.listen(9000, () => {
    console.log('Server berjalan pada http://localhost:9000/');
});