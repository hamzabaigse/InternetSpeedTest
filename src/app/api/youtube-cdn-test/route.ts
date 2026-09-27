import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const quality = searchParams.get('quality') || '4k'; // '4k' | '1080p'
  const isCongestedSim = searchParams.get('simulate_throttling') === 'true';

  // 4k chunk target: 12MB (representing ~5 seconds of 4K 60fps AV1 video at ~20-25Mbps bitrate)
  // 1080p chunk target: 4MB
  const targetMb = quality === '4k' ? 12 : 4;
  const totalBytes = Math.floor(targetMb * 1024 * 1024);

  const chunk = new Uint8Array(totalBytes);
  // Fill chunk data
  for (let i = 0; i < chunk.length; i += 1024) {
    chunk[i] = 0x47; // MPEG-TS sync byte simulation
  }

  // If throttling simulation requested for ISP YouTube peering test
  if (isCongestedSim) {
    // Add artificial delay before serving bytes
    await new Promise(res => setTimeout(res, 250));
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
