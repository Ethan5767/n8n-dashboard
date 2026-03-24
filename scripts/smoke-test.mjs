import 'dotenv/config';

const base = (process.env.N8N_BASE_URL || '').replace(/\/$/, '');
const key = process.env.N8N_API_KEY;

if (!base || !key) {
  console.error('Missing N8N_BASE_URL or N8N_API_KEY');
  process.exit(1);
}

const res = await fetch(`${base}/api/v1/workflows?limit=1`, {
  headers: { 'X-N8N-API-KEY': key },
});

if (!res.ok) {
  console.error(`Smoke test failed: ${res.status}`);
  process.exit(1);
}

console.log('Smoke test passed. n8n API reachable.');
