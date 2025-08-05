export default {
  'models': {
    output: {
      client: 'zod',
      mode: 'tags-split',
      target: '../models',
      fileExtension: '.zod.ts',
    },
    input: {
      target: '../../../../openapi.yaml',
    },
  },
  'services': {
    input: {
      target: '../../../../openapi.yaml',
    },
    output: {
      client: 'react-query',
      target: '../services',
      schemas: '../models',
      override: {
        mutator: {
          path: './axios-instance.ts',
          name: 'customAxiosInstance',
        },
        
      },
      mock: true,
      mode: 'tags-split',
      allParamsOptional: true,
      prettier: true,
      clean: true,
    },
  },
};
