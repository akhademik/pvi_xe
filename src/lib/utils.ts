const current_date = new Date()
export const CURRENT_YEAR = current_date.getFullYear()

const rate = {
	above_1b: {
		up_to_3: { r678: 0.99, r3678: 0.99 },
		from_3_to_6: { r678: 1.1, r3678: 1.1 },
	},
	from_7m_to_1b: {
		up_to_3: { r678: 1.11, r3678: 1.24 },
		from_3_to_6: { r678: 1.3, r3678: 1.43 },
	},
}

export const years_from_3_to_6 = () => {
	const _result = []
	for (let i = 0; i < 6; i++) {
		_result.unshift(CURRENT_YEAR - i)
	}
	return _result
}

const years_up_to_3 = () => {
	return years_from_3_to_6().splice(3)
}

export const format_money_input = (input: string) => {
	input = input
		.replace(/\D/g, '') // remove all non-digit
		.replace(/^0+/, '') // remove leading zero
		.replace(/\B(?=(\d{3})+(?!\d))/g, ',') // insert ',' every 3 digits for thousand separators
	return input
}

export const get_quotation = (price: string, year: string, dkbs: 'r678' | 'r3678') => {
	const _price = parseInt(price.replaceAll(',', ''))

	if (_price < 700000000) return 'Gía trị xe thấp nhất 700tr'

	const _above_1b = _price > 1000000000
	const _up_to_3year = years_up_to_3().includes(parseInt(year))

	const _rate = _above_1b ? rate.above_1b : rate.from_7m_to_1b
	const _period = _up_to_3year ? 'up_to_3' : 'from_3_to_6'

	const _result = Math.round((_price * _rate[_period][dkbs]) / 100)

	return isNaN(_result) ? '' : `${'Phí : ' + format_money_input(_result.toString()) + ' vnđ'}`
}
