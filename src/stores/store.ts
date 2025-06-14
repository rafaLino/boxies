import { addBox, deleteBox, getBoxes, setLayout, updateBox } from '@/lib/api';
import { TBox } from '@/types/box.type';
import { effect, Effect, Query, query } from 'leo-query';
import { createStore } from 'zustand';

export interface BoxState {
    boxDialogOpen?: boolean;
    setBoxDialogOpen: (open: boolean, id?: string) => void;
    commandMenuOpen?: boolean;
    setCommandMenuOpen: (open: boolean) => void;
    selectedBoxId?: string;
    boxes: Query<BoxState, TBox[]>;
    addBox: Effect<BoxState, [box: TBox]>;
    removeBox: Effect<BoxState, [id: string]>;
    updateBox: Effect<BoxState, [box: TBox]>;
    setLayout: Effect<BoxState, [layout: ReactGridLayout.Layout[]]>;
}

interface ServerSideData {
    boxes: TBox[];
}

export const createBoxStore = (initialValue: ServerSideData) => {
    return createStore<BoxState>()((set) => ({
        boxDialogOpen: false,
        selectedBoxId: undefined,
        setBoxDialogOpen: (open, id?: string) => set({ boxDialogOpen: open, selectedBoxId: id }),
        commandMenuOpen: false,
        setCommandMenuOpen: (open) => set({ commandMenuOpen: open }),
        addBox: effect(addBox),
        removeBox: effect(deleteBox),
        updateBox: effect(updateBox),
        setLayout: effect(setLayout),
        boxes: query(getBoxes, s => [s.addBox, s.updateBox, s.removeBox], {
            initialValue: initialValue.boxes,
        }),
    }))
}

