import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';

import App from '../App';

describe('App Snapshot', () => {
  jest.useFakeTimers();

  it('renders the loading screen', async () => {
    const tree = renderer.create(<App />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
