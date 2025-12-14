import {NextResponse} from 'next/server';

export async function GET() {
  await new Promise(resolve => setTimeout(resolve, 1000));
  return NextResponse.json({
    name: '지민지민',
    email: 'jimin@jimin.com',
  });
}
