const express = require('express');
const { bulkhead } = require('cockatiel');
const { Worker, isMainThread, parentPort } = require('worker_threads');

const app = express();
const port = 8080;

// Configurando bulkhead com cockatiel (Máximo de 2 requisições simultâneas)
const bulkheadPolicy = bulkhead(2);

// Função simulando chamada externa
async function externalService() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve('Resposta da chamada externa');
        }, 2000);  // Simula uma chamada que demora 2 segundos
    });
}

// Função para criar e executar múltiplas chamadas usando threads
function simulateRequestsInThreads(numThreads) {
    for (let i = 0; i < numThreads; i++) {
        const worker = new Worker(__filename);
        worker.on('message', (message) => {
            console.log(`Thread ${i + 1}: ${message}`);
        });
        worker.on('error', (err) => {
            console.error(`Thread ${i + 1} erro: ${err.message}`);
        });
        worker.on('exit', (code) => {
            if (code !== 0)
                console.error(`Thread ${i + 1} terminou com código de erro: ${code}`);
        });
    }
}

// Código que será executado em cada thread
if (!isMainThread) {
    bulkheadPolicy.execute(() => externalService())
        .then((result) => {
            parentPort.postMessage(result);
        })
        .catch((error) => {
            parentPort.postMessage(`Erro: ${error.message}`);
        });
} else {
    // Rota que simula múltiplas chamadas usando threads
    app.get('/api/bulkhead', (req, res) => {
        const numCalls = 40; // Define o número de chamadas a serem simuladas
        simulateRequestsInThreads(numCalls);
        res.send(`Simulação de ${numCalls} chamadas iniciada! Veja o log no console.`);
    });

    // Iniciando o servidor
    app.listen(port, () => {
        console.log(`Servidor rodando em http://localhost:${port}`);
    });
}