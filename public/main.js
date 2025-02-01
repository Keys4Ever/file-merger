document.addEventListener('DOMContentLoaded', () => {
    const fileInput = document.getElementById('file-input');
    const fileList = document.getElementById('file-list');
    const downloadButton = document.getElementById('download-btn');
    const copyButton = document.getElementById('copy-btn');

    let files = [];

    fileInput.addEventListener('change', async (event) => {
        const formData = new FormData();
        for (const file of event.target.files) {
            formData.append('files', file); // El nombre 'files' debe coincidir con el backend
        }

        try {
            const response = await fetch('/api/files/upload', {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();
            files = data.files; // Actualizar la lista de archivos
            renderFileList();
        } catch (error) {
            console.error('Error uploading files:', error);
        }
    });

    fileList.addEventListener('click', async (event) => {
        if (event.target.classList.contains('remove-btn')) {
            const index = event.target.dataset.index;
            try {
                await fetch(`/api/files/remove/${index}`, { method: 'DELETE' });
                files.splice(index, 1); // Eliminar el archivo del frontend
                renderFileList();
            } catch (error) {
                console.error('Error removing file:', error);
            }
        }
    });

    downloadButton.addEventListener('click', async () => {
        try {
            const response = await fetch('/api/files/merge');
            const data = await response.json();
            const blob = new Blob([data.content], { type: 'text/plain' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'merged-files.txt';
            a.click();
            URL.revokeObjectURL(url);
        } catch (error) {
            console.error('Error downloading file:', error);
        }
    });

    copyButton.addEventListener('click', async () => {
        try {
            const response = await fetch('/api/files/merge');
            const data = await response.json();
            navigator.clipboard.writeText(data.content).then(() => {
                alert('Copied to clipboard!');
            });
        } catch (error) {
            console.error('Error copying to clipboard:', error);
        }
    });

    function renderFileList() {
        fileList.innerHTML = '';
        files.forEach((file, index) => {
            const li = document.createElement('li');
            li.textContent = file.name;
            const removeBtn = document.createElement('button');
            removeBtn.textContent = 'Remove';
            removeBtn.classList.add('remove-btn');
            removeBtn.dataset.index = index;
            li.appendChild(removeBtn);
            fileList.appendChild(li);
        });
    }
});