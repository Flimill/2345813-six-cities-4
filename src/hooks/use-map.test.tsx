import { render } from '@testing-library/react';
import useMap from './use-map';
import { City } from '../types/types';

describe('useMap hook', () => {
  it('should return null initially', () => {
    const mapRef: { current: HTMLElement | null } = { current: null };
    const city: City = {
      name: 'A',
      location: { latitude: 40.7128, longitude: -74.006, zoom: 10 }
    };

    const Component = () => {
      const map = useMap(mapRef, city);
      return <div>{map ? 'Map rendered' : 'Map not rendered'}</div>;
    };

    const { getByText } = render(<Component />);
    expect(getByText('Map not rendered')).toBeInTheDocument();
  });

  it('should render map after initialization', () => {
    const mapRef: { current: HTMLElement | null } = { current: document.createElement('div') };
    const city: City = {
      name: 'B',
      location: { latitude: 40.7128, longitude: -74.006, zoom: 10 }
    };

    const Component = () => {
      const map = useMap(mapRef, city);
      return <div>{map ? 'Map rendered' : 'Map not rendered'}</div>;
    };

    const { getByText } = render(<Component />);
    expect(getByText('Map rendered')).toBeInTheDocument();
  });

  it('should not render map if mapRef is null', () => {
    const mapRef: { current: HTMLElement | null } = { current: null };
    const city: City = {
      name: 'C',
      location: { latitude: 40.7128, longitude: -74.006, zoom: 10 }
    };

    const Component = () => {
      const map = useMap(mapRef, city);
      return <div>{map ? 'Map rendered' : 'Map not rendered'}</div>;
    };

    const { getByText } = render(<Component />);
    expect(getByText('Map not rendered')).toBeInTheDocument();
  });
});
