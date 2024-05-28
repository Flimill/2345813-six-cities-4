import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import SortingOptions from './sorting-options';
import { changeSortingOption } from '../../store/action';

const mockStore = configureMockStore([]);

describe('SortingOptions', () => {
  it('should toggle options dropdown when clicking on caption', () => {
    render(
      <Provider store={mockStore({ mainPage: { sortingOption: 'Option 1' } })}>
        <SortingOptions />
      </Provider>
    );

    const dropdown = screen.getByRole('list');
    expect(dropdown).toHaveClass('places__options--closed');

    fireEvent.click(screen.getByText('Sort by'));

    expect(dropdown).toHaveClass('places__options--opened');

    fireEvent.click(screen.getByText('Sort by'));

    expect(dropdown).toHaveClass('places__options--closed');
  });


  it('should dispatch changeSortingOption action when an option is selected', () => {
    const store = mockStore({ mainPage: { sortingOption: 'Option 1' } });

    render(
      <Provider store={store}>
        <SortingOptions />
      </Provider>
    );

    fireEvent.click(screen.getByText('Sort by'));
    fireEvent.click(screen.getByText('Popular'));

    expect(store.getActions()).toEqual([changeSortingOption('Popular')]);
  });


  it('should display the selected option', () => {
    render(
      <Provider store={mockStore({ mainPage: { sortingOption: 'Option 1' } })}>
        <SortingOptions />
      </Provider>
    );

    expect(screen.getByText('Option 1')).toBeInTheDocument();
  });

  it('should display the active option', () => {
    render(
      <Provider store={mockStore({ mainPage: { sortingOption: 'Option 1' } })}>
        <SortingOptions />
      </Provider>
    );

    expect(screen.getByText('Option 1')).toBeInTheDocument();
  });


});
