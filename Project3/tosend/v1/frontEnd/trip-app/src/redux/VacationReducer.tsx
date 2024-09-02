import { Vacation } from '../Components/Models/Vacation';

export class VacationState {
  public allVacations: Vacation[] = [];
}

export enum VacationActionType {
  getAllVacations = 'getAllVacations',
  addNewVacation = 'addNewVacation',
  //deleteVacation = "deleteVacation",
  updateVacation = 'updateVacation',
}

export interface VacationAction {
  type: VacationActionType;
  payload?: any;
}

export function gelAllVacationsAction(vacations: Vacation[]): VacationAction {
  return { type: VacationActionType.getAllVacations, payload: vacations };
}

export function addNewVacationFunction(newVacation: Vacation): VacationAction {
  return { type: VacationActionType.addNewVacation, payload: newVacation };
}

export function updateVacationFunction(
  updateVacation: Vacation
): VacationAction {
  return { type: VacationActionType.updateVacation, payload: updateVacation };
}

export function VacationReducer(
  currentState: VacationState = new VacationState(),
  action: VacationAction
): VacationState {
  const newState = { ...currentState };

  switch (action.type) {
    case VacationActionType.getAllVacations:
      newState.allVacations =  action.payload;
      break;
    case VacationActionType.addNewVacation:
      newState.allVacations = [...newState.allVacations, action.payload];
      break;
    case VacationActionType.updateVacation:
      newState.allVacations = [...newState.allVacations, action.payload];
      break;
  }
  return newState;
}
// case CategoriesActionType.updateCategory:
