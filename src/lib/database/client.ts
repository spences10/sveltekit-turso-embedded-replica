import { AUTH_TOKEN, DB_URL, SYNC_URL } from '$env/static/private';
import { createClient, type Client } from '@libsql/client';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

let client_instance: Client | null = null;

export const turso_client = (): Client => {
	if (!client_instance) {
		const url = DB_URL?.trim();
		if (url === undefined) {
			throw new Error('DB_URL is not defined');
		}
		const sync_url = SYNC_URL?.trim();
		if (sync_url === undefined) {
			throw new Error('SYNC_URL is not defined');
		}

		const auth_token = AUTH_TOKEN?.trim();
		if (auth_token === undefined) {
			if (!url.includes('file:')) {
				throw new Error('AUTH_TOKEN is not defined');
			}
		}

		const dir_name = dirname(fileURLToPath(import.meta.url));
		const local_db_path = join(dir_name, DB_URL as string);

		client_instance = createClient({
			url: 'file:' + local_db_path,
			authToken: AUTH_TOKEN as string,
			syncUrl: SYNC_URL as string,
		});
	}
	return client_instance;
};
