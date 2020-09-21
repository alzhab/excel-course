export function parse(value = '') {
	if (value.startsWith('=')) {
		try {
			return value
		} catch (e) {
			return value
		}
	}
	return value
}

