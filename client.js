// This file contains the boilerplate to execute your React app.
// If you want to modify your application's content, start in "index.js"

import {ReactInstance} from 'react-360-web';
import KeyboardModule from 'react-360-keyboard/KeyboardModule';

function init(bundle, parent, options = {}) {
  const r360 = new ReactInstance(bundle, parent, {
    // Add custom options here
    fullScreen: true,
    // 1.) add the NativeModule to your instance
    nativeModules: [KeyboardModule.addModule],
    ...options,
  });

  // Render your app content to the default cylinder surface
  r360.renderToSurface(
    r360.createRoot('OpenSecureStorage', { /* initial props */ }),
    r360.getDefaultSurface()
  );
  // Load the initial environment
  r360.compositor.setBackground(r360.getAssetURL('360_world.jpg'));
  // 2.) pass the instance to the NativeModule, do this after creating your main
  //     surface to ensure the keyboard is rendered on top of your scene
  KeyboardModule.setInstance(r360);
}

window.React360 = {init};
