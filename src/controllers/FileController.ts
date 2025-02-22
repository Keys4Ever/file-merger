import { Request, Response } from 'express';
import { FileManager } from '../models/FileManager';
import path from 'path';

export class FileController {
    private fileManager: FileManager;

    constructor() {
        this.fileManager = new FileManager();
    }

    uploadFiles(req: Request, res: Response): any {
        const files = req.files as Express.Multer.File[];
        const paths = req.body.paths as string[];

        if (!files || files.length === 0) {
            return res.status(400).json({ error: 'No files uploaded' });
        }

        files.forEach((file, index) => {
            const filePath = paths[index];
            const dirPath = path.dirname(filePath);
            
            this.fileManager.addFile(
                path.basename(file.originalname),
                file.buffer.toString(),
                dirPath
            );
        });

        res.json({ message: 'Files uploaded successfully', files: this.getFiles() });
    }


    private getFiles(): { name: string; content: string; path: string }[] {
        return this.fileManager['files'];
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
}