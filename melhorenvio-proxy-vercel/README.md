# Proxy Melhor Envio para Vercel

Proxy para contornar restrições de saída (cURL/DNS) em hospedagens compartilhadas, permitindo que seu backend PHP acesse a API do Melhor Envio via Vercel.

## Como usar

1. Faça deploy deste diretório no Vercel (https://vercel.com/import/git).
2. O endpoint será: `https://<seu-projeto>.vercel.app/api`
3. No seu PHP, altere a URL do proxy para o endpoint acima.

## Exemplo de chamada (PHP)

```php
$proxy_url = 'https://<seu-projeto>.vercel.app/api';
$proxy_payload = [
    'endpoint' => 'https://api.melhorenvio.com.br/oauth/token',
    'method' => 'POST',
    'headers' => [
        'Accept' => 'application/json',
        'Content-Type' => 'application/x-www-form-urlencoded'
    ],
    'body' => http_build_query([
        'grant_type' => 'client_credentials',
        'client_id' => 'SEU_CLIENT_ID',
        'client_secret' => 'SEU_CLIENT_SECRET'
    ])
];
// ...
```

## Observações
- O Vercel pode dormir em planos gratuitos, mas geralmente responde rápido.
- Não exponha segredos sensíveis no frontend.
