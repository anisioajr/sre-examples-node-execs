const axios = require('axios');

async function simulateRequests() {
    const url = 'http://localhost:8080/api/ratelimit';

    for (let i = 1; i <= 101; i++) {
        try {
            const response = await axios.get(url);
            console.log(`Requisição ${i}:`, response.data);
        } catch (error) {
            if (error.response) {
                console.log(`Requisição ${i}:`, error.response.data);
            } else {
                console.log(`Requisição ${i}: Erro`, error.message);
            }
        }
    }
}

simulateRequests();
