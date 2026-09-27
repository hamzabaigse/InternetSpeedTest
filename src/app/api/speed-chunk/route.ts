import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const sizeMb = Math.min(Math.max(parseFloat(searchParams.get('size') || '5'), 0.5), 50); // limit 0.5MB to 50MB
  const port = searchParams.get('port') || '443';
  const totalBytes = Math.floor(sizeMb * 1024 * 1024);

  // Generate buffer chunk
  const chunk = new Uint8Array(totalBytes);
  // Fill with dummy data pattern
  for (let i = 0; i < chunk.length; i += 4) {
    chunk[i] = (i & 0xff);
    chunk[i + 1] = ((i >> 8) & 0xff);
    chunk[i + 2] = ((i >> 16) & 0xff);
    chunk[i + 3] = 0xa5;
  }

  return new NextResponse(chunk, {
    status: 200,
    headers: {
      'Content-Type': 'application/octet-stream',
      'Content-Length': totalBytes.toString(),
      'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
      'Pragma': 'no-cache',
      'Expires': '0',
      'X-Simulated-Port': port,
      'Access-Control-Allow-Origin': '*',
    },
  });
}

export async function POST(request: NextRequest) {
  const body = await request.arrayBuffer();
  return NextResponse.json({
    receivedBytes: body.byteLength,
    timestamp: Date.now(),
  }, {
    headers: {
      'Cache-Control': 'no-store, no-cache, must-revalidate',
      'Access-Control-Allow-Origin': '*',
    }
  });
}
