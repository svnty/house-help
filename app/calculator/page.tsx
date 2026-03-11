'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import {
  calculateBoomerMoment,
  calculateMonthlyRepayment,
  formatCurrency as rawFormatCurrency,
  formatPercent,
  getMarkets,
  getMarket,
  getDefaultMarket,
  type BoomerInput,
  type CalculationResult,
  type MarketId,
  type MarketData,
} from '@/lib/calculations';

type Phase = 'input' | 'loading' | 'results';

function AnimatedNumber({
  value,
  prefix = '',
  suffix = '',
  duration = 1500,
  decimals = 0,
}: {
  value: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
  decimals?: number;
}) {
  const [display, setDisplay] = useState(0);
  const startTime = useRef<number | null>(null);
  const rafId = useRef<number | null>(null);

  useEffect(() => {
    startTime.current = null;
    const animate = (timestamp: number) => {
      if (!startTime.current) startTime.current = timestamp;
      const progress = Math.min((timestamp - startTime.current) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(eased * value);
      if (progress < 1) {
        rafId.current = requestAnimationFrame(animate);
      }
    };
    rafId.current = requestAnimationFrame(animate);
    return () => {
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, [value, duration]);

  const formatted = decimals > 0 ? display.toFixed(decimals) : Math.round(display).toLocaleString();
  return <span>{prefix}{formatted}{suffix}</span>;
}

function LoadingScreen() {
  const [progress, setProgress] = useState(0);
  const messages = [
    'Looking up current interest rates...',
    'Comparing salary ratios...',
    'Running mortgage calculations...',
    'Preparing your results...',
  ];
  const [msgIndex, setMsgIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => setProgress((p) => Math.min(p + 1.5, 100)), 45);
    const msgInterval = setInterval(() => setMsgIndex((i) => (i + 1) % messages.length), 750);
    return () => { clearInterval(interval); clearInterval(msgInterval); };
  }, [messages.length]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center" style={{ background: '#fff' }}>
      <div className="text-center px-6 max-w-sm">
        <div className="spinner mx-auto mb-6" style={{ width: 32, height: 32 }} />
        <h2 className="text-lg font-semibold mb-2">Calculating in today&apos;s terms</h2>
        <p className="text-sm mb-6" style={{ color: 'var(--text-secondary)' }}>
          {messages[msgIndex]}
        </p>
        <div className="progress-bar">
          <div className="progress-fill" style={{ width: `${progress}%` }} />
        </div>
      </div>
    </div>
  );
}

function StatRow({ label, thenValue, nowValue, highlight = false }: {
  label: string;
  thenValue: string;
  nowValue: string;
  highlight?: boolean;
}) {
  return (
    <div className="grid grid-cols-3 gap-4 py-3" style={{ borderBottom: '1px solid var(--border-light)' }}>
      <div className="text-sm" style={{ color: 'var(--text-secondary)' }}>{label}</div>
      <div className="text-sm font-medium text-right">{thenValue}</div>
      <div className={`text-sm font-semibold text-right`} style={{ color: highlight ? 'var(--danger)' : 'var(--foreground)' }}>
        {nowValue}
      </div>
    </div>
  );
}

function AffordabilityScreen({
  result,
  input,
  onReset,
}: {
  result: CalculationResult;
  input: BoomerInput;
  onReset: () => void;
}) {
  const market = result.market;
  const formatCurrency = (amount: number) => rawFormatCurrency(amount, market);
  const monthlyRepayment = result.boomerMonthlyRepayment;
  const monthlyIncome = input.annualSalary / 12;
  const repaymentPercent = (monthlyRepayment / monthlyIncome) * 100;
  const isStressed = repaymentPercent > 30;
  // Salary needed to keep mortgage at 30% of income
  const salaryFor30Percent = Math.round((monthlyRepayment / 0.30) * 12);
  // Calculate actual median repayment % from raw median values (not scaled)
  const medianMonthlyRepayment = calculateMonthlyRepayment(
    result.currentMedianHousePrice, result.currentInterestRate, market.defaultLoanTermYears
  );
  const medianRepaymentPercent = (medianMonthlyRepayment / (result.currentMedianSalary / 12)) * 100;

  return (
    <div className="max-w-2xl mx-auto px-5 py-10 md:py-16">
      {/* Headline */}
      <div className="mb-8 fade-in">
        <span className={`badge ${isStressed ? 'badge-danger' : 'badge-success'} mb-4`}>
          Mortgage Breakdown
        </span>
        <h1 className="text-2xl md:text-3xl font-bold leading-snug mb-2">
          Your mortgage takes{' '}
          <span style={{ color: isStressed ? 'var(--danger)' : 'var(--accent)', display: 'inline-block', fontVariantNumeric: 'tabular-nums', minWidth: '4.5ch' }}>
            <AnimatedNumber value={repaymentPercent} decimals={1} suffix="%" />
          </span>
          {' '}of your income{repaymentPercent > 100 ? <>.<span className='text-red-800 font-extrabold'>This is impossible.</span></> : ''}
        </h1>
        <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
          {isStressed
            ? 'Financial advisors generally recommend keeping mortgage repayments below 30% of gross income.'
            : 'This is within the commonly recommended 30% threshold.'}
        </p>
      </div>

      {/* Key stats */}
      <div className="card p-6 mb-6 fade-in fade-in-d1">
        <div className="space-y-0">
          <div className="grid grid-cols-2 gap-4 py-3" style={{ borderBottom: '1px solid var(--border-light)' }}>
            <div className="text-sm" style={{ color: 'var(--text-secondary)' }}>House price</div>
            <div className="text-sm font-semibold text-right">{formatCurrency(input.housePrice)}</div>
          </div>
          <div className="grid grid-cols-2 gap-4 py-3" style={{ borderBottom: '1px solid var(--border-light)' }}>
            <div className="text-sm" style={{ color: 'var(--text-secondary)' }}>Your salary</div>
            <div className="text-sm font-semibold text-right">{formatCurrency(input.annualSalary)}/yr</div>
          </div>
          <div className="grid grid-cols-2 gap-4 py-3" style={{ borderBottom: '1px solid var(--border-light)' }}>
            <div className="text-sm" style={{ color: 'var(--text-secondary)' }}>Interest rate ({input.yearPurchased})</div>
            <div className="text-sm font-semibold text-right">{(result.boomerInterestRate * 100).toFixed(1)}%</div>
          </div>
          <div className="grid grid-cols-2 gap-4 py-3" style={{ borderBottom: '1px solid var(--border-light)' }}>
            <div className="text-sm" style={{ color: 'var(--text-secondary)' }}>Loan term</div>
            <div className="text-sm font-semibold text-right">{input.yearsToPayOff} years</div>
          </div>
          <div className="grid grid-cols-2 gap-4 py-3" style={{ borderBottom: '1px solid var(--border-light)' }}>
            <div className="text-sm" style={{ color: 'var(--text-secondary)' }}>Monthly repayment</div>
            <div className="text-sm font-bold text-right">{formatCurrency(Math.round(monthlyRepayment))}</div>
          </div>
          <div className="grid grid-cols-2 gap-4 py-3" style={{ borderBottom: '1px solid var(--border-light)' }}>
            <div className="text-sm" style={{ color: 'var(--text-secondary)' }}>Price-to-income ratio</div>
            <div className="text-sm font-bold text-right" style={{ color: 'var(--danger)' }}>
              {result.boomerPriceToIncomeRatio.toFixed(1)}×
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 py-3">
            <div className="text-sm font-medium" style={{ color: 'var(--foreground)' }}>Repayment % of income</div>
            <div className="text-sm font-bold text-right" style={{ color: isStressed ? 'var(--danger)' : 'var(--accent)' }}>
              {repaymentPercent.toFixed(1)}%
            </div>
          </div>
        </div>
      </div>

      {/* 30% threshold callout */}
      <div
        className="rounded-lg p-4 mb-6 fade-in fade-in-d2"
        style={{
          background: isStressed ? 'var(--danger-light)' : 'var(--accent-light)',
          border: isStressed ? '1px solid #fecaca' : '1px solid var(--accent-border)',
        }}
      >
        <div className="flex gap-3">
          <span className="text-base mt-0.5 shrink-0">💰</span>
          <div className="text-sm leading-relaxed" style={{ color: isStressed ? '#991b1b' : '#065f46' }}>
            <p className="font-medium mb-1">
              {isStressed ? 'Mortgage stress' : 'Within recommended range'}
            </p>
            {isStressed ? (
              <p>
                To keep repayments at 30% of income on this mortgage, you would need to earn{' '}
                <strong style={{ color: isStressed ? '#7f1d1d' : '#064e3b' }}>
                  {formatCurrency(salaryFor30Percent)}/year
                </strong>.
                A typical salary in {market.name} is {formatCurrency(result.currentMedianSalary)}.
              </p>
            ) : (
              <p>
                Your repayments are {repaymentPercent.toFixed(1)}% of your gross income,
                which is below the 30% threshold generally recommended by financial advisors.
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Median comparison */}
      <div
        className="rounded-lg p-4 mb-6 fade-in fade-in-d2"
        style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}
      >
        <div className="flex gap-3">
          <span className="text-base mt-0.5 shrink-0">📊</span>
          <div className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
            <p className="font-medium mb-1" style={{ color: 'var(--foreground)' }}>
              How this compares to the national median
            </p>
            <p>
              The current median house price in {market.name} is{' '}
              <strong style={{ color: 'var(--foreground)' }}>{formatCurrency(result.currentMedianHousePrice)}</strong>{' '}
              and the median salary is{' '}
              <strong style={{ color: 'var(--foreground)' }}>{formatCurrency(result.currentMedianSalary)}</strong>.{' '}
              Someone earning the median salary paying off {formatCurrency(result.currentMedianHousePrice)} over{' '}
              {market.defaultLoanTermYears} years at {(result.currentInterestRate * 100).toFixed(1)}% would spend{' '}
              <strong style={{ color: 'var(--foreground)' }}>
                {medianRepaymentPercent.toFixed(1)}%
              </strong>{' '}
              of their income on repayments.
            </p>
          </div>
        </div>
      </div>

      {/* Sources */}
      <details className="card mb-8 fade-in fade-in-d3">
        <summary className="px-5 py-3 text-sm font-medium cursor-pointer" style={{ color: 'var(--text-secondary)' }}>
          Sources &amp; methodology
        </summary>
        <div className="px-5 pb-4 text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
          <p className="text-xs" style={{ color: 'var(--text-tertiary)' }}>
            Sources ({market.name}):
          </p>
          <p className="text-xs ml-3" style={{ color: 'var(--text-tertiary)' }}>
            Mortgage rate — {market.rateSource}.
          </p>
          <p className="text-xs ml-3" style={{ color: 'var(--text-tertiary)' }}>
            Median house price — {market.housePriceSource}.
          </p>
          <p className="text-xs ml-3" style={{ color: 'var(--text-tertiary)' }}>
            Median salary — {market.salarySource}.
          </p>
          <p className="text-xs italic mt-1" style={{ color: 'var(--text-tertiary)' }}>
            NOTE: Simplified model; does not account for deposit, LMI, or stamp duty.
          </p>
        </div>
      </details>

      {/* Reset */}
      <button onClick={onReset} className="bg-neutral-100! hover:bg-neutral-200! btn-secondary">
        ← Try different values
      </button>
    </div>
  );
}

function ResultsScreen({
  result,
  input,
  onReset,
}: {
  result: CalculationResult;
  input: BoomerInput;
  onReset: () => void;
}) {
  const isImpossible = result.yearsToPayOffToday >= 999;
  const isEasierToday = !isImpossible && result.yearsToPayOffToday < input.yearsToPayOff;
  const multiplier = isImpossible ? '∞' : (result.yearsToPayOffToday / input.yearsToPayOff).toFixed(1);
  const market = result.market;
  const formatCurrency = (amount: number) => rawFormatCurrency(amount, market);
  const salaryGap = result.requiredSalary - result.currentMedianSalary;

  return (
    <div className="max-w-2xl mx-auto px-5 py-10">
      {/* Headline */}
      <div className="mb-8 fade-in">
        <span className={`badge ${isEasierToday ? 'badge-success' : 'badge-danger'} mb-4`}>
          {isEasierToday ? 'Surprisingly Affordable' : 'Reality Check'}
        </span>
        <h1 className="text-2xl md:text-3xl font-bold leading-snug mb-2">
          {isImpossible ? (
            <>A young person today <span className='font-extrabold' style={{ color: 'var(--danger)' }}>could never pay this off</span></>
          ) : isEasierToday ? (
            <>A young person could pay this off in{' '}
              <span style={{ color: 'var(--accent)' }}>
                <AnimatedNumber value={result.yearsToPayOffToday} decimals={1} /> years
              </span>
            </>
          ) : (
            <>It would take a young person{' '}
              <span style={{ color: 'var(--danger)' }}>
                <AnimatedNumber value={result.yearsToPayOffToday} decimals={1} /> years
              </span>
            </>
          )}
        </h1>
        <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
          {isImpossible
            ? 'Their mortgage repayments wouldn\'t even cover the interest.'
            : isEasierToday
              ? `You paid yours off in ${input.yearsToPayOff} years. Today, an equivalent home could be paid off faster.`
              : `You paid yours off in ${input.yearsToPayOff} years. That's ${multiplier}× longer today.`}
        </p>
      </div>

      {/* Comparison table */}
      <div className="card p-6 mb-6 fade-in fade-in-d1">
        {/* Header */}
        <div className="grid grid-cols-3 gap-4 pb-3 mb-1" style={{ borderBottom: '2px solid var(--border)' }}>
          <div className="text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--text-tertiary)' }} />
          <div className="text-xs font-semibold uppercase tracking-wider text-right" style={{ color: 'var(--accent)' }}>
            Your Era
          </div>
          <div className="text-xs font-semibold uppercase tracking-wider text-right" style={{ color: 'var(--danger)' }}>
            Today
          </div>
        </div>

        <StatRow
          label="House price"
          thenValue={formatCurrency(input.housePrice)}
          nowValue={formatCurrency(result.scaledTodayHousePrice)}
        />
        <StatRow
          label="Annual salary"
          thenValue={formatCurrency(input.annualSalary)}
          nowValue={formatCurrency(result.currentMedianSalary)}
        />
        <StatRow
          label="Interest rate"
          thenValue={`${(result.boomerInterestRate * 100).toFixed(1)}%`}
          nowValue={`${(result.currentInterestRate * 100).toFixed(1)}%`}
        />
        <StatRow
          label="Price-to-income ratio"
          thenValue={`${result.boomerPriceToIncomeRatio.toFixed(1)}×`}
          nowValue={`${result.todayPriceToIncomeRatio.toFixed(1)}×`}
          highlight
        />
        <StatRow
          label="Monthly repayment"
          thenValue={formatCurrency(Math.round(result.boomerMonthlyRepayment))}
          nowValue={formatCurrency(Math.round(result.todayMonthlyRepayment))}
          highlight
        />
        <StatRow
          label="Repayment % of income"
          thenValue={formatPercent(result.boomerRepaymentToIncomePercent)}
          nowValue={formatPercent(result.todayRepaymentToIncomePercent)}
          highlight
        />
        <div className="grid grid-cols-3 gap-4 py-3">
          <div className="text-sm font-medium" style={{ color: 'var(--foreground)' }}>Years to pay off</div>
          <div className="text-sm font-semibold text-right" style={{ color: 'var(--accent)' }}>
            {input.yearsToPayOff} years
          </div>
          <div className="text-sm font-bold text-right" style={{ color: 'var(--danger)' }}>
            {isImpossible ? '∞' : `${result.yearsToPayOffToday} years`}
          </div>
        </div>
      </div>

      {/* Median price explanation */}
      <div
        className="rounded-lg p-4 mb-6 fade-in fade-in-d1"
        style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}
      >
        <div className="flex gap-3">
          <span className="text-base mt-0.5 shrink-0">ℹ️</span>
          <div className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
            <p className="font-medium mb-1" style={{ color: 'var(--foreground)' }}>
              How we scaled the house price
            </p>
            <p>
              In {input.yearPurchased}, the national median house price was{' '}
              <strong style={{ color: 'var(--foreground)' }}>{formatCurrency(result.historicalMedianAtPurchase)}</strong>.{' '}
              Your {formatCurrency(input.housePrice)} purchase was{' '}
              <strong style={{ color: 'var(--foreground)' }}>
                {(input.housePrice / result.historicalMedianAtPurchase).toFixed(1)}×
              </strong>{' '}
              the national median. The equivalent today — the same position in the market — is{' '}
              <strong style={{ color: 'var(--foreground)' }}>{formatCurrency(result.scaledTodayHousePrice)}</strong>{' '}
              ({(input.housePrice / result.historicalMedianAtPurchase).toFixed(1)}× today&apos;s {formatCurrency(result.currentMedianHousePrice)} median).
            </p>
          </div>
        </div>
      </div>

      {/* Required salary callout */}
      <div
        className="rounded-lg p-4 mb-6 fade-in fade-in-d2"
        style={{
          background: salaryGap > 0 ? 'var(--danger-light)' : 'var(--accent-light)',
          border: salaryGap > 0 ? '1px solid #fecaca' : '1px solid var(--accent-border)',
        }}
      >
        <div className="flex gap-3">
          <span className="text-base mt-0.5 shrink-0">💰</span>
          <div className="text-sm leading-relaxed" style={{ color: salaryGap > 0 ? '#991b1b' : '#065f46' }}>
            <p className="font-medium mb-1">
              {salaryGap > 0 ? 'The salary a young person would actually need' : 'What a young person would need to earn'}
            </p>
            <p>
              You spent {formatPercent(result.boomerRepaymentToIncomePercent)} of your income on
              repayments and paid off your house in {input.yearsToPayOff} years.
              For a young person to do the exact same thing today — pay off an equivalent house in{' '}
              {input.yearsToPayOff} years, spending the same {formatPercent(result.boomerRepaymentToIncomePercent)} of
              their income — they would need to earn{' '}
              <strong className="text-base" style={{ color: salaryGap > 0 ? '#7f1d1d' : '#064e3b' }}>
                {formatCurrency(result.requiredSalary)}/year
              </strong>.
            </p>
            <p className="mt-2">
              The current median salary is {formatCurrency(result.currentMedianSalary)}.{' '}
              {salaryGap > 0
                ? <>That&apos;s a gap of <strong>{formatCurrency(salaryGap)}</strong>.</>
                : <>That&apos;s actually <strong>{formatCurrency(Math.abs(salaryGap))}</strong> below the median.</>
              }
            </p>
          </div>
        </div>
      </div>

      {/* Key takeaway */}
      <div
        className="rounded-lg p-4 mb-6 fade-in fade-in-d2"
        style={{
          background: isEasierToday ? 'var(--accent-light)' : 'var(--warning-light)',
          border: isEasierToday ? '1px solid var(--accent-border)' : '1px solid #fde68a',
        }}
      >
        <div className="flex gap-3">
          <span className="text-base mt-0.5 shrink-0">{isEasierToday ? '✅' : '⚠️'}</span>
          <div className="text-sm leading-relaxed" style={{ color: isEasierToday ? '#065f46' : '#92400e' }}>
            <p className="font-medium mb-1">The key takeaway</p>
            <p>
              {isImpossible
                ? 'If a young person dedicates the same percentage of today\'s median salary as you did, they can\'t even cover the interest on a home similar to yours.'
                : isEasierToday
                  ? `A young person dedicating the same percentage of today's median salary could pay this off in ${result.yearsToPayOffToday.toFixed(1)} years.`
                  : `If a young person dedicates the same percentage of today's median salary as you did, they would need ${result.yearsToPayOffToday} years to pay it off - at ${(result.currentInterestRate * 100).toFixed(0)}% interest.`
              }
            </p>
          </div>
        </div>
      </div>

      {/* Want more precise calculations? */}
      <div className="card p-6 mb-6 fade-in fade-in-d3">
        <h3 className="font-semibold text-base mb-1">Want more precise calculations?</h3>
        <p className="text-sm mb-4" style={{ color: 'var(--text-secondary)' }}>
          The numbers above use national medians. Enter your suburb to see exactly
          what it costs in your area — using real local house prices and salary data.
        </p>
        <div className="flex gap-2">
          <input
            type="text"
            className="input-field flex-1 text-sm"
            placeholder="Enter your suburb or postcode"
            disabled
          />
          <button className="btn-primary text-sm" disabled>
            Look up
          </button>
        </div>
        <p className="text-xs mt-3" style={{ color: 'var(--text-tertiary)' }}>
          Suburb-level data is coming soon. This will use real median prices for your specific area.
        </p>
      </div>

      {/* Methodology */}
      <details className="card mb-8 fade-in fade-in-d3">
        <summary className="px-5 py-3 text-sm font-medium cursor-pointer" style={{ color: 'var(--text-secondary)' }}>
          How we calculated this
        </summary>
        <div className="px-5 pb-4 text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
          <p className="mb-2">
            We take your repayment-to-income ratio and apply it to today&apos;s median salary
            ({formatCurrency(result.currentMedianSalary)}/yr) to determine the monthly payment
            a young person could afford: {formatCurrency(Math.round((result.boomerRepaymentToIncomePercent / 100) * (result.currentMedianSalary / 12)))}/month.
          </p>
          <p className="mb-2">
            We then calculate how long it would take to pay off the median house price
            ({formatCurrency(result.scaledTodayHousePrice)}) at the current average mortgage rate
            ({(result.currentInterestRate * 100).toFixed(1)}%) with that payment.
          </p>
          <p className="mb-2">
            The required salary is calculated by finding what annual income would allow the
            same {formatPercent(result.boomerRepaymentToIncomePercent)} repayment-to-income ratio
            to cover the mortgage on a {formatCurrency(result.scaledTodayHousePrice)} home
            at {(result.currentInterestRate * 100).toFixed(1)}% over {input.yearsToPayOff} years.
          </p>
          <p className="text-xs" style={{ color: 'var(--text-tertiary)' }}>
            Sources ({market.name}):
          </p>
          <p className="text-xs ml-3" style={{ color: 'var(--text-tertiary)' }}>
            Median house price — {market.housePriceSource}.
          </p>
          <p className="text-xs ml-3" style={{ color: 'var(--text-tertiary)' }}>
            Median salary — {market.salarySource}.
          </p>
          <p className="text-xs ml-3" style={{ color: 'var(--text-tertiary)' }}>
            Mortgage rate — {market.rateSource}.
          </p>
          <p className="text-xs italic mt-1" style={{ color: 'var(--text-tertiary)' }}>
            NOTE: Simplified model; does not account for deposit, LMI, or stamp duty.
          </p>
        </div>
      </details>

      {/* Reset */}
      <button onClick={onReset} className="bg-neutral-100! hover:bg-neutral-200! btn-secondary">
        ← Try different values
      </button>
    </div>
  );
}

export default function CalculatorPage() {
  const [phase, setPhase] = useState<Phase>('input');
  const [result, setResult] = useState<CalculationResult | null>(null);
  const [selectedMarket, setSelectedMarket] = useState<MarketId>('AU');
  const markets = getMarkets();
  const currentMarket = getMarket(selectedMarket);
  const [input, setInput] = useState<BoomerInput>({
    housePrice: 0, annualSalary: 0, yearsToPayOff: 0, yearPurchased: 1990, market: 'AU',
  });
  const [formValues, setFormValues] = useState({
    housePrice: '', annualSalary: '', yearsToPayOff: '', yearPurchased: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = useCallback(() => {
    const newErrors: Record<string, string> = {};
    const hp = parseFloat(formValues.housePrice.replace(/,/g, ''));
    const sal = parseFloat(formValues.annualSalary.replace(/,/g, ''));
    const yrs = parseFloat(formValues.yearsToPayOff);
    const yr = parseFloat(formValues.yearPurchased);
    if (!hp || hp <= 0) newErrors.housePrice = 'Enter your house price';
    if (!sal || sal <= 0) newErrors.annualSalary = 'Enter your average salary';
    if (!yrs || yrs <= 0 || yrs > 50) newErrors.yearsToPayOff = 'Enter a valid number (1–50)';
    if (!yr || yr < 1960 || yr > 2025) newErrors.yearPurchased = 'Enter a year between 1960 and 2025';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [formValues]);

  const handleCalculate = useCallback(() => {
    if (!validate()) return;
    const boomerInput: BoomerInput = {
      housePrice: parseFloat(formValues.housePrice.replace(/,/g, '')),
      annualSalary: parseFloat(formValues.annualSalary.replace(/,/g, '')),
      yearsToPayOff: parseFloat(formValues.yearsToPayOff),
      yearPurchased: parseFloat(formValues.yearPurchased),
      market: selectedMarket,
    };
    setInput(boomerInput);
    setPhase('loading');
    setTimeout(() => {
      setResult(calculateBoomerMoment(boomerInput));
      setPhase('results');
    }, 3000);
  }, [formValues, validate]);

  const handleReset = useCallback(() => {
    setPhase('input');
    setResult(null);
    setFormValues({ housePrice: '', annualSalary: '', yearsToPayOff: '', yearPurchased: '' });
    setErrors({});
  }, []);

  if (phase === 'loading') return <LoadingScreen />;
  if (phase === 'results' && result) {
    const isRecentPurchase = input.yearPurchased >= 2015;
    return isRecentPurchase
      ? <AffordabilityScreen result={result} input={input} onReset={handleReset} />
      : <ResultsScreen result={result} input={input} onReset={handleReset} />;
  }

  return (
    <div className="max-w-lg mx-auto px-5 py-10 md:py-16">
      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-2">Affordability Calculator</h1>
        <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
          Tell us about your home purchase and we&apos;ll show you what it looks like for a young person today.
        </p>
      </div>

      <div className="card p-6">
        <div className="space-y-5">
          {/* Market Selector */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Select your market
            </label>
            <div className="grid grid-cols-2 gap-2">
              {markets.map((m) => (
                <button
                  key={m.id}
                  onClick={() => m.enabled && setSelectedMarket(m.id)}
                  disabled={!m.enabled}
                  className="relative flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150"
                  style={{
                    border: selectedMarket === m.id
                      ? '2px solid var(--accent)'
                      : '1px solid var(--border)',
                    background: selectedMarket === m.id
                      ? 'var(--accent-light)'
                      : !m.enabled ? 'var(--surface)' : 'var(--background)',
                    color: !m.enabled ? 'var(--text-tertiary)' : 'var(--foreground)',
                    cursor: m.enabled ? 'pointer' : 'not-allowed',
                    opacity: !m.enabled ? 0.6 : 1,
                  }}
                >
                  <span className="text-base">{m.flag}</span>
                  <span>{m.name}</span>
                  {!m.enabled && (
                    <span className="badge badge-warning ml-auto" style={{ fontSize: '0.625rem', padding: '0.125rem 0.375rem' }}>
                      Soon
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* House Price */}
          <div>
            <label className="block text-sm font-medium mb-1.5">
              What did you pay for your house? <span style={{ color: 'var(--text-tertiary)' }}>({currentMarket.currency})</span>
            </label>
            <div className="relative">
              <span className={`absolute left-4.5 top-1/2 -translate-y-1/2 text-sm ${formValues.housePrice ? 'hidden' : ''}`} style={{ color: 'var(--text-tertiary)' }}>{currentMarket.currency === 'GBP' ? '£' : '$'}</span>
              <input
                type="text"
                inputMode="numeric"
                className="input-field pl-7 placeholder:pl-3 "
                placeholder="120,000"
                value={formValues.housePrice}
                onChange={(e) => {
                  setFormValues({ ...formValues, housePrice: e.target.value.replace(/[^0-9,]/g, '') });
                  if (errors.housePrice) setErrors({ ...errors, housePrice: '' });
                }}
              />
            </div>
            {errors.housePrice && <p className="text-xs mt-1" style={{ color: 'var(--danger)' }}>{errors.housePrice}</p>}
          </div>

          {/* Salary */}
          <div>
            <label className="block text-sm font-medium mb-1.5">
              What was your average annual salary? <span style={{ color: 'var(--text-tertiary)' }}>({currentMarket.currency})</span>
            </label>
            <div className="relative">
              <span className={`absolute left-4.5 top-1/2 -translate-y-1/2 text-sm ${formValues.annualSalary ? 'hidden' : ''}`} style={{ color: 'var(--text-tertiary)' }}>{currentMarket.currency === 'GBP' ? '£' : '$'}</span>
              <input
                type="text"
                inputMode="numeric"
                className="input-field pl-7 placeholder:pl-3"
                placeholder="35,000"
                value={formValues.annualSalary}
                onChange={(e) => {
                  setFormValues({ ...formValues, annualSalary: e.target.value.replace(/[^0-9,]/g, '') });
                  if (errors.annualSalary) setErrors({ ...errors, annualSalary: '' });
                }}
              />
            </div>
            {errors.annualSalary && <p className="text-xs mt-1" style={{ color: 'var(--danger)' }}>{errors.annualSalary}</p>}
          </div>

          {/* Years */}
          <div>
            <label className="block text-sm font-medium mb-1.5">
              How many years did it take to pay off?
            </label>
            <input
              type="number"
              className="input-field"
              placeholder="25"
              min="1"
              max="50"
              value={formValues.yearsToPayOff}
              onChange={(e) => {
                setFormValues({ ...formValues, yearsToPayOff: e.target.value });
                if (errors.yearsToPayOff) setErrors({ ...errors, yearsToPayOff: '' });
              }}
            />
            {errors.yearsToPayOff && <p className="text-xs mt-1" style={{ color: 'var(--danger)' }}>{errors.yearsToPayOff}</p>}
          </div>

          {/* Year Purchased */}
          <div>
            <label className="block text-sm font-medium mb-1.5">
              What year did you buy your house?
            </label>
            <input
              type="number"
              className="input-field"
              placeholder="1990"
              min="1960"
              max="2025"
              value={formValues.yearPurchased}
              onChange={(e) => {
                setFormValues({ ...formValues, yearPurchased: e.target.value });
                if (errors.yearPurchased) setErrors({ ...errors, yearPurchased: '' });
              }}
            />
            <p className="text-xs mt-1" style={{ color: 'var(--text-tertiary)' }}>
              We&apos;ll use the average mortgage rate from that year to calculate your repayments.
            </p>
            {errors.yearPurchased && <p className="text-xs mt-1" style={{ color: 'var(--danger)' }}>{errors.yearPurchased}</p>}
          </div>

          <button onClick={handleCalculate} className="btn-primary w-full">
            Calculate
          </button>
        </div>
      </div>

      {/* Tip */}
      <div
        className="mt-5 rounded-lg p-4 text-sm"
        style={{ background: 'var(--accent-light)', border: '1px solid var(--accent-border)' }}
      >
        <div className="flex gap-2.5">
          <span className="shrink-0">💡</span>
          <div style={{ color: '#065f46' }}>
            <strong>Not sure of exact numbers?</strong> Rough estimates work well.
            A typical 80s/90s example: house $80K–$200K, salary $25K–$50K, paid off in 20–30 years.
          </div>
        </div>
      </div>
    </div>
  );
}
