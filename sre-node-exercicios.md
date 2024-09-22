2.1.2 Desafio - Timeout
Ajustar configurações de timeout e corrigir erro de timeout execedido ao invocar o serviço

// INSIRA SUA ANÁLISE OU PARECER ABAIXO

No código aplicado o timeout está configurado com 3000 ms (3 segundos) e na linha 25 temos a simulação do timeout com 5000 ms (5 segundos) como resposta da chamada externa.
Ao alterar a simulação de timeout para 3000 e a simulação de resposta para 2900ms é possível ter um resultado positivo.

    "Resposta da chamada externa"


