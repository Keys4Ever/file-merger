import { Router } from 'express';
import { FileController } from '../controllers/FileController';
import multer from 'multer';

const router = Router();
const fileController = new FileController();
const upload = multer({ storage: multer.memoryStorage() });

router.post('/upload', upload.array('files'), fileController.uploadFiles);
router.delete('/remove/:index', fileController.removeFile);
router.get('/merge', fileController.mergeFiles);

export default router;