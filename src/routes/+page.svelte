<script lang="ts">
	import {
		CURRENT_YEAR,
		format_money_input,
		format_result_output,
		get_all_prices,
		is_car_value_enough,
		years_from_3_to_6,
	} from '$lib/utils'

	let selected_year: string
	let car_value = ''
	let dkbs: 'r678' | 'r3678' = 'r3678'

	$: car_value = format_money_input(car_value)
	$: is_price_ok = is_car_value_enough(car_value)
	$: all_prices = get_all_prices(car_value, selected_year, dkbs)
	$: normal_price = all_prices && format_result_output(all_prices.normal_price)
	$: discount_value = all_prices && format_result_output(all_prices.discount_value)
	$: client_price = all_prices && format_result_output(all_prices.client_price)
</script>

<div class="fixed flex w-full gap-4 bg-slate-500 p-3 text-white">
	<div class="flex items-center justify-center">
		<img
			src="./pvilogo.jpg"
			alt="" />
	</div>
	<p class="flex flex-col">
		<span class="text-lg font-bold">
			TỔNG CÔNG TY BẢO HIỂM PVI - CÔNG TY BẢO HIỂM PVI GIA ĐỊNH
		</span>
		<span class="text-base"
			>Tầng 3 cao ốc Yoco - 41 Nguuyễn Thị Minh Khai, P. Bến Nghé, Q.1, Tp. HCM</span>
	</p>
</div>
<div class="grid h-screen w-screen place-content-center bg-slate-500">
	<div class="flex flex-col gap-3 rounded-lg border border-white p-4 text-white">
		<h1 class="text-center text-2xl font-bold text-orange-400">TÍNH PHÍ XE PVI</h1>

		<section class="flex justify-between gap-2">
			<p>Giá trị xe:</p>
			<input
				bind:value={car_value}
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
				<p class="py-2 text-center font-bold">Điều Khoản Bổ Sung</p>
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
		{#if !is_price_ok}
			<span class="flex justify-between">
				<p>Giá xe tối thiểu :</p>
				<p class="h-8 text-center font-bold text-orange-400">700,000,000 VNĐ</p>
			</span>
		{:else}
			<div class="flex flex-col gap-1">
				<span class="flex justify-between">
					<p>Phí thường:</p>
					<p class="text-center text-orange-200">{normal_price}</p>
				</span>
				<span class="flex justify-between">
					<p>Giảm cho đại lý:</p>
					<p class="text-center text-orange-200">{discount_value}</p>
				</span>
				<span class="flex justify-between">
					<p>Phí thanh toán:</p>
					<p class="text-center font-bold text-orange-400">{client_price}</p>
				</span>
			</div>
		{/if}
	</div>
	<div class="relative flex w-full justify-center">
		<p class="absolute pt-4 text-center text-white sm:w-max">
			LIÊN HỆ TƯ VẤN: 0916 117 735 - 0961 655 959 (zalo/viber)
		</p>
	</div>
</div>
