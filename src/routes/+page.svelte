<script lang="ts">
	import { format_money_input, years_from_3_to_6, years_up_to_3 } from '$lib/utils'

	let selected_year: string
	let price = ''

	$: price = format_money_input(price)
</script>

<div class="grid h-screen w-screen place-content-center bg-slate-500">
	<div class="flex flex-col gap-3 rounded-lg border border-white p-4 text-white">
		<h1 class="text-center">TÍNH PHÍ XE PVI</h1>
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
					<option>{year}</option>
				{/each}
			</select>
		</section>
		<div class="flex flex-col gap-2">
			<section class="flex flex-col">
				<p>03: Bảo hiểm mất cắp bộ phận</p>
				<p>06: Không khấu hao phụ tùng, vật tư thay mới</p>
				<p>07: Bảo hiểm lựa chọn cơ sở sửa chữa</p>
				<p>08: Bảo thiệt hại động cơ xe do bị thủy kích</p>
			</section>
			<section class="flex justify-evenly">
				<div class="flex items-center gap-2">
					<input
						type="radio"
						id="option1"
						name="options"
						checked />
					<label for="option1">03, 06, 07, 08</label>
				</div>
				<div class="flex items-center gap-2">
					<input
						type="radio"
						id="option2"
						name="options" />
					<label for="option2">06, 07, 08</label>
				</div>
			</section>
		</div>
	</div>
</div>
