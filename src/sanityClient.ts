import { createClient } from '@sanity/client';

export const client = createClient({
  projectId: 'cz2qth44',
  dataset: 'production',
  useCdn: false,
  apiVersion: '2026-07-12', // setting active API version
});
