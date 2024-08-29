

export class FavoriteState {
  public userFavorites: number[] = [];
}

export enum FavoriteActionType {
  getUserFavorites = 'getUserFavorites',
  //addToFavorites = 'addToFavorites',
  //deleteFavorite = 'deleteFavorite',
}

export interface FavoriteAction {
  type: FavoriteActionType;
  payload?: any;
}

export function getFavoritesAction(favorites: number[]): FavoriteAction {
  return { type: FavoriteActionType.getUserFavorites, payload: favorites };
}

export function FavoriteReducer(
  currentState: FavoriteState = new FavoriteState(),
  action: FavoriteAction
): FavoriteState {
  const newState = { ...currentState };

  switch (action.type) {
    case FavoriteActionType.getUserFavorites:
      newState.userFavorites = action.payload;
      break;
  }
  return newState;
}