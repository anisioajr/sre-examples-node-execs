2.1.2 Desafio - Timeout
Ajustar configurações de timeout e corrigir erro de timeout execedido ao invocar o serviço

// INSIRA SUA ANÁLISE OU PARECER ABAIXO

No código aplicado o timeout está configurado com 3000 ms (3 segundos) e na linha 25 temos a simulação do timeout com 5000 ms (5 segundos) como resposta da chamada externa.
Ao alterar a simulação de timeout para 3000 e a simulação de resposta para 2900ms é possível ter um resultado positivo.

    "Resposta da chamada externa"


2.1.2 Desafio - Rate Limit
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

