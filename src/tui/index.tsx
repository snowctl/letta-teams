/**
 * TUI Dashboard entry point
 */

import React from 'react';
import { render } from 'ink';
import App from './App.js';

/**
 * Launch the TUI dashboard
 */
export function launchTui(): void {
  render(<App />);
}
