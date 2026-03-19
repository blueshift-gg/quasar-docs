import Link from 'next/link';

const features = [
  {
    title: 'Zero-Copy Access',
    description:
      'Direct pointer casts from SVM buffer. No deserialization, no heap allocation.',
  },
  {
    title: 'Familiar Macros',
    description:
      '#[program], #[instruction], #[account] — same names, optimized codegen.',
  },
  {
    title: 'Built-in Profiler',
    description:
      'Static CU analysis, flamegraphs, and diff comparisons out of the box.',
  },
  {
    title: 'Stack-Allocated CPI',
    description:
      'Const-generic CpiCall — account and data sizes known at compile time.',
  },
  {
    title: 'SPL Token Support',
    description:
      'Zero-copy Token, Mint, ATA, and Token-2022 interface support.',
  },
  {
    title: 'no_std by Default',
    description:
      'No global allocator required. Panics on accidental heap access.',
  },
];

const benchmarks = [
  { framework: 'Quasar', cu: '2,816 CU', delta: 'baseline' },
  { framework: 'Pinocchio (hand-written)', cu: '2,833 CU', delta: '+17' },
  { framework: 'Anchor', cu: '~5,500 CU', delta: '+2,684' },
];

export default function HomePage() {
  return (
    <main className="min-h-screen bg-black text-white">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/40 via-black to-blue-900/30" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-600/20 via-transparent to-transparent" />
        <div className="relative mx-auto max-w-5xl px-6 py-32 text-center sm:py-40">
          <h1 className="text-5xl font-extrabold tracking-tight sm:text-7xl">
            <span className="bg-gradient-to-r from-purple-400 via-fuchsia-400 to-blue-400 bg-clip-text text-transparent">
              Quasar
            </span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-neutral-300 sm:text-xl">
            Zero-copy, zero-allocation Solana programs with Anchor-level
            developer experience.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/docs/getting-started/installation"
              className="inline-flex h-11 items-center rounded-lg bg-purple-600 px-6 text-sm font-semibold text-white transition hover:bg-purple-500"
            >
              Get Started
            </Link>
            <a
              href="https://github.com/blueshift-gg/quasar"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-11 items-center rounded-lg border border-neutral-700 bg-neutral-900 px-6 text-sm font-semibold text-neutral-200 transition hover:border-neutral-500 hover:bg-neutral-800"
            >
              GitHub
            </a>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="mx-auto max-w-6xl px-6 py-24">
        <h2 className="text-center text-3xl font-bold tracking-tight sm:text-4xl">
          Why Quasar?
        </h2>
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f) => (
            <div
              key={f.title}
              className="rounded-xl border border-neutral-800 bg-neutral-900/60 p-6 transition hover:border-neutral-700"
            >
              <h3 className="text-lg font-semibold text-white">{f.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-neutral-400">
                {f.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Benchmarks */}
      <section className="mx-auto max-w-4xl px-6 pb-32">
        <h2 className="text-center text-3xl font-bold tracking-tight sm:text-4xl">
          CU Comparison
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-center text-neutral-400">
          Transfer SOL instruction — lower is better.
        </p>
        <div className="mt-10 overflow-x-auto rounded-xl border border-neutral-800">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-neutral-800 bg-neutral-900/80 text-neutral-300">
                <th className="px-6 py-3 font-semibold">Framework</th>
                <th className="px-6 py-3 font-semibold">Compute Units</th>
                <th className="px-6 py-3 font-semibold">Delta</th>
              </tr>
            </thead>
            <tbody>
              {benchmarks.map((b, i) => (
                <tr
                  key={b.framework}
                  className={
                    i === 0
                      ? 'bg-purple-900/20 text-white'
                      : 'border-t border-neutral-800 text-neutral-300'
                  }
                >
                  <td className="px-6 py-3 font-medium">{b.framework}</td>
                  <td className="px-6 py-3">{b.cu}</td>
                  <td className="px-6 py-3">{b.delta}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
}
