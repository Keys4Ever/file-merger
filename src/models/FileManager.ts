export class FileManager {
    private files: { name: string; content: string; path: string }[] = [];

    addFile(name: string, content: string, path: string = ''): void {
        this.files.push({ name, content, path });
    }

    removeFile(index: number): void {
        this.files.splice(index, 1);
    }

    mergeFiles(): string {
        let mergedContent = '';

        for (const file of this.files) {
            const pathComment = file.path ? 
                `/**\n * ${file.path}\n */\n\n` : '';
            
            mergedContent += `${pathComment}// ${file.name}\n${file.content}\n\n`;
        }

        return mergedContent;
    }
}