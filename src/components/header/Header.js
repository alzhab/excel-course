import {ExcelComponent} from '@core/ExcelComponent'
import {$} from '@core/dom'
import {changeTitle} from '@/redux/actions'
import {defaultTitle} from '@/constants'
import {debounce} from '@core/utils'
import {ActiveRoute} from '@core/routes/ActiveRoute'

export class Header extends ExcelComponent {
	static className = 'excel__header'

	constructor($root, options) {
		super($root, {
			name: 'Header',
			listeners: ['input', 'click'],
			...options,
		})
	}

	prepare() {
		this.onInput = debounce(this.onInput, 300)
	}

	deleteTable() {
		const param = ActiveRoute.param;
		localStorage.removeItem(`excel:${param}`)
	}

	toHTML() {
		const title = this.store.getState().title || defaultTitle
		return `
      <input type="text" class="input" value="${title}" />

      <div>
        <div class="button" data-action="delete">
          <i class="material-icons" data-action="delete">delete</i>
        </div>

        <div class="button" data-action="exit">  
          <i class="material-icons" data-action="exit">exit_to_app</i>
        </div>

      </div>
    `
	}

	onClick(event) {
		const $target = $(event.target);
		if ($target.data.action) {
			switch ($target.data.action) {
			case 'delete':
				// eslint-disable-next-line
				const decision = confirm(`Вы действительно хотите удалить эту таблицу ?`)

				if (decision) {
					localStorage.removeItem(`excel:${ActiveRoute.param}`)
					ActiveRoute.navigate('#')
				}
				break
			case 'exit':
				ActiveRoute.navigate('#')
				break
			}
		}
	}

	onInput(event) {
		const $target = $(event.target)
		this.$dispatch(changeTitle($target.text()))
	}
}
