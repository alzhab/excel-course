class Dom {
	constructor(selector) {
		this.$el = typeof selector === 'string'
			? document.querySelector(selector)
			: selector;
	}

	html(html = '') {
		if (typeof html === 'string') {
			this.$el.innerHTML = html;
			return this
		} else {
			return this.$el.outerHTML.trim()
		}
	}

	text(text) {
		if (typeof text === 'string') {
			this.$el.textContent = text
			return this
		}

		if (this.$el.tagName.toLowerCase() === 'input') {
			return this.$el.value.trim()
		} else {
			return this.$el.textContent.trim()
		}
	}

	clear() {
		this.html('')
		return this
	}

	on(eventType, callback) {
		this.$el.addEventListener(eventType, callback)
	}

	off(eventType, callback) {
		this.$el.removeEventListener(eventType, callback)
	}

	id(parse) {
		if (parse) {
			const parsed = this.id().split(':')
			return {
				row: +parsed[0],
				col: +parsed[1]
			}
		}

		return this.data.id
	}

	find(selector) {
		return $(this.$el.querySelector(selector))
	}

	append(node) {
		if (node instanceof Dom) {
			node = node.$el
		}

		if (Element.prototype.append) {
			this.$el.append(node)
		} else {
			this.$el.appendChild(node)
		}
		return this
	}

	closest(selector) {
		return $(this.$el.closest(selector))
	}

	getCoords() {
		return this.$el.getBoundingClientRect()
	}

	get data() {
		return this.$el.dataset
	}

	findAll(selector) {
		return this.$el.querySelectorAll(selector)
	}

	css(styles = {}) {
		for (const key in styles) {
			if (styles.hasOwnProperty(key)) {
				this.$el.style[key] = styles[key]
			}
		}
	}

	addClass(cl) {
		this.$el.classList.add(cl)
		return this
	}

	removeClass(cl) {
		this.$el.classList.remove(cl)
		return this
	}

	focus() {
		this.$el.focus();
		return this
	}
}

export function $(selector) {
	return new Dom(selector);
}

$.create = (tagname, classes = '') => {
	const el = document.createElement(tagname);
	if (classes) {
		el.classList = classes;
	}
	return $(el);
};


export function nextSelection(key, {row, col}, MAX_ROW_VALUE) {
	const MIN_VALUE = 0;
	const MAX_COL_VALUE = 25;
	switch (key) {
	case 'Enter':
	case 'ArrowDown':
		row = row + 1 > MAX_ROW_VALUE ? 0 : row + 1
		break;
	case 	'Tab':
		col = col + 1 > MAX_COL_VALUE ? 0 : col + 1
		break;
	case 'ArrowUp':
		row = row - 1 < MIN_VALUE ? MIN_VALUE : row - 1
		break;
	}

	return `[data-id="${row}:${col}"]`
}


