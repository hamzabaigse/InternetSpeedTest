import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  // Strictly enforce max 4.0MB to stay safely under Netlify's 6MB serverless payload limit
  const sizeMb = Math.min(Math.max(parseFloat(searchParams.get('size') || '2.5'), 0.25), 4.0);
  const port = searchParams.get('port') || '443';
  const totalBytes = Math.floor(sizeMb * 1024 * 1024);

  // Generate buffer chunk
  const chunk = new Uint8Array(totalBytes);
  // Fill with dummy pattern
  for (let i = 0; i < chunk.length; i += 64) {
    chunk[i] = (i & 0xff);
    chunk[i + 1] = ((i >> 8) & 0xff);
    chunk[i + 2] = 0x55;
    chunk[i + 3] = 0xaa;
  }

  return new NextResponse(chunk, {
    status: 200,
    headers: {
      'Content-Type': 'application/octet-stream',
      'Content-Length': totalBytes.toString(),
      'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0',
      'Pragma': 'no-cache',
      'Expires': '0',
      'X-Simulated-Port': port,
      'Access-Control-Allow-Origin': '*',
    },
  });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.arrayBuffer();
    return NextResponse.json({
      status: 'ok',
      receivedBytes: body.byteLength,
      timestamp: Date.now(),
    }, {
      headers: {
        'Cache-Control': 'no-store, no-cache, must-revalidate',
        'Access-Control-Allow-Origin': '*',
      }
    });
  } catch {
    return NextResponse.json({
      status: 'ok',
      receivedBytes: 0,
      timestamp: Date.now(),
    });
  }
}
