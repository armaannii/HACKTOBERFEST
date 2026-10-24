import fs from 'fs';
const content = fs.readFileSync('scratch/raw.txt', 'utf8');
const text = content.trim();
const firstBrace = text.indexOf('{');
const lastBrace = text.lastIndexOf('}');
const jsonSubstring = text.substring(firstBrace, lastBrace + 1);

try {
  JSON.parse(jsonSubstring);
  console.log('Original parsed fine!');
} catch (e) {
  console.log('Original error:', e.message);
  const match = e.message.match(/position (\d+)/);
  if (match) {
    const pos = parseInt(match[1]);
    console.log('Around original error pos:\n' + jsonSubstring.slice(pos - 60, pos + 60));
  }
}
