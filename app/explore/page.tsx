export default function ExplorePage() {
  return (
    <div className="max-w-2xl mx-auto px-5 py-16 md:py-24">
      <div className="text-center mb-10">
        <span className="badge badge-warning mb-4">Coming Soon</span>
        <h1 className="text-2xl md:text-3xl font-bold mb-3">
          Where Should I Live?
        </h1>
        <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
          We&apos;re building a tool to help young Australians find areas with
          low unemployment, affordable housing, and strong salaries.
        </p>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-10">
        <div className="stat-card text-center">
          <div className="text-xl mb-2">📉</div>
          <div className="text-sm font-medium mb-0.5">Low Unemployment</div>
          <p className="text-xs" style={{ color: 'var(--text-tertiary)' }}>
            Strongest job markets
          </p>
        </div>
        <div className="stat-card text-center">
          <div className="text-xl mb-2">🏡</div>
          <div className="text-sm font-medium mb-0.5">Affordable Housing</div>
          <p className="text-xs" style={{ color: 'var(--text-tertiary)' }}>
            Houses within reach
          </p>
        </div>
        <div className="stat-card text-center">
          <div className="text-xl mb-2">💰</div>
          <div className="text-sm font-medium mb-0.5">High Salaries</div>
          <p className="text-xs" style={{ color: 'var(--text-tertiary)' }}>
            Best earning potential
          </p>
        </div>
      </div>

      {/* <div className="card p-6 text-center">
                <h3 className="font-semibold text-sm mb-1">Get notified when it launches</h3>
                <p className="text-xs mb-4" style={{ color: 'var(--text-secondary)' }}>
                    Be the first to know when the explorer tool goes live.
                </p>
                <div className="flex gap-2 max-w-sm mx-auto">
                    <input type="email" className="input-field flex-1 text-sm" placeholder="your@email.com" disabled />
                    <button className="btn-primary text-sm" disabled>Notify Me</button>
                </div>
            </div> */}

      <p className="text-center text-sm" style={{ color: 'var(--text-secondary)' }}>
        Work in progress
      </p>
    </div>
  );
}
