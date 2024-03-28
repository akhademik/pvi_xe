const current_date = new Date()
export const CURRENT_YEAR = current_date.getFullYear()

const VAL_1B = 1000000000
const VAL_900M = 900000000
const VAL_700M = 700000000

const PVI_RATE = {
	above_1b: {
		up_to_3: { r678: 0.99, r3678: 0.99 },
		from_3_to_6: { r678: 1.1, r3678: 1.1 },
		discount: {
			up_to_3: { r678: 0.135, r3678: 0.135 },
			from_3_to_6: { r678: 0.15, r3678: 0.15 },
		},
	},
	from_9m_to_1b: {
		up_to_3: { r678: 1.11, r3678: 1.24 },
		from_3_to_6: { r678: 1.3, r3678: 1.43 },
		discount: {
			up_to_3: { r678: 0.151, r3678: 0.169 },
			from_3_to_6: { r678: 0.177, r3678: 0.195 },
		},
	},
	from_7m_to_9m: {
		up_to_3: { r678: 1.19, r3678: 1.33 },
		from_3_to_6: { r678: 1.4, r3678: 1.54 },
		discount: {
			up_to_3: { r678: 0.162, r3678: 0.181 },
			from_3_to_6: { r678: 0.191, r3678: 0.21 },
		},
	},
}

export const is_car_value_enough = (price: string) => {
	const _price = parseInt(price.replaceAll(',', ''))
	return _price > VAL_700M
}

export const years_from_3_to_6 = () => {
	const result = []
	for (let i = 0; i < 6; i++) {
		result.unshift(CURRENT_YEAR - i)
	}
	return result
}

const get_car_year_range = (year: string) => {
	const up_to_3year = years_from_3_to_6().splice(3)
	return up_to_3year.includes(parseInt(year)) ? 'up_to_3' : 'from_3_to_6'
}

export const format_money_input = (input: string) => {
	input = input
		.replace(/\D/g, '') // remove all non-digit
		.replace(/^0+/, '') // remove leading zero
		.replace(/\B(?=(\d{3})+(?!\d))/g, ',') // insert ',' every 3 digits for thousand separators
	return input
}

const get_value_range = (value: number) => {
	if (value > VAL_1B) {
		return 'above_1b'
	} else if (value >= VAL_900M || value === VAL_1B) {
		return 'from_9m_to_1b'
	} else return 'from_7m_to_9m'
}

export const format_result_output = (money: number) => {
	return `${format_money_input(money.toString()) + ' VNĐ'}`
}

export const get_all_prices = (value: string, year: string, dkbs: 'r678' | 'r3678') => {
	if (!is_car_value_enough(value)) return

	const _value_in_number = parseInt(value.replaceAll(',', ''))
	const _value_range = PVI_RATE[get_value_range(_value_in_number)]
	const _car_year_range = get_car_year_range(year)

	const normal_price = Math.round((_value_in_number * _value_range[_car_year_range][dkbs]) / 100)
	const discount_value = Math.round(
		(_value_in_number * _value_range['discount'][_car_year_range][dkbs]) / 100
	)
	const client_price = normal_price - discount_value

	return { normal_price, discount_value, client_price }
}
