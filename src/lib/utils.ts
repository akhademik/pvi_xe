const current_date = new Date()
const CURRENT_YEAR = current_date.getFullYear()

export const years_from_3_to_6 = () => {
	const _result = []
	for (let i = 0; i < 6; i++) {
		_result.unshift(CURRENT_YEAR - i)
	}
	return _result
}

export const years_up_to_3 = () => {
	return years_from_3_to_6().splice(3)
}

export const format_money_input = (input: string) => {
	input = input
		.replace(/\D/g, '') // remove all non-digit
		.replace(/^0+/, '') // remove leading zero
		.replace(/\B(?=(\d{3})+(?!\d))/g, ',') // insert ',' every 3 digits for thousand separators
	return input
}
