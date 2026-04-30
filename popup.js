let csvData = [];
let currentIndex = 0;

document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        const tabName = btn.dataset.tab;
        document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
        document.querySelectorAll('.tab-content').forEach(t => t.classList.remove('active'));
        btn.classList.add('active');
        document.getElementById(tabName).classList.add('active');
    });
});

const uploadArea = document.getElementById('uploadArea');
const csvFile = document.getElementById('csvFile');

uploadArea.addEventListener('click', () => csvFile.click());

uploadArea.addEventListener('dragover', (e) => {
    e.preventDefault();
    uploadArea.style.borderColor = '#764ba2';
});

uploadArea.addEventListener('dragleave', () => {
    uploadArea.style.borderColor = '#667eea';
});

uploadArea.addEventListener('drop', (e) => {
    e.preventDefault();
    const files = e.dataTransfer.files;
    if (files.length > 0) handleFileSelect(files[0]);
});

csvFile.addEventListener('change', (e) => {
    if (e.target.files.length > 0) handleFileSelect(e.target.files[0]);
});

function handleFileSelect(file) {
    const reader = new FileReader();
    reader.onload = (e) => {
        csvData = parseCSV(e.target.result);
        showFileInfo(file.name);
    };
    reader.readAsText(file);
}

function parseCSV(text) {
    const lines = text.trim().split('\n');
    const headers = lines[0].split(',').map(h => h.trim());
    const data = [];
    
    for (let i = 1; i < lines.length; i++) {
        const obj = {};
        const values = lines[i].split(',').map(v => v.trim());
        headers.forEach((header, idx) => {
            obj[header] = values[idx] || '';
        });
        data.push(obj);
    }
    
    return data;
}

function showFileInfo(name) {
    document.getElementById('fileInfo').style.display = 'block';
    document.getElementById('fileName').textContent = `✅ File loaded: ${name} (${csvData.length} products)`;
}

document.getElementById('previewBtn').addEventListener('click', () => {
    const preview = document.getElementById('preview');
    const table = document.getElementById('previewTable');
    table.innerHTML = '';
    
    if (csvData.length === 0) return;
    
    const headerRow = table.insertRow();
    Object.keys(csvData[0]).forEach(key => {
        const th = document.createElement('th');
        th.textContent = key;
        headerRow.appendChild(th);
    });
    
    csvData.slice(0, 5).forEach(row => {
        const tr = table.insertRow();
        Object.values(row).forEach(val => {
            const td = tr.insertCell();
            td.textContent = val;
        });
    });
    
    preview.style.display = 'block';
});

document.getElementById('startBtn').addEventListener('click', async () => {
    if (csvData.length === 0) {
        alert('Please upload a CSV file first!');
        return;
    }
    
    document.getElementById('fileInfo').style.display = 'none';
    document.getElementById('preview').style.display = 'none';
    document.getElementById('progress').style.display = 'block';
    
    currentIndex = 0;
    await startListing();
});

async function startListing() {
    const settings = await chrome.storage.local.get(['delay', 'retries']);
    const delay = settings.delay || 1000;
    const maxRetries = settings.retries || 3;
    
    for (let i = 0; i < csvData.length; i++) {
        currentIndex = i;
        updateProgress(i, csvData.length);
        
        let success = false;
        for (let retry = 0; retry < maxRetries; retry++) {
            try {
                await chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
                    if (tabs[0]) {
                        chrome.tabs.sendMessage(tabs[0].id, {
                            action: 'fillForm',
                            data: csvData[i],
                            delay: delay
                        });
                    }
                });
                
                addLog(`✅ Product ${i + 1}: "${csvData[i].name}" - Listed`, 'success');
                success = true;
                break;
            } catch (err) {
                addLog(`⏳ Retry ${retry + 1}/${maxRetries} for product ${i + 1}`, 'info');
                await new Promise(r => setTimeout(r, delay));
            }
        }
        
        if (!success) {
            addLog(`❌ Product ${i + 1}: Failed after ${maxRetries} retries`, 'error');
        }
        
        await new Promise(r => setTimeout(r, delay));
    }
    
    addLog(`✨ All products processed!`, 'success');
}

function updateProgress(current, total) {
    const percent = (current / total) * 100;
    document.getElementById('progressFill').style.width = percent + '%';
    document.getElementById('progressText').textContent = `${current}/${total} items`;
}

function addLog(message, type = 'info') {
    const logsDiv = document.getElementById('logs');
    const logItem = document.createElement('div');
    logItem.className = `log-item ${type}`;
    logItem.textContent = `[${new Date().toLocaleTimeString()}] ${message}`;
    logsDiv.appendChild(logItem);
    logsDiv.scrollTop = logsDiv.scrollHeight;
}

document.getElementById('saveSettings').addEventListener('click', () => {
    const delay = document.getElementById('delayInput').value;
    const retries = document.getElementById('retriesInput').value;
    
    chrome.storage.local.set({ delay: parseInt(delay), retries: parseInt(retries) }, () => {
        const msg = document.getElementById('settingMessage');
        msg.textContent = '✅ Settings saved!';
        msg.className = 'success';
        setTimeout(() => msg.className = '', 3000);
    });
});

chrome.storage.local.get(['delay', 'retries'], (settings) => {
    if (settings.delay) document.getElementById('delayInput').value = settings.delay;
    if (settings.retries) document.getElementById('retriesInput').value = settings.retries;
});
