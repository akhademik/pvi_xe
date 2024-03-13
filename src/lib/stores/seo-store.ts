import { writable } from 'svelte/store'

export const seo_title = writable('PVI Phí xe 2024')
export const seo_description = writable('')
export const seo_keywords = writable('')

export const set_seo = (title: string, description?: string, keywords?: string) => {
	title === 'default' ? seo_title.set('PVI Phí xe 2024') : seo_title.set(title)
	seo_description.set(description || '')
	seo_keywords.set(keywords || '')
}
