// ============================================================
// Market Data Types
// ============================================================

export type MarketId = 'AU' | 'US' | 'CA' | 'UK';

export interface MarketData {
  id: MarketId;
  name: string;
  flag: string;
  currency: string;
  locale: string;
  enabled: boolean;

  // Current economic data
  medianHousePrice: number;
  medianSalary: number;
  currentInterestRate: number;
  defaultLoanTermYears: number;

  // Sources & labels
  housePriceSource: string;
  salarySource: string;
  rateSource: string;

  // Historical mortgage interest rates by year
  historicalRates: Record<number, number>;

  // Historical national median house prices by year
  historicalMedianPrices: Record<number, number>;
}

// ============================================================
// Market Definitions
// ============================================================

const MARKETS: Record<MarketId, MarketData> = {
  AU: {
    id: 'AU',
    name: 'Australia',
    flag: '🇦🇺',
    currency: 'AUD',
    locale: 'en-AU',
    enabled: true,
    medianHousePrice: 1_000_000,
    medianSalary: 90_500,
    currentInterestRate: 0.06,
    defaultLoanTermYears: 30,
    housePriceSource: 'CoreLogic 2026',
    salarySource: 'ABS Average Weekly Earnings, full-time median (Nov 2025)',
    rateSource: 'RBA/major banks 2026',
    historicalRates: {
      1970: 0.059, 1971: 0.073, 1972: 0.073, 1973: 0.078, 1974: 0.095,
      1975: 0.095, 1976: 0.098, 1977: 0.098, 1978: 0.098, 1979: 0.098,
      1980: 0.105, 1981: 0.115, 1982: 0.135, 1983: 0.125, 1984: 0.115,
      1985: 0.125, 1986: 0.155, 1987: 0.155, 1988: 0.135, 1989: 0.170,
      1990: 0.170, 1991: 0.135, 1992: 0.105, 1993: 0.090, 1994: 0.090,
      1995: 0.105, 1996: 0.095, 1997: 0.075, 1998: 0.065, 1999: 0.065,
      2000: 0.070, 2001: 0.065, 2002: 0.065, 2003: 0.065, 2004: 0.070,
      2005: 0.073, 2006: 0.078, 2007: 0.083, 2008: 0.090, 2009: 0.058,
      2010: 0.073, 2011: 0.077, 2012: 0.068, 2013: 0.060, 2014: 0.058,
      2015: 0.055, 2016: 0.053, 2017: 0.053, 2018: 0.053, 2019: 0.050,
      2020: 0.040, 2021: 0.035, 2022: 0.040, 2023: 0.060, 2024: 0.062,
      2025: 0.062,
    },
    // National median house prices — ABS / CoreLogic
    historicalMedianPrices: {
      1970: 18_700, 1971: 20_000, 1972: 22_000, 1973: 24_000, 1974: 28_000,
      1975: 30_000, 1976: 32_000, 1977: 33_500, 1978: 35_000, 1979: 36_000,
      1980: 37_000, 1981: 42_000, 1982: 48_000, 1983: 52_000, 1984: 57_000,
      1985: 67_000, 1986: 72_000, 1987: 80_000, 1988: 90_000, 1989: 100_000,
      1990: 108_000, 1991: 110_000, 1992: 112_000, 1993: 115_000, 1994: 120_000,
      1995: 124_000, 1996: 130_000, 1997: 135_000, 1998: 140_000, 1999: 150_000,
      2000: 160_000, 2001: 180_000, 2002: 220_000, 2003: 260_000, 2004: 280_000,
      2005: 293_000, 2006: 320_000, 2007: 350_000, 2008: 370_000, 2009: 390_000,
      2010: 430_000, 2011: 420_000, 2012: 410_000, 2013: 430_000, 2014: 470_000,
      2015: 550_000, 2016: 580_000, 2017: 630_000, 2018: 610_000, 2019: 600_000,
      2020: 650_000, 2021: 750_000, 2022: 850_000, 2023: 900_000, 2024: 950_000,
      2025: 1_000_000,
    },
  },
  US: {
    id: 'US',
    name: 'United States',
    flag: '🇺🇸',
    currency: 'USD',
    locale: 'en-US',
    enabled: true,
    medianHousePrice: 420_000,
    medianSalary: 63_000,
    currentInterestRate: 0.069,
    defaultLoanTermYears: 30,
    housePriceSource: 'NAR / Census Bureau 2026',
    salarySource: 'BLS Median Usual Weekly Earnings, full-time (Q4 2025)',
    rateSource: 'Freddie Mac PMMS 2026',
    historicalRates: {
      1970: 0.085, 1971: 0.073, 1972: 0.072, 1973: 0.080, 1974: 0.097,
      1975: 0.090, 1976: 0.087, 1977: 0.088, 1978: 0.097, 1979: 0.112,
      1980: 0.135, 1981: 0.165, 1982: 0.160, 1983: 0.133, 1984: 0.134,
      1985: 0.122, 1986: 0.101, 1987: 0.103, 1988: 0.104, 1989: 0.106,
      1990: 0.101, 1991: 0.094, 1992: 0.083, 1993: 0.071, 1994: 0.085,
      1995: 0.077, 1996: 0.078, 1997: 0.075, 1998: 0.069, 1999: 0.079,
      2000: 0.081, 2001: 0.070, 2002: 0.061, 2003: 0.058, 2004: 0.057,
      2005: 0.059, 2006: 0.064, 2007: 0.063, 2008: 0.061, 2009: 0.051,
      2010: 0.047, 2011: 0.045, 2012: 0.037, 2013: 0.040, 2014: 0.042,
      2015: 0.039, 2016: 0.037, 2017: 0.040, 2018: 0.046, 2019: 0.039,
      2020: 0.031, 2021: 0.030, 2022: 0.054, 2023: 0.068, 2024: 0.070,
      2025: 0.069,
    },
    historicalMedianPrices: {
      1970: 23_000, 1971: 25_000, 1972: 27_000, 1973: 29_000, 1974: 32_000,
      1975: 35_000, 1976: 38_000, 1977: 42_000, 1978: 48_000, 1979: 53_000,
      1980: 62_000, 1981: 66_000, 1982: 67_000, 1983: 70_000, 1984: 73_000,
      1985: 76_000, 1986: 80_000, 1987: 85_000, 1988: 90_000, 1989: 94_000,
      1990: 96_000, 1991: 100_000, 1992: 104_000, 1993: 107_000, 1994: 110_000,
      1995: 114_000, 1996: 118_000, 1997: 122_000, 1998: 128_000, 1999: 134_000,
      2000: 143_000, 2001: 148_000, 2002: 158_000, 2003: 170_000, 2004: 195_000,
      2005: 220_000, 2006: 222_000, 2007: 218_000, 2008: 198_000, 2009: 173_000,
      2010: 173_000, 2011: 166_000, 2012: 177_000, 2013: 197_000, 2014: 209_000,
      2015: 223_000, 2016: 236_000, 2017: 248_000, 2018: 261_000, 2019: 272_000,
      2020: 330_000, 2021: 362_000, 2022: 392_000, 2023: 405_000, 2024: 412_000,
      2025: 420_000,
    },
  },
  CA: {
    id: 'CA',
    name: 'Canada',
    flag: '🇨🇦',
    currency: 'CAD',
    locale: 'en-CA',
    enabled: true,
    medianHousePrice: 700_000,
    medianSalary: 60_000,
    currentInterestRate: 0.055,
    defaultLoanTermYears: 25,
    housePriceSource: 'CREA 2026',
    salarySource: 'Statistics Canada, median individual income (2025)',
    rateSource: 'Bank of Canada 2026',
    historicalRates: {
      1970: 0.095, 1971: 0.095, 1972: 0.092, 1973: 0.095, 1974: 0.115,
      1975: 0.105, 1976: 0.108, 1977: 0.102, 1978: 0.105, 1979: 0.120,
      1980: 0.140, 1981: 0.185, 1982: 0.180, 1983: 0.135, 1984: 0.130,
      1985: 0.120, 1986: 0.110, 1987: 0.108, 1988: 0.112, 1989: 0.128,
      1990: 0.133, 1991: 0.115, 1992: 0.095, 1993: 0.080, 1994: 0.090,
      1995: 0.085, 1996: 0.075, 1997: 0.065, 1998: 0.068, 1999: 0.072,
      2000: 0.075, 2001: 0.068, 2002: 0.065, 2003: 0.060, 2004: 0.058,
      2005: 0.058, 2006: 0.063, 2007: 0.063, 2008: 0.060, 2009: 0.045,
      2010: 0.053, 2011: 0.052, 2012: 0.042, 2013: 0.042, 2014: 0.040,
      2015: 0.028, 2016: 0.027, 2017: 0.032, 2018: 0.038, 2019: 0.034,
      2020: 0.030, 2021: 0.025, 2022: 0.048, 2023: 0.060, 2024: 0.058,
      2025: 0.055,
    },
    historicalMedianPrices: {
      1970: 25_000, 1971: 27_000, 1972: 29_000, 1973: 33_000, 1974: 38_000,
      1975: 45_000, 1976: 50_000, 1977: 52_000, 1978: 54_000, 1979: 58_000,
      1980: 65_000, 1981: 68_000, 1982: 66_000, 1983: 65_000, 1984: 67_000,
      1985: 80_000, 1986: 88_000, 1987: 100_000, 1988: 115_000, 1989: 130_000,
      1990: 140_000, 1991: 138_000, 1992: 135_000, 1993: 132_000, 1994: 135_000,
      1995: 145_000, 1996: 148_000, 1997: 150_000, 1998: 152_000, 1999: 155_000,
      2000: 165_000, 2001: 170_000, 2002: 185_000, 2003: 200_000, 2004: 225_000,
      2005: 250_000, 2006: 275_000, 2007: 300_000, 2008: 295_000, 2009: 290_000,
      2010: 340_000, 2011: 350_000, 2012: 355_000, 2013: 370_000, 2014: 400_000,
      2015: 440_000, 2016: 475_000, 2017: 500_000, 2018: 490_000, 2019: 490_000,
      2020: 530_000, 2021: 600_000, 2022: 680_000, 2023: 660_000, 2024: 680_000,
      2025: 700_000,
    },
  },
  UK: {
    id: 'UK',
    name: 'Great Britain',
    flag: '🇬🇧',
    currency: 'GBP',
    locale: 'en-GB',
    enabled: true,
    medianHousePrice: 285_000,
    medianSalary: 35_000,
    currentInterestRate: 0.055,
    defaultLoanTermYears: 25,
    housePriceSource: 'ONS 2026',
    salarySource: 'ONS Annual Survey of Hours and Earnings, full-time median (2025)',
    rateSource: 'Bank of England 2026',
    historicalRates: {
      1970: 0.085, 1971: 0.080, 1972: 0.080, 1973: 0.095, 1974: 0.110,
      1975: 0.110, 1976: 0.110, 1977: 0.098, 1978: 0.095, 1979: 0.120,
      1980: 0.150, 1981: 0.148, 1982: 0.130, 1983: 0.115, 1984: 0.120,
      1985: 0.130, 1986: 0.115, 1987: 0.110, 1988: 0.120, 1989: 0.145,
      1990: 0.145, 1991: 0.120, 1992: 0.098, 1993: 0.078, 1994: 0.080,
      1995: 0.078, 1996: 0.070, 1997: 0.073, 1998: 0.073, 1999: 0.065,
      2000: 0.065, 2001: 0.058, 2002: 0.050, 2003: 0.050, 2004: 0.055,
      2005: 0.050, 2006: 0.052, 2007: 0.058, 2008: 0.060, 2009: 0.038,
      2010: 0.038, 2011: 0.040, 2012: 0.040, 2013: 0.035, 2014: 0.035,
      2015: 0.030, 2016: 0.025, 2017: 0.025, 2018: 0.028, 2019: 0.028,
      2020: 0.025, 2021: 0.022, 2022: 0.040, 2023: 0.055, 2024: 0.055,
      2025: 0.055,
    },
    historicalMedianPrices: {
      1970: 4_900, 1971: 5_300, 1972: 6_500, 1973: 8_000, 1974: 9_500,
      1975: 10_000, 1976: 11_000, 1977: 12_000, 1978: 14_000, 1979: 17_000,
      1980: 20_000, 1981: 22_000, 1982: 23_000, 1983: 25_000, 1984: 27_000,
      1985: 30_000, 1986: 34_000, 1987: 38_000, 1988: 46_000, 1989: 52_000,
      1990: 55_000, 1991: 53_000, 1992: 50_000, 1993: 50_000, 1994: 52_000,
      1995: 55_000, 1996: 58_000, 1997: 60_000, 1998: 65_000, 1999: 72_000,
      2000: 82_000, 2001: 90_000, 2002: 105_000, 2003: 120_000, 2004: 140_000,
      2005: 155_000, 2006: 165_000, 2007: 175_000, 2008: 170_000, 2009: 160_000,
      2010: 170_000, 2011: 170_000, 2012: 170_000, 2013: 175_000, 2014: 188_000,
      2015: 195_000, 2016: 205_000, 2017: 215_000, 2018: 225_000, 2019: 230_000,
      2020: 235_000, 2021: 260_000, 2022: 280_000, 2023: 285_000, 2024: 285_000,
      2025: 285_000,
    },
  },
};

/** Get all markets */
export function getMarkets(): MarketData[] {
  return Object.values(MARKETS);
}

/** Get a specific market by ID */
export function getMarket(id: MarketId): MarketData {
  return MARKETS[id];
}

/** Get the default (Australia) market */
export function getDefaultMarket(): MarketData {
  return MARKETS.AU;
}

// ============================================================
// Historical Rate Lookup
// ============================================================

/**
 * Get the approximate mortgage interest rate for a given year in a given market.
 * Falls back to nearest available year if exact year isn't in the table.
 */
export function getHistoricalRate(market: MarketData, year: number): number {
  const rates = market.historicalRates;
  if (rates[year] !== undefined) return rates[year];
  const years = Object.keys(rates).map(Number).sort((a, b) => a - b);
  if (year < years[0]) return rates[years[0]];
  if (year > years[years.length - 1]) return rates[years[years.length - 1]];
  const closest = years.reduce((prev, curr) =>
    Math.abs(curr - year) < Math.abs(prev - year) ? curr : prev
  );
  return rates[closest];
}

/**
 * Get the national median house price for a given year in a given market.
 * Uses interpolation between available data points.
 */
export function getHistoricalMedianPrice(market: MarketData, year: number): number {
  const prices = market.historicalMedianPrices;
  if (prices[year] !== undefined) return prices[year];
  const years = Object.keys(prices).map(Number).sort((a, b) => a - b);
  if (year <= years[0]) return prices[years[0]];
  if (year >= years[years.length - 1]) return prices[years[years.length - 1]];
  // Linear interpolation between surrounding years
  let lower = years[0], upper = years[years.length - 1];
  for (const y of years) {
    if (y <= year) lower = y;
    if (y >= year && upper === years[years.length - 1]) upper = y;
  }
  if (lower === upper) return prices[lower];
  const fraction = (year - lower) / (upper - lower);
  return Math.round(prices[lower] + fraction * (prices[upper] - prices[lower]));
}

// ============================================================
// Input / Output Types
// ============================================================

export interface BoomerInput {
  housePrice: number;
  annualSalary: number;
  yearsToPayOff: number;
  yearPurchased: number;
  market: MarketId;
}

export interface SuburbData {
  suburb: string;
  state: string;
  postcode: string;
  medianPrice: number;
  dataDate: string | null;
  numberSold: number | null;
}

// ============================================================
// AU Postcode → State Mapping
// ============================================================

export function getStateFromPostcode(postcode: string): string | null {
  const pc = parseInt(postcode, 10);
  if (isNaN(pc)) return null;
  if (pc >= 2000 && pc <= 2599) return 'NSW';
  if (pc >= 2619 && pc <= 2899) return 'NSW';
  if (pc >= 2921 && pc <= 2999) return 'NSW';
  if (pc >= 2600 && pc <= 2618) return 'ACT';
  if (pc >= 2900 && pc <= 2920) return 'ACT';
  if (pc >= 3000 && pc <= 3999) return 'VIC';
  if (pc >= 4000 && pc <= 4999) return 'QLD';
  if (pc >= 5000 && pc <= 5799) return 'SA';
  if (pc >= 6000 && pc <= 6797) return 'WA';
  if (pc >= 7000 && pc <= 7799) return 'TAS';
  if (pc >= 800 && pc <= 899) return 'NT';
  if (pc >= 200 && pc <= 299) return 'ACT';
  if (pc >= 1000 && pc <= 1999) return 'NSW'; // PO Boxes
  return null;
}

export interface CalculationResult {
  // Boomer's era stats
  boomerPriceToIncomeRatio: number;
  boomerMonthlyRepayment: number;
  boomerRepaymentToIncomePercent: number;
  boomerInterestRate: number;

  // Today's stats (using scaled house price)
  scaledTodayHousePrice: number;
  historicalMedianAtPurchase: number;
  todayPriceToIncomeRatio: number;
  todayMonthlyRepayment: number;
  todayRepaymentToIncomePercent: number;

  // The big reveal
  yearsToPayOffToday: number;

  // Required salary to match boomer's payoff rate
  requiredSalary: number;

  // Supporting data
  currentMedianHousePrice: number;
  currentMedianSalary: number;
  currentInterestRate: number;
  market: MarketData;
}

// ============================================================
// Mortgage Math
// ============================================================

/**
 * Standard mortgage monthly repayment formula:
 * M = P * [r(1+r)^n] / [(1+r)^n - 1]
 */
export function calculateMonthlyRepayment(
  principal: number,
  annualRate: number,
  years: number
): number {
  const r = annualRate / 12;
  const n = years * 12;
  if (r === 0) return principal / n;
  const numerator = r * Math.pow(1 + r, n);
  const denominator = Math.pow(1 + r, n) - 1;
  return principal * (numerator / denominator);
}

/**
 * Calculate how many years to pay off a loan given a fixed monthly payment.
 * n = -log(1 - (P*r)/M) / log(1+r)
 */
export function calculateYearsToPayOff(
  principal: number,
  annualRate: number,
  monthlyPayment: number
): number {
  const r = annualRate / 12;
  if (r === 0) return principal / monthlyPayment / 12;
  const ratio = (principal * r) / monthlyPayment;
  if (ratio >= 1) return Infinity;
  const n = -Math.log(1 - ratio) / Math.log(1 + r);
  return n / 12;
}

// ============================================================
// Main Calculation
// ============================================================

export function calculateBoomerMoment(input: BoomerInput): CalculationResult {
  const { housePrice, annualSalary, yearsToPayOff, yearPurchased, market: marketId } = input;
  const market = getMarket(marketId);

  // ---- BOOMER ERA ----
  const boomerPriceToIncomeRatio = housePrice / annualSalary;
  const boomerInterestRate = getHistoricalRate(market, yearPurchased);
  const boomerMonthlyRepayment = calculateMonthlyRepayment(
    housePrice, boomerInterestRate, yearsToPayOff
  );
  const boomerMonthlyIncome = annualSalary / 12;
  const boomerRepaymentToIncomePercent = (boomerMonthlyRepayment / boomerMonthlyIncome) * 100;

  // ---- SCALE HOUSE PRICE ----
  // Find what the national median was when they bought, and scale proportionally.
  // e.g. if they bought a house worth 2× the median in 1990, today's equivalent
  // is 2× today's median.
  const historicalMedianAtPurchase = getHistoricalMedianPrice(market, yearPurchased);
  const scaleFactor = housePrice / historicalMedianAtPurchase;
  const scaledTodayHousePrice = Math.round(scaleFactor * market.medianHousePrice);

  // ---- TODAY (using scaled house price) ----
  const todayPriceToIncomeRatio = scaledTodayHousePrice / market.medianSalary;
  const todayMonthlyRepayment = calculateMonthlyRepayment(
    scaledTodayHousePrice, market.currentInterestRate, market.defaultLoanTermYears
  );
  const todayMonthlyIncome = market.medianSalary / 12;
  const todayRepaymentToIncomePercent = (todayMonthlyRepayment / todayMonthlyIncome) * 100;

  // THE BIG REVEAL
  const matchingMonthlyPayment = (boomerRepaymentToIncomePercent / 100) * todayMonthlyIncome;
  let yearsToPayOffToday: number;
  if (matchingMonthlyPayment <= (scaledTodayHousePrice * (market.currentInterestRate / 12))) {
    yearsToPayOffToday = 999;
  } else {
    yearsToPayOffToday = calculateYearsToPayOff(
      scaledTodayHousePrice, market.currentInterestRate, matchingMonthlyPayment
    );
  }

  // Required salary
  const todayMonthlyRepaymentSameTerm = calculateMonthlyRepayment(
    scaledTodayHousePrice, market.currentInterestRate, yearsToPayOff
  );
  const requiredMonthlyIncome = todayMonthlyRepaymentSameTerm / (boomerRepaymentToIncomePercent / 100);
  const requiredSalary = Math.round(requiredMonthlyIncome * 12);

  return {
    boomerPriceToIncomeRatio,
    boomerMonthlyRepayment,
    boomerRepaymentToIncomePercent,
    boomerInterestRate,
    scaledTodayHousePrice,
    historicalMedianAtPurchase,
    todayPriceToIncomeRatio,
    todayMonthlyRepayment,
    todayRepaymentToIncomePercent,
    yearsToPayOffToday: Math.round(yearsToPayOffToday * 10) / 10,
    requiredSalary,
    currentMedianHousePrice: market.medianHousePrice,
    currentMedianSalary: market.medianSalary,
    currentInterestRate: market.currentInterestRate,
    market,
  };
}

/**
 * Re-run the boomer moment calculation but substitute a suburb-level
 * median house price instead of the national median.
 */
export function calculatePreciseResult(
  input: BoomerInput,
  suburbData: SuburbData
): CalculationResult {
  const { housePrice, annualSalary, yearsToPayOff, yearPurchased, market: marketId } = input;
  const market = getMarket(marketId);

  // ---- BOOMER ERA (unchanged) ----
  const boomerPriceToIncomeRatio = housePrice / annualSalary;
  const boomerInterestRate = getHistoricalRate(market, yearPurchased);
  const boomerMonthlyRepayment = calculateMonthlyRepayment(
    housePrice, boomerInterestRate, yearsToPayOff
  );
  const boomerMonthlyIncome = annualSalary / 12;
  const boomerRepaymentToIncomePercent = (boomerMonthlyRepayment / boomerMonthlyIncome) * 100;

  // ---- SCALE HOUSE PRICE using SUBURB median ----
  const historicalMedianAtPurchase = getHistoricalMedianPrice(market, yearPurchased);
  const scaleFactor = housePrice / historicalMedianAtPurchase;
  // Use suburb median instead of national median
  const scaledTodayHousePrice = Math.round(scaleFactor * suburbData.medianPrice);

  // ---- TODAY (using suburb-scaled house price) ----
  const todayPriceToIncomeRatio = scaledTodayHousePrice / market.medianSalary;
  const todayMonthlyRepayment = calculateMonthlyRepayment(
    scaledTodayHousePrice, market.currentInterestRate, market.defaultLoanTermYears
  );
  const todayMonthlyIncome = market.medianSalary / 12;
  const todayRepaymentToIncomePercent = (todayMonthlyRepayment / todayMonthlyIncome) * 100;

  // THE BIG REVEAL
  const matchingMonthlyPayment = (boomerRepaymentToIncomePercent / 100) * todayMonthlyIncome;
  let yearsToPayOffToday: number;
  if (matchingMonthlyPayment <= (scaledTodayHousePrice * (market.currentInterestRate / 12))) {
    yearsToPayOffToday = 999;
  } else {
    yearsToPayOffToday = calculateYearsToPayOff(
      scaledTodayHousePrice, market.currentInterestRate, matchingMonthlyPayment
    );
  }

  // Required salary
  const todayMonthlyRepaymentSameTerm = calculateMonthlyRepayment(
    scaledTodayHousePrice, market.currentInterestRate, yearsToPayOff
  );
  const requiredMonthlyIncome = todayMonthlyRepaymentSameTerm / (boomerRepaymentToIncomePercent / 100);
  const requiredSalary = Math.round(requiredMonthlyIncome * 12);

  return {
    boomerPriceToIncomeRatio,
    boomerMonthlyRepayment,
    boomerRepaymentToIncomePercent,
    boomerInterestRate,
    scaledTodayHousePrice,
    historicalMedianAtPurchase,
    todayPriceToIncomeRatio,
    todayMonthlyRepayment,
    todayRepaymentToIncomePercent,
    yearsToPayOffToday: Math.round(yearsToPayOffToday * 10) / 10,
    requiredSalary,
    currentMedianHousePrice: suburbData.medianPrice, // suburb price, not national
    currentMedianSalary: market.medianSalary,
    currentInterestRate: market.currentInterestRate,
    market,
  };
}

// ============================================================
// Formatting Helpers
// ============================================================

/** Format a number as currency for a given market */
export function formatCurrency(amount: number, market?: MarketData): string {
  const m = market || getDefaultMarket();
  return new Intl.NumberFormat(m.locale, {
    style: 'currency',
    currency: m.currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

/** Format a percentage */
export function formatPercent(value: number): string {
  return `${value.toFixed(1)}%`;
}
