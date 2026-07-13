import { readFile } from 'node:fs/promises';

const metadataFile = process.argv[2] ?? new URL('../public/release.json', import.meta.url);

try {
  const metadata = JSON.parse(await readFile(metadataFile, 'utf8'));

  if (metadata.quasarVersion !== '0.1.0') {
    throw new Error('quasarVersion must be 0.1.0');
  }

  if (!/^[0-9a-f]{40}$/.test(metadata.quasarRevision)) {
    throw new Error('quasarRevision must be a full lowercase Git commit SHA');
  }

  console.log(
    `release metadata: Quasar ${metadata.quasarVersion} at ${metadata.quasarRevision}`
  );
} catch (error) {
  console.error(`invalid release metadata: ${error.message}`);
  process.exitCode = 1;
}
