<script lang="ts">
	let { data } = $props();
	let [
		username = 'Scott',
		email = 'test1@test.com',
		title = 'New Title',
		content = 'New Content',
	] = $state('');
</script>

<pre>{JSON.stringify(data, null, 2)}</pre>

<form method="POST" action="?/add_content">
	<input
		id="username"
		name="username"
		type="text"
		bind:value={username}
		placeholder="Username"
	/>
	<input
		id="email"
		name="email"
		type="email"
		bind:value={email}
		placeholder="Email"
	/>
	<input
		id="post_title"
		name="post_title"
		type="text"
		bind:value={title}
		placeholder="Post Title"
	/>
	<textarea
		id="post_content"
		name="post_content"
		bind:value={content}
		placeholder="Post Content"
	/>
	<button type="submit">Submit</button>
</form>
