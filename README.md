# SvelteKit and Turso Embedded Replica example

Me getting my head around using Turso Embedded Replica with SvelteKit.

Instructions for this process I found over on GitHub:
https://github.com/tursodatabase/embedded-replica-examples

## Get started

This is in two parts, first create your database on Turso, shell into
it and create a table. See the
[schema.sql](src/lib/database/schema.sql) file for the table
definition and query to insert some data.

Once the database and tables are set up on Turso, you need to set the
remote first then sync the remote to the local database.

For some reason I found this really tricky to get working, I don't
know why.

### Set the remote

Setting the `DB_URL` as the remote and having the `SYNC_URL` unset.

```bash
export DB_URL=$(turso db show --url sync-example)
unset SYNC_URL
export AUTH_TOKEN=$(turso db tokens create sync-example)
```

Run some queries in the client to coinfirm details from remote are
being returned.

### Set the sync

Do the ol' switcheroo, set the `SYNC_URL` to the remote and `DB_URL`
to the local db.

```bash
export DB_URL="file:local.db"
export SYNC_URL=$(turso db show --url sync-example)
export AUTH_TOKEN=$(turso db tokens create sync-example)
```

### It's in a script!

There's a [`postinstall.ts`](src/lib/database/postinstall.ts) script
that will run the sync, so you shouldn't need to do anything else.
