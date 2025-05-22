import fs from 'fs';
import path from 'path';
import { glob } from 'glob';

export async function generateApiDocs() {
  const apiFiles = await glob('src/app/api/**/route.ts');
  const openApiSpec: {
    openapi: string;
    info: { title: string; version: string; description: string };
    paths: { [key: string]: any };
  } = {
    openapi: '3.0.0',
    info: {
      title: 'Next.js API Documentation',
      version: '1.0.0',
      description: 'API documentation for Next.js routes',
    },
    paths: {},
  };

  for (const file of apiFiles) {
    const route = require(path.resolve(process.cwd(), file));
    const relativePath = file
      .replace('src/app/api', '')
      .replace('/route.ts', '');

    if (route.GET) {
      openApiSpec.paths[relativePath] = {
        get: {
          summary: route.GET.apiMetadata?.summary || `GET ${relativePath}`,
          description: route.GET.apiMetadata?.description || '',
          tags: route.GET.apiMetadata?.tags || [],
          responses: {
            '200': {
              description: 'Successful response',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                  },
                },
              },
            },
          },
        },
      };
    }

    if (route.POST) {
      openApiSpec.paths[relativePath] = {
        ...openApiSpec.paths[relativePath],
        post: {
          summary: route.POST.apiMetadata?.summary || `POST ${relativePath}`,
          description: route.POST.apiMetadata?.description || '',
          tags: route.POST.apiMetadata?.tags || [],
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                },
              },
            },
          },
          responses: {
            '201': {
              description: 'Created',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                  },
                },
              },
            },
          },
        },
      };
    }
  }

  // 將文件保存到 public 目錄
  fs.writeFileSync(
    path.join(process.cwd(), 'public', 'swagger.json'),
    JSON.stringify(openApiSpec, null, 2)
  );
}
