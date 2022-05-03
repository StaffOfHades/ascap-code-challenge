import { describe, expect, it } from 'vitest';
import { cleanup, render, screen } from '@testing-library/vue';

import MembershipCard from '../MembershipCard.vue';

describe('MembershipCard', () => {
  it('renders properly', () => {
    const props = {
      description: 'Select your membership type below:',
      fee: 12,
      icon: 'icon',
      requirements: ['SSN'],
      title: 'Writer & Publisher',
    };
    render(MembershipCard, { props });
    expect(screen.getByText(props.description)).toBeDefined();
    expect(screen.getByText(props.title)).toBeDefined();
    expect(screen.getByText(`$${props.fee} APPLICATION FEE`)).toBeDefined();
    expect(screen.getByText(props.requirements[0])).toBeDefined();
    cleanup();
  });
});
