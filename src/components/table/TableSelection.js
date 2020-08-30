export class TableSelection {
	static name = 'selected'

	constructor() {
		this.group = [];
		this.current = null
	}

	select($el) {
		this.clear()
		$el.focus().addClass(TableSelection.name)
		this.group.push($el)
		this.current = $el
	}

	selectGroup($group = []) {
		this.clear()
		this.group = $group;
		this.group.forEach($el => $el.addClass(TableSelection.name))
	}

	clear() {
		this.group.forEach($el => $el.removeClass(TableSelection.name))
		this.group = []
	}
}

