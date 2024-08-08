export class Favorite {
  public idVacation: number;
  constructor(idVacation: number) {
    this.idVacation = idVacation;
  }
}

export class FavoriteState {
  public favorites: Favorite[] = [];
}

export enum FavoriteActionType {
  getUserFavorites = 'getUserFavorites',
  addToFavorites = 'addToFavorites',
  deleteFavorite = 'deleteFavorite',
}

export interface FavoriteAction {
  type: FavoriteActionType;
  payload?: any;
}

export function getFavoritesAction(favorites: Favorite[]): FavoriteAction {
  return { type: FavoriteActionType.getUserFavorites, payload: favorites };
}

export function FavoriteReducer(
  currentState: FavoriteState = new FavoriteState(),
  action: FavoriteAction
): FavoriteState {
  const newState = { ...currentState };

  switch (action.type) {
    case FavoriteActionType.getUserFavorites:
      newState.favorites = action.payload;
      break;
  }
  return newState;
}
