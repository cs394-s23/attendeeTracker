import {describe, expect, test} from 'vitest';
import {fireEvent, render, screen} from '@testing-library/react';
import App from './App';

describe('onsite home page test', () => {
    
  test("Home should list events", () => {
    render(<App />);
    expect(screen.getByText('Events')).toBeDefined();
  });

});