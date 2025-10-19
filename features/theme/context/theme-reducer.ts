import { ThemeAction, ThemeState } from '../types';

export function themeReducer(state: ThemeState, action: ThemeAction): ThemeState {
  switch (action.type) {
    case 'SET_COLOR_SCHEME': {
      const newColorScheme = action.payload;
      const resolvedColorScheme = newColorScheme === 'auto' ? state.systemScheme : newColorScheme;
      return {
        ...state,
        colorScheme: newColorScheme,
        resolvedColorScheme,
      };
    }

    case 'SET_SYSTEM_SCHEME': {
      const newSystemScheme = action.payload;
      const resolvedColorScheme =
        state.colorScheme === 'auto' ? newSystemScheme : state.resolvedColorScheme;
      return {
        ...state,
        systemScheme: newSystemScheme,
        resolvedColorScheme,
      };
    }

    case 'TOGGLE_THEME': {
      const currentResolved = state.colorScheme === 'auto' ? state.systemScheme : state.colorScheme;
      const newScheme: 'light' | 'dark' = currentResolved === 'dark' ? 'light' : 'dark';
      return {
        ...state,
        colorScheme: newScheme,
        resolvedColorScheme: newScheme,
      };
    }

    default:
      return state;
  }
}
