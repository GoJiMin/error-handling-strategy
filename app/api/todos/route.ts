import {promises as fs} from 'fs';
import {NextRequest, NextResponse} from 'next/server';
import path from 'path';

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;

  const flag = Number(searchParams.get('flag'));

  if (flag) {
    return NextResponse.json(
      {
        title: 'INTERNAL_SERVER_ERROR',
        detail: '서버에서 알 수 없는 에러가 발생했어요. 잠시 후 다시 시도해주세요.',
        status: 500,
      },
      {
        status: 500,
      },
    );
  } else {
    const filePath = path.join(process.cwd(), 'public', 'data.json');
    const data = await fs.readFile(filePath, 'utf-8');

    return NextResponse.json(JSON.parse(data));
  }
}

export async function POST() {
  return NextResponse.json(
    {
      title: 'CAN_NOT_SAVE_TODO',
      detail: '투두 저장 중 무슨 무슨 에러 발생',
      status: 500,
    },
    {
      status: 500,
    },
  );
}
