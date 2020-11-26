/* eslint-disable no-undef */
import React from 'react';
import {render} from '@testing-library/react';
import {Provider} from 'react-redux';
import App from './App';
import store from './store';

console.error = jest.fn();

test('renders login test', () => {
  const {getByText} = render(
    <Provider store={store}>
      <App />
    </Provider>
  );
  const linkElement = getByText(/Loading/);
  expect(linkElement).toBeInTheDocument();
});
