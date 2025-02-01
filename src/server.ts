import express from 'express';
import cors from 'cors';
import path from 'path';
import fileRoutes from './routes/fileRoutes';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.static(path.join(__dirname, './public')));
app.use(express.json());
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
});
app.use('/api/files', fileRoutes);

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});