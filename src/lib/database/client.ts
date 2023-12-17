import { createClient } from '@libsql/client';

export const client = createClient({
	url: process.env.DB_URL?.toString() || '',
	authToken: process.env.AUTH_TOKEN,
	syncUrl: process.env.SYNC_URL
});
