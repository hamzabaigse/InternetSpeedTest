import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const timestamp = Date.now();
  const clientIp = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || '127.0.0.1';
  
  return NextResponse.json({
    status: 'ok',
    timestamp,
    clientIp: clientIp.split(',')[0].trim(),
    serverRegion: 'Edge-US-East',
  }, {
    headers: {
      'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
      'Pragma': 'no-cache',
      'Expires': '0',
      'Access-Control-Allow-Origin': '*',
    },
  });
}

export async function POST(request: NextRequest) {
  const timestamp = Date.now();
  // Read body bytes to measure upload speed
  const body = await request.arrayBuffer();
  
  return NextResponse.json({
    status: 'ok',
    receivedBytes: body.byteLength,
    timestamp,
  }, {
    headers: {
      'Cache-Control': 'no-store, no-cache, must-revalidate',
      'Access-Control-Allow-Origin': '*',
    },
  });
}
