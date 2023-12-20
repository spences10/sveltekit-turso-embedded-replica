import { createClient, type Client } from '@libsql/client';
import 'dotenv/config';

// this file needs to do the initial setup of Turso

// first set the remote
const set_remote = async () => {
	const client = createClient({
		url: process.env.SYNC_URL?.toString() || ``,
		authToken: process.env.AUTH_TOKEN,
	});
	await run_queries(client);
};

// set the local
const set_local = async () => {
	const client = createClient({
		url: process.env.DB_URL?.toString() || ``,
		authToken: process.env.AUTH_TOKEN,
		syncUrl: process.env.SYNC_URL,
	});
	// sync remote to local
	await client.sync();
	await run_queries(client);
};

// run queries
const run_queries = async (client: Client) => {
	const queries = 25;
	const start = performance.now();
	for (let i = 0; i < queries; i++) {
		const rs = await client.execute(
			'SELECT u.username, p.title, c.content FROM Users u JOIN Posts p ON u.user_id = p.user_id JOIN Comments c ON p.post_id = c.post_id;',
		);

		for (const row of rs.rows) {
			console.log(
				`User ${row.username} posted '${row.title}' with a comment: '${row.content}'`,
			);
		}
	}
	const delta = performance.now() - start;
	console.log(`took ${delta}, ${delta / queries} per query`);
};

export const initialize_database = async () => {
	await set_remote();
	await set_local();
};