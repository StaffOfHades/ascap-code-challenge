import { afterEach, describe, expect, it } from 'vitest';
import { cleanup, fireEvent, render, screen } from '@testing-library/vue';

import App from '../App.vue';

describe('App', () => {
  afterEach(() => {
    cleanup();
  });
  it('renders properly', () => {
    render(App);
    expect(screen.getByText('Membership')).toBeDefined();
    expect(
      screen.getByText('Select your membership type below:'),
    ).toBeDefined();
    expect(screen.getByText('Writer & Publisher')).toBeDefined();
    expect(screen.getByText('Continue')).toBeDefined();
  });
  it('shows errors when continue button is clicked but no membership was selected', async () => {
    render(App);
    expect(
      screen.queryByText('Please select your membership type.'),
    ).toBeNull();
    await fireEvent.click(screen.getByText('Continue'));
    expect(
      screen.queryByText('Please select your membership type.'),
    ).toBeDefined();
  });
  describe('when a membership includes publisher', () => {
    it('shows error when continue button is clicked but no publisher was selected', async () => {
      render(App);
      await fireEvent.click(screen.getByText('Writer & Publisher'));
      expect(
        screen.queryByText('Please select your publisher company type.'),
      ).toBeNull();
      expect(screen.getByLabelText('Publisher Company Type')).toBeDefined();
      await fireEvent.click(screen.getByText('Continue'));
      expect(
        screen.queryByText('Please select your publisher company type.'),
      ).toBeDefined();
    });
    it('shows success message when continue button is clicked after selecting membership and publisher', async () => {
      render(App);
      expect(
        screen.queryByText(
          'Success! A member type of "Writer & Publisher" was selected. Since you are a publisher, you have declared its of type "Partnership".',
        ),
      ).toBeNull();
      await fireEvent.click(screen.getByText('Publisher'));
      await fireEvent.update(
        screen.getByLabelText('Publisher Company Type'),
        'Partnership',
      );
      await fireEvent.click(screen.getByText('Continue'));
      expect(
        screen.queryByText(
          'Success! A member type of "Writer & Publisher" was selected. Since you are a publisher, you have declared its of type "Partnership".',
        ),
      ).toBeDefined();
    });
  });
  describe('when a membership is just a writer', () => {
    it('shows success message when continue button is clicked after selecting membership', async () => {
      render(App);
      expect(
        screen.queryByText('Success! A member type of "Writer" was selected.'),
      ).toBeNull();
      await fireEvent.click(screen.getByText('Writer'));
      await fireEvent.click(screen.getByText('Continue'));
      expect(
        screen.queryByText('Success! A member type of "Writer" was selected.'),
      ).toBeDefined();
    });
  });
});
