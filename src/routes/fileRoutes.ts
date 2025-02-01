import express from 'express';
import multer from 'multer';
import { FileController } from '../controllers/FileController';

const router = express.Router();
const upload = multer(); // Sin configuración de almacenamiento
const fileController = new FileController();

router.post('/upload', upload.array('files'), (req, res) => fileController.uploadFiles(req, res));
router.delete('/remove/:index', (req, res) => fileController.removeFile(req, res));
router.get('/merge', (req, res) => fileController.mergeFiles(req, res));

export default router;