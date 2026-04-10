import { NextRequest, NextResponse } from 'next/server';
import { searchSuburbs } from '@/lib/suburb-data';

// ============================================================
// Suburb Lookup — Static Dataset (no external API needed)
// ============================================================
//
// Uses a curated dataset of ~170 major Australian suburbs compiled
// from public government quarterly property sales reports.
// No API key or authentication required.

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('q');

  if (!query || !query.trim()) {
    return NextResponse.json(
      { error: 'Missing required parameter: q (search query)' },
      { status: 400 }
    );
  }

  const results = searchSuburbs(query);

  if (results.length === 0) {
    return NextResponse.json(
      {
        error: 'No matching suburb found. Try a major suburb name or postcode (e.g. "Pyrmont 2009").',
        suggestion: 'This dataset covers ~170 major Australian suburbs. Try a larger or more well-known suburb nearby.',
      },
      { status: 404 }
    );
  }

  // Return the top match
  const top = results[0];
  return NextResponse.json({
    suburb: top.suburb,
    state: top.state,
    postcode: top.postcode,
    medianPrice: top.medianPrice,
    dataDate: top.dataSource,
    numberSold: null,
    // Also include any additional matches for disambiguation
    alternatives: results.length > 1
      ? results.slice(1, 5).map(r => ({
          suburb: r.suburb,
          state: r.state,
          postcode: r.postcode,
          medianPrice: r.medianPrice,
        }))
      : [],
  });
}
