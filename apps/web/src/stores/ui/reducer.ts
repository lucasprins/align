import { UIStoreAction } from './actions'
import { UIStore } from './state'

export function uiStoreReducer(state: UIStore, action: UIStoreAction) {
  switch (action.kind) {
    case 'setLanguage': {
      return state
    }

    case 'setTheme': {
      return state
    }

    case 'setUser': {
      return state
    }
  }
}
