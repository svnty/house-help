import Link from "next/link";
import { getMarkets, formatCurrency } from "@/lib/calculations";

export default function Home() {
  const markets = getMarkets();

  return (
    <div className="max-w-5xl mx-auto px-5">
      {/* Hero */}
      <div className="py-16 md:py-24 max-w-2xl">
        <h1 className="text-3xl md:text-4xl font-bold leading-snug mb-4" style={{ color: 'var(--foreground)' }}>
          Housing affordability has changed.
          <br />
          <span style={{ color: 'var(--accent)' }}>See by how much.</span>
        </h1>
        <p className="text-base leading-relaxed mb-8" style={{ color: 'var(--text-secondary)' }}>
          Enter what you paid for your home, your salary, and how long it took to pay off.
          We&apos;ll show you exactly what that same scenario looks like for a young person buying today.
        </p>
        <Link href="/calculator" className="btn-primary">
          Open the calculator
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </Link>
      </div>

      <div className="divider" />

      {/* Features */}
      <div className="py-12 grid md:grid-cols-2 gap-5">
        {/* Calculator */}
        <Link href="/calculator" className="card p-6 block group">
          <div className="flex items-start gap-4">
            <div
              className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0 text-lg"
              style={{ background: 'var(--accent-light)' }}
            >
              🏦
            </div>
            <div>
              <h2 className="font-semibold text-base mb-1">Affordability Calculator</h2>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                Compare what buying a house cost you versus what it costs a young person today.
              </p>
              <span
                className="inline-flex items-center gap-1 text-sm font-medium mt-3 group-hover:gap-2 transition-all duration-150 group-hover:text-emerald-500!"
                style={{ color: 'var(--accent)' }}
              >
                Get started →
              </span>
            </div>
          </div>
        </Link>

        {/* Explore */}
        <div className="card p-6 cursor-not-allowed" style={{ opacity: 0.6 }}>
          <div className="flex items-start gap-4">
            <div
              className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0 text-lg"
              style={{ background: 'var(--surface)' }}
            >
              📍
            </div>
            <div>
              <h2 className="font-semibold text-base mb-1">Where Should I Live?</h2>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                Find areas with low unemployment, affordable housing, and strong
                salaries.
              </p>
              <span className="badge badge-warning mt-3">Coming Soon</span>
            </div>
          </div>
        </div>
      </div>

      <div className="divider" />

      {/* Market snapshots */}
      <div className="py-12">
        <h3 className="text-xs font-semibold uppercase tracking-wider mb-5" style={{ color: 'var(--text-tertiary)' }}>
          2026 Market Snapshot
        </h3>
        <div className="card overflow-hidden">
          {/* Table header */}
          <div className="grid grid-cols-[1fr_auto_auto_auto] md:grid-cols-[1fr_120px_120px_80px] gap-x-4 md:gap-x-6 px-5 py-3 text-xs font-semibold uppercase tracking-wider"
            style={{ borderBottom: '2px solid var(--border)', color: 'var(--text-tertiary)' }}
          >
            <div>Market</div>
            <div className="text-right">Median Price</div>
            <div className="text-right">Median Salary</div>
            <div className="text-right">Ratio</div>
          </div>
          {/* Rows */}
          {markets.map((market, i) => {
            const priceToIncome = (market.medianHousePrice / market.medianSalary).toFixed(1);
            const shortPrice = formatCurrency(market.medianHousePrice, market)
              .replace(',000,000', 'M')
              .replace(',000', 'K');
            const shortSalary = formatCurrency(market.medianSalary, market)
              .replace(',000', 'K');

            return (
              <div
                key={market.id}
                className="grid grid-cols-[1fr_auto_auto_auto] md:grid-cols-[1fr_120px_120px_80px] gap-x-4 md:gap-x-6 items-center px-5 py-3.5"
                style={{
                  borderBottom: i < markets.length - 1 ? '1px solid var(--border-light)' : 'none',
                  opacity: market.enabled ? 1 : 0.5,
                }}
              >
                <div className="flex items-center gap-2.5 text-sm font-medium">
                  <span>{market.flag}</span>
                  <span>{market.name}</span>
                  <span className="text-xs font-normal" style={{ color: 'var(--text-tertiary)' }}>{market.currency}</span>
                </div>
                <div className="text-sm font-semibold text-right">{shortPrice}</div>
                <div className="text-sm text-right" style={{ color: 'var(--text-secondary)' }}>{shortSalary}</div>
                <div className="text-sm font-bold text-right" style={{ color: 'var(--danger)' }}>{priceToIncome}×</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
