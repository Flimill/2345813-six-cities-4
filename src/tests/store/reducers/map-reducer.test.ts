import { describe, it, expect } from 'vitest';
import { changeSelectedPoint } from '../../../store/action';
import { mapReducer } from '../../../store/reducers/map-reducer';
import { Point } from '../../../types/types';

describe('mapReducer', () => {
  it('should return the initial state', () => {
    const initialState = {
      selectedPoint: undefined,
    };
    expect(mapReducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  it('should handle changeSelectedPoint', () => {
    const initialState = {
      selectedPoint: undefined,
    };
    const selectedPoint: Point = {
      name: 'Point 1',
      location: { latitude: 0, longitude: 0, zoom: 10 }
    };
    const action = changeSelectedPoint(selectedPoint);
    const expectedState = {
      selectedPoint: selectedPoint,
    };
    expect(mapReducer(initialState, action)).toEqual(expectedState);
  });
});
