// This file is required by karma.conf.js and loads recursively all the .spec and framework files
// Updated for Angular 20 compatibility

import 'zone.js/testing';
import { getTestBed } from '@angular/core/testing';
import {
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting,
} from '@angular/platform-browser-dynamic/testing';

// First, initialize the Angular testing environment.
getTestBed().initTestEnvironment(BrowserDynamicTestingModule, platformBrowserDynamicTesting());

// Angular 20 compatible way to load test files
// Using import.meta.webpackContext instead of require.context for better compatibility
if ((import.meta as any).webpackContext) {
  // Webpack 5 / Angular 20 approach
  const context = (import.meta as any).webpackContext('./', {
    recursive: true,
    regExp: /\.spec\.ts$/,
  });
  context.keys().forEach(context);
} else {
  // Fallback for environments that still support require.context
  const requireContext = (require as any).context;
  if (requireContext) {
    const context = requireContext('./', true, /\.spec\.ts$/);
    context.keys().forEach(context);
  } else {
    console.warn('No test context loader available. Tests may not be discovered.');
  }
}
