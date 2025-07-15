import fetch from 'node-fetch';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método não permitido' });
  }

  let body;
  try {
    body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
  } catch (e) {
    return res.status(400).json({ error: 'JSON inválido', details: e.message });
  }

  const { endpoint, method, headers, body: payload } = body;
  if (!endpoint || !method) {
    return res.status(400).json({ error: 'endpoint e method são obrigatórios' });
  }

  try {
    const fetchOptions = {
      method,
      headers,
    };
    if (payload) {
      fetchOptions.body =
        typeof payload === 'object' && headers['Content-Type'] === 'application/json'
          ? JSON.stringify(payload)
          : payload;
    }
    const response = await fetch(endpoint, fetchOptions);
    const contentType = response.headers.get('content-type') || '';
    let data;
    if (contentType.includes('application/json')) {
      data = await response.json();
    } else {
      data = await response.text();
    }
    res.status(response.status).json(data);
  } catch (err) {
    res.status(500).json({ error: 'Erro no proxy', details: err.message });
  }
}
