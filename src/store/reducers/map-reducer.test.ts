import { describe, it, expect } from 'vitest';
import { changeSelectedPoint } from '../action';
import { mapReducer } from './map-reducer';
import { Point } from '../../types/types';

describe('mapReducer', () => {
  it('должен вернуть начальное состояние', () => {
    const initialState = {
      selectedPoint: undefined,
    };
    expect(mapReducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  it('должен обработать changeSelectedPoint', () => {
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