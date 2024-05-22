import { createReducer } from '@reduxjs/toolkit';
import { Point } from '../../types/types';
import { changeSelectedPoint } from '../action';

type MapStateType = {
    selectedPoint: Point|undefined;
  }

const initialMapState: MapStateType = {
  selectedPoint: undefined,
};

export const mapReducer = createReducer(initialMapState,(builder) => {
  builder
    .addCase(changeSelectedPoint, (state, action) => {
      state.selectedPoint = action.payload;
    });
});
