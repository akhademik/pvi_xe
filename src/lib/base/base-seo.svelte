<script lang="ts">
	// use set_seo from seo store to set for title , description and keywords
	// on any page that need to update SEO just set_seo onMount
	import { seo_description, seo_keywords, seo_title } from '$lib/stores/seo-store'

	const base = {
		desc: '',
		keys: ''
	};
</script>

<svelte:head>
	<title>{$seo_title}</title>
	<meta name="description" content={base.desc + ' ' + $seo_description} />
	<meta name="keywords" content={base.keys + ' ' + $seo_keywords} />
	<meta property="og:title" content={$seo_title} />
	<meta property="og:description" content={base.desc + ' ' + $seo_description} />
</svelte:head>
