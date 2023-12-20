import { env } from '$env/dynamic/private';
import fs from 'fs';
import path from 'path';

const { DB_URL } = env;

export const check_db_exists = async () => {
	if (!DB_URL || !DB_URL.startsWith('file:')) {
		throw new Error(
			'DB_URL is not correctly defined or is not a local file path.',
		);
	}

	// Strip 'file:' and then resolve the path relative to the current working directory
	const relativePath = DB_URL.substring(5); // Remove 'file:' prefix
	const local_db_path = path.resolve(process.cwd(), relativePath);

	const exists = fs.existsSync(local_db_path);

	return exists;
};
