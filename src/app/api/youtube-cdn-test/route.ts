import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const quality = searchParams.get('quality') || '4k'; // '4k' | '1080p'
  const isCongestedSim = searchParams.get('simulate_throttling') === 'true';

  // 4k burst target: 3.5MB (safely under Netlify 6MB serverless payload limit)
  // 1080p target: 1.5MB
  const targetMb = quality === '4k' ? 3.5 : 1.5;
  const totalBytes = Math.floor(targetMb * 1024 * 1024);

  const chunk = new Uint8Array(totalBytes);
  // Fill chunk data
  for (let i = 0; i < chunk.length; i += 1024) {
    chunk[i] = 0x47; // MPEG-TS sync byte simulation
  }

  // If throttling simulation requested for ISP YouTube peering test
  if (isCongestedSim) {
    await new Promise(res => setTimeout(res, 200));
  }

  return new NextResponse(chunk, {
    status: 200,
    headers: {
      'Content-Type': 'video/mp4',
      'Content-Length': totalBytes.toString(),
      'X-YouTube-CDN-Node': 'googlevideo-edge-ord03',
      'X-Bitrate-Target-Kbps': quality === '4k' ? '25000' : '8000',
      'Cache-Control': 'no-store, no-cache, must-revalidate',
      'Access-Control-Allow-Origin': '*',
    },
  });
}
