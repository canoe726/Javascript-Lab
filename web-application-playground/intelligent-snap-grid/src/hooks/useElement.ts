import { produce } from "immer";
import { useReducer } from "react";
import { PayloadTemplate, Position } from "../interface/common.type";

export interface ElementState {
  position: Position;
  isSelected: boolean;
}

export interface ElementMeta {
  id: string;
  className: string;
  state: ElementState;
}

type ElementActionType = "UPDATE_POSITION" | "UPDATE_IS_SELECTED";

interface ElementActionPayload {
  UPDATE_POSITION: Position;
  UPDATE_IS_SELECTED: boolean;
}

interface ActionType {
  type: ElementActionType;
  payload: PayloadTemplate<ElementActionPayload[ElementActionType]>;
}

function reducer(state: ElementMeta[], { type, payload }: ActionType) {
  const { id, data } = payload;
  const index = state.findIndex((item) => item.id === id);

  switch (type) {
    case "UPDATE_POSITION":
      return produce(state, (draft) => {
        draft[index].state.position = data as Position;
      });
    case "UPDATE_IS_SELECTED":
      return produce(state, (draft) => {
        draft[index].state.isSelected = data as boolean;
      });
    default:
      return state;
  }
}

const useElement = () => {
  const initialElementList: ElementMeta[] = [
    {
      id: "rectangle-1",
      className: "w-[10rem] h-[10rem] bg-blue-300",
      state: {
        position: { x: 0, y: 0 },
        isSelected: false,
      },
    },
    {
      id: "rectangle-2",
      className: "w-[5rem] h-[8rem] bg-yellow-300",
      state: {
        position: { x: 500, y: 120 },
        isSelected: false,
      },
    },
  ];

  const [state, dispatch] = useReducer(reducer, initialElementList);

  return {
    elementList: state,
    dispatchElementList: dispatch,
  };
};

export default useElement;
