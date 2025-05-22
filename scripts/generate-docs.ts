import { generateApiDocs } from '../src/lib/generateApiDocs';

generateApiDocs()
  .then(() => {
    console.log('API documentation generated successfully!');
  })
  .catch((error) => {
    console.error('Error generating API documentation:', error);
    process.exit(1);
  });
