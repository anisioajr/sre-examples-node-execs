## 2.1.2 Desafio - Timeout
Ajustar configurações de timeout e corrigir erro de timeout execedido ao invocar o serviço

// INSIRA SUA ANÁLISE OU PARECER ABAIXO

No código aplicado o timeout está configurado com 3000 ms (3 segundos) e na linha 25 temos a simulação do timeout com 5000 ms (5 segundos) como resposta da chamada externa.
Ao alterar a simulação de timeout para 3000 e a simulação de resposta para 2900ms é possível ter um resultado positivo.

    "Resposta da chamada externa"


## 2.1.2 Desafio - Rate Limit
Alterar limite de requisições permitidas para 100 num intervalo de 1 minuto e escrever uma função para simular o erro de Rate Limit.

// INSIRA SUA ANÁLISE OU PARECER ABAIXO

Neste código está na linha 10 a configuração para 5 requisições por minuto. Isso faz com que, caso fizermos 5 chamadas dentro de um minuto, as próximas serão respondidas com  "Você excedeu o limite de requisições, tente novamente mais tarde."

Para isto vamos alterar o código para

    // Middleware de rate limiting (Limite de 5 requisições por minuto)
    const limiter = rateLimit({
        windowMs: 60 * 1000,  // 1 minuto
        max: 100,  // Limite de 100 requisições
        message: 'Você excedeu o limite de requisições, tente novamente mais tarde.',
    });

e reiniciar o serviço.

Desta forma, precisamos realizar mais de 100 chamadas para poder obter o erro

    Você excedeu o limite de requisições, tente novamente mais tarde.

Também foi criado o arquivo testRateLimit.js para realizar a chamada do teste via console


## 2.3.2 Desafio - Bulkhead
Aumentar quantidade de chamadas simultâneas e avaliar o comportamento.

BÔNUS: implementar método que utilizando threads para realizar as chamadas e logar na tela

// INSIRA SUA ANÁLISE OU PARECER ABAIXO

Quando foi aumentada a quantidade de chamadas simultâneas precisou-se realizar muitas chamadas ao mesmo tempo, e com o aumento do tempo de resposta simulado também para ajudar, no browser para evidenciar o retorno de erro.


Via threads:

Foi criado o arquivo *workerBulkhead.js* para a simulação das threads qual tem o retorno das chamadas conforme elas estão sendo executadas e liberadas sem exceder o limite proposto, conseguindo os retornos:

    C:\sre-samples-node>node workerBulkhead.js
    Servidor rodando em http://localhost:8080
    Thread 1: Resposta da chamada externa
    Thread 5: Resposta da chamada externa
    Thread 9: Resposta da chamada externa
    Thread 7: Resposta da chamada externa
    Thread 3: Resposta da chamada externa
    Thread 8: Resposta da chamada externa
    Thread 4: Resposta da chamada externa
    Thread 6: Resposta da chamada externa
    Thread 12: Resposta da chamada externa
    Thread 13: Resposta da chamada externa
    Thread 17: Resposta da chamada externa
    Thread 14: Resposta da chamada externa
    Thread 2: Resposta da chamada externa
    Thread 20: Resposta da chamada externa
    Thread 21: Resposta da chamada externa
    Thread 24: Resposta da chamada externa
    Thread 10: Resposta da chamada externa
    Thread 16: Resposta da chamada externa
    Thread 11: Resposta da chamada externa
    Thread 25: Resposta da chamada externa
    Thread 23: Resposta da chamada externa
    Thread 29: Resposta da chamada externa
    Thread 28: Resposta da chamada externa
    Thread 33: Resposta da chamada externa
    Thread 18: Resposta da chamada externa
    Thread 32: Resposta da chamada externa
    Thread 22: Resposta da chamada externa

## 2.4.1 Desafio - Circuit Breaker
Ajustar o o percentual de falhas para que o circuit breaker obtenha sucesso ao receber as requisições após sua abertura. Observar comportamento do circuito no console.

// INSIRA SUA ANÁLISE OU PARECER ABAIXO

Ao executar inicialmente o código sem alteração obtemos a resposta **Resposta do fallback...**. Depois de algumas tentativas obtemos no console algumas mensagens 

    Requisição rejeitada pelo Circuit Breaker
    Requisição rejeitada pelo Circuit Breaker
    Requisição rejeitada pelo Circuit Breaker
    Circuito meio aberto, testando...
    Requisição rejeitada pelo Circuit Breaker
    Requisição rejeitada pelo Circuit Breaker
    Circuito fechado novamente
    Sucesso registrado pelo Circuit Breaker
    Falha registrada pelo Circuit Breaker
    Sucesso registrado pelo Circuit Breaker
    Sucesso registrado pelo Circuit Breaker
    Sucesso registrado pelo Circuit Breaker
    Sucesso registrado pelo Circuit Breaker
    Sucesso registrado pelo Circuit Breaker
    Sucesso registrado pelo Circuit Breaker
    Sucesso registrado pelo Circuit Breaker
    Falha registrada pelo Circuit Breaker
    Sucesso registrado pelo Circuit Breaker
    Falha registrada pelo Circuit Breaker
    Sucesso registrado pelo Circuit Breaker
    Sucesso registrado pelo Circuit Breaker
    Falha registrada pelo Circuit Breaker
    Sucesso registrado pelo Circuit Breaker
    Sucesso registrado pelo Circuit Breaker





