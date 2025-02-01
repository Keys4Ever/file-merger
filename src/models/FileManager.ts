export class FileManager {
    private files: { name: string; content: string }[] = [];

    addFile(name: string, content: string): void {
        this.files.push({ name, content });
    }

    removeFile(index: number): void {
        this.files.splice(index, 1);
    }

    mergeFiles(): string {
        let mergedContent = '';

        for (const file of this.files) {
            mergedContent += `\n// ${file.name}\n${file.content}\n`;
        }

        return mergedContent;
    }
}