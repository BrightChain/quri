//FileName : quri.ts
/// <reference types="node" />
'use strict';
import { firebaseConfig } from './firebaseConfig';
import { initializeApp, FirebaseApp } from 'firebase/app';
import { IQuriApp } from './interfaces';
import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

declare global {
  interface Window {
    quri: IQuriApp;
    firebase: {
      apps: [FirebaseApp];
    };
  }
}

const _quri: IQuriApp = {
  firebaseApp:
    window.firebase !== undefined &&
    window.firebase.apps !== undefined &&
    window.firebase.apps.length > 0 &&
    window.firebase.apps[0] !== undefined &&
    window.firebase.apps[0] !== null
      ? window.firebase.apps[0]
      : null,
  firebaseHosting:
    window.firebase !== undefined &&
    window.firebase.apps !== undefined &&
    window.firebase.apps.length > 0 &&
    window.firebase.apps[0] !== undefined &&
    window.firebase.apps[0] !== null,
  config: firebaseConfig,
  onLoad: function () {
    const loadEl = document.querySelector('#load');
    if (loadEl === null) {
      console.error('unable to find #load');
      return;
    }
    // // 🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥
    // // The Firebase SDK is initialized and available here!
    //
    // firebase.auth().onAuthStateChanged(user => { });
    // firebase.database().ref('/path/to/ref').on('value', snapshot => { });
    // firebase.firestore().doc('/foo/bar').get().then(() => { });
    // firebase.functions().httpsCallable('yourFunction')().then(() => { });
    // firebase.messaging().requestPermission().then(() => { });
    // firebase.storage().ref('/path/to/ref').getDownloadURL().then(() => { });
    // firebase.analytics(); // call to activate
    // firebase.analytics().logEvent('tutorial_completed');
    // firebase.performance(); // call to activate
    //
    // // 🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥
    const allFeatures: Array<string> = [
      'auth',
      'database',
      'firestore',
      'functions',
      'messaging',
      'storage',
      'analytics',
      'remoteConfig',
      'performance',
    ];
    try {
      if (_quri.firebaseApp === null || _quri.firebaseApp === undefined) {
        _quri.firebaseApp = initializeApp(firebaseConfig);
      }
      const features: Array<string> = [];
      for (let x = 0; x < allFeatures.length; x++) {
        const feature = allFeatures[x];
        if (typeof _quri.firebaseApp[feature] === 'function') {
          features.push(feature);
        }
      }
      loadEl.textContent = `Firebase SDK loaded with ${features.join(', ')}`;
    } catch (e) {
      console.error(e);
      loadEl.textContent = 'Error loading the Firebase SDK, check the console.';
    }
  },
};
window.quri = window.quri || _quri;

document.addEventListener('DOMContentLoaded', window.quri.onLoad);

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .catch((err) => console.error(err));

export default { quri: _quri };
