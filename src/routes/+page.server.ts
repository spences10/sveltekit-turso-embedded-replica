import turso_client from '$lib/database/client';
import type { Value } from '@libsql/client';
import { error } from '@sveltejs/kit';
import type { Action, Actions } from './$types';

const add_content: Action = async ({ request }) => {
	const form_data = await request.formData();
	const username = form_data.get('username')?.toString() as Value;
	const email = form_data.get('email')?.toString() as Value;
	const post_title = form_data.get('post_title')?.toString() as Value;
	const post_content = form_data
		.get('post_content')
		?.toString() as Value;

	const client = turso_client();

	try {
		// Check if user exists
		const user_check = await client.execute({
			sql: 'SELECT user_id FROM users WHERE email = ?',
			args: [email],
		});

		let user_id: bigint | null = null;

		if (user_check.rows.length === 0) {
			// Insert new user if not exists
			const user_insert = await client.execute({
				sql: 'INSERT INTO users (username, email) VALUES (?, ?)',
				args: [username, email],
			});
			user_id = user_insert.lastInsertRowid as bigint;
		} else {
			user_id = user_check.rows[0].user_id as bigint;
		}

		if (user_id) {
			// Insert a new post
			const post_insert = await client.execute({
				sql: 'INSERT INTO posts (user_id, title, content) VALUES (?, ?, ?)',
				args: [user_id, post_title, post_content],
			});
			const post_id = post_insert.lastInsertRowid as bigint;

			if (post_id) {
				// Insert a new comment
				await client.execute({
					sql: "INSERT INTO comments (post_id, user_id, content) VALUES (?, ?, 'Sample Comment')",
					args: [post_id, user_id],
				});
			}
		}

		await client.sync();
	} catch (err) {
		console.log(`Error: ${err}`);
		throw error(500, 'Something went wrong');
	}
};

export const actions: Actions = { add_content };
