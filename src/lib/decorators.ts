import { NextRequest, NextResponse } from 'next/server';

export function ApiRoute(options: {
  path: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  summary?: string;
  description?: string;
  tags?: string[];
}) {
  return function (handler: Function) {
    // 保存 API 元數據
    (handler as any).apiMetadata = {
      path: options.path,
      method: options.method,
      summary: options.summary,
      description: options.description,
      tags: options.tags,
    };

    return handler;
  };
}
