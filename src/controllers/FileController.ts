import { Request, Response } from 'express';
import { FileManager } from '../models/FileManager';

export class FileController {
    private fileManager: FileManager;

    constructor() {
        this.fileManager = new FileManager();
    }

    uploadFiles(req: Request, res: Response): any {
        const files = req.files as Express.Multer.File[];
        if (!files || files.length === 0) {
            return res.status(400).json({ error: 'No files uploaded' });
        }

        // Agregar archivos al FileManager
        files.forEach(file => {
            this.fileManager.addFile(file.originalname, file.buffer.toString());
        });

        // Devolver la lista de archivos
        res.json({ message: 'Files uploaded successfully', files: this.getFiles() });
    }

    removeFile(req: Request, res: Response): any {
        const { index } = req.params;
        const parsedIndex = parseInt(index, 10);
        if (isNaN(parsedIndex)) {
            return res.status(400).json({ error: 'Invalid index' });
        }

        this.fileManager.removeFile(parsedIndex);
        res.json({ message: 'File removed successfully', files: this.getFiles() });
    }

    mergeFiles(req: Request, res: Response): void {
        const mergedContent = this.fileManager.mergeFiles();
        res.json({ content: mergedContent });
    }

    private getFiles(): { name: string; content: string }[] {
        return this.fileManager['files']; // Acceder directamente a los archivos privados
    }
}