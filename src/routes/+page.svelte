<script lang="ts">
	import { CURRENT_YEAR, format_money_input, get_quotation, years_from_3_to_6 } from '$lib/utils'

	let selected_year: string
	let price = ''
	let dkbs: 'r678' | 'r3678' = 'r3678'

	$: price = format_money_input(price)
	$: final_quote = get_quotation(price, selected_year, dkbs)
</script>

<div class="grid h-screen w-screen place-content-center bg-slate-500">
	<div class="flex flex-col gap-3 rounded-lg border border-white p-4 text-white">
		<h1 class="text-center text-2xl font-bold text-orange-400">TÍNH PHÍ XE PVI</h1>

		<section class="flex justify-between gap-2">
			<p>Giá trị xe:</p>
			<input
				bind:value={price}
				type="text"
				class="w-36 bg-slate-400 px-2 text-right" />
		</section>
		<section class="flex justify-between gap-2">
			<p>Năm sản xuất:</p>
			<select
				class="w-36 bg-slate-400 px-2 text-right"
				bind:value={selected_year}>
				{#each years_from_3_to_6() as year (year)}
					<option selected={year === CURRENT_YEAR}>{year}</option>
				{/each}
			</select>
		</section>
		<div class="flex flex-col gap-2">
			<section class="flex flex-col">
				<p class="py-2 text-center font-bold">Đăng Ký Bổ Sung</p>
				<p>03: Bảo hiểm mất cắp bộ phận</p>
				<p>06: Không khấu hao phụ tùng, vật tư thay mới</p>
				<p>07: Bảo hiểm lựa chọn cơ sở sửa chữa</p>
				<p>08: Bảo thiệt hại động cơ xe do bị thủy kích</p>
			</section>
			<section class="flex justify-evenly pt-2">
				<div class="flex items-center gap-2">
					<input
						type="radio"
						bind:group={dkbs}
						value="r3678" />
					<p>03, 06, 07, 08</p>
				</div>
				<div class="flex items-center gap-2">
					<input
						type="radio"
						bind:group={dkbs}
						value="r678" />
					<p>06, 07, 08</p>
				</div>
			</section>
		</div>
		<p class="h-8 text-center text-2xl font-bold text-orange-400">{final_quote}</p>
	</div>
</div>
