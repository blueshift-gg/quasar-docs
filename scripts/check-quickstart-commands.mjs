import { readFile } from 'node:fs/promises';

const quickstartFile =
  process.argv[2] ??
  new URL('../content/docs/getting-started/quickstart.mdx', import.meta.url);

// Mirrors verify_starter minimal and verify_quickstart in Quasar's packaged
// release rehearsal. CI substitutes its project name and adds --no-git.
const rehearsedCommands = [
  {
    step: 'init',
    command:
      'quasar init my-program --yes --toolchain solana --test-language rust --rust-framework quasar-svm --template minimal',
  },
  {
    step: 'add',
    command: 'quasar add -i transfer -s vault -e access',
  },
  {
    step: 'lock discriminators',
    command: 'quasar lint --update-lock',
  },
  {
    step: 'build',
    command: 'quasar build',
  },
  {
    step: 'test',
    command: 'quasar test',
  },
  {
    step: 'filter tests',
    command: 'quasar test -f test_init',
  },
  {
    step: 'test features',
    command: 'quasar test --features debug',
  },
];

function extractCommands(source) {
  const bashBlocks = [...source.matchAll(/```bash\s*\n([\s\S]*?)```/g)];

  if (bashBlocks.length === 0) {
    throw new Error('quickstart has no bash code blocks');
  }

  return bashBlocks.flatMap(([, block]) =>
    block
      .split('\n')
      .map((line) => line.trim().replace(/\s+#.*$/, ''))
      .filter((line) => line.startsWith('quasar '))
  );
}

try {
  const source = await readFile(quickstartFile, 'utf8');
  const commands = extractCommands(source);
  let previousIndex = -1;

  for (const { step, command } of rehearsedCommands) {
    const matches = commands.flatMap((candidate, index) =>
      candidate === command ? [index] : []
    );

    if (matches.length !== 1) {
      throw new Error(
        `${step} command must appear exactly once: ${command} (found ${matches.length})`
      );
    }
    if (matches[0] <= previousIndex) {
      throw new Error(`${step} command is out of rehearsal order: ${command}`);
    }

    previousIndex = matches[0];
  }

  const deploymentCommands = commands.filter((command) =>
    command.startsWith('quasar deploy ')
  );
  if (deploymentCommands.length === 0) {
    throw new Error('quickstart must keep at least one deployment example');
  }
  if (
    rehearsedCommands.some(({ command }) => command.startsWith('quasar deploy '))
  ) {
    throw new Error('deployment commands must remain outside the rehearsal');
  }

  console.log(
    `quickstart rehearsal: ${rehearsedCommands.length} commands checked; ${deploymentCommands.length} deployment examples excluded`
  );
} catch (error) {
  console.error(`invalid quickstart rehearsal: ${error.message}`);
  process.exitCode = 1;
}
