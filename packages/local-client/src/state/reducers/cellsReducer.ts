import { ActionType } from "../action-types";
import { Action } from "../actions";
import { Cell } from "../cell";
import { produce } from 'immer';

interface CellsState {
    loading: boolean;
    error: string | null;
    order: string[];
    data: {
        [key: string]: Cell;
    }
}

const initialState: CellsState = {
    loading: false,
    error: null,
    order: [],
    data: {}
};

const reducer = produce((
    state: CellsState = initialState,
    action: Action) => {
    switch (action.type) {
        case ActionType.SAVE_CELLS_ERROR:
            state.error = action.payload;
            return state;
            
        case ActionType.FETCH_CELLS:
            state.loading = true;
            state.error = null;
            return state;

        case ActionType.FETCH_CELLS_COMPLETE:
            state.order = action.payload.map(cell => cell.id);
            state.data = action.payload.reduce((acc, cell) => {
                acc[cell.id] = cell;
                return acc;
            }, {} as CellsState['data']);
            return state;

        case ActionType.FETCH_CELLS_ERROR:
            state.loading = false;
            state.error = action.payload;
            return state;

        case ActionType.UPDATE_CELL:
            const { id, content } = action.payload;
            state.data[id].content = content; // use Immer to mutate state
            return state;

        case ActionType.DELETE_CELL:
            delete state.data[action.payload];  // Remove cell from data object
            state.order = state.order.filter(id => id !== action.payload); // Remove cell id from order array
            return state;

        case ActionType.MOVE_CELL:
            const { direction } = action.payload;
            // Find the current index of the cell we want to move
            const index = state.order.findIndex(id => id === action.payload.id);
            // Find the index we want to move the cell to
            const targetIndex = direction === 'up' ? index - 1 : index + 1;
            // Check for boundary conditions
            if (targetIndex < 0 || targetIndex > state.order.length - 1) {
                return state;
            }
            // Now swap the cells
            state.order[index] = state.order[targetIndex];
            state.order[targetIndex] = action.payload.id;
            return state;

        case ActionType.INSERT_CELL_AFTER:
            const { id: afterId } = action.payload;
            const afterCell: Cell = {
                id: randomId(),
                type: action.payload.type,
                content: ''
            }
            state.data[afterCell.id] = afterCell;
            const currentIndex = state.order.findIndex(id => id === afterId);
            if (currentIndex < 0) { // If we didn't find the cell, add it to the end
                state.order.unshift(afterCell.id);
            } else {
                state.order.splice(currentIndex + 1, 0, afterCell.id);
            }
            return state;

        case ActionType.INSERT_CELL_BEFORE:
            const { id: beforeId } = action.payload;
            const cell: Cell = {
                id: randomId(),
                type: action.payload.type,
                content: ''
            }
            state.data[cell.id] = cell;
            const foundIndex = state.order.findIndex(id => id === beforeId);
            if (foundIndex < 0) { // If we didn't find the cell, add it to the end
                state.order.push(cell.id);
            } else {
                console.log("Changed order");
                state.order.splice(foundIndex, 0, cell.id);
            }
            return state;

        default:
            return state;
    }
}, initialState);

// **** Helper Functions
// Generate a random id
const randomId = () => {
    return Math.random().toString(36).slice(2, 7);
};

export default reducer;