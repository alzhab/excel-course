import {storage} from '@core/utils'

function toHTML(key) {
	const store = storage(key)
	return `
    <li class="db__record"> 
      <a href="#${key.replace(':', '/')}">${store.title}</a>
      <strong>
				${new Date(store.openedDate).toLocaleDateString()}
				${new Date(store.openedDate).toLocaleTimeString()}
			</strong>
    </li>
  `
}

function getAllKeys() {
	const keys = []
	for (let i = 0; i < localStorage.length; i++) {
		const key = localStorage.key(i)
		if (!key.includes('excel')) {
			continue
		}
		keys.push(key)
	}
	return keys
}

export function createRecordsTable() {
	const keys = getAllKeys()

	if (!keys.length) {
		return `<p>Вы пока не создали ни одной таблицы</p>`
	}

	return `
    <div class="db__list-header">
      <span>Название</span>
      <span>Дата открытия</span>
    </div>

    <ul class="db__list">
      ${keys.map(toHTML).join('')}
    </ul>
  `
}

