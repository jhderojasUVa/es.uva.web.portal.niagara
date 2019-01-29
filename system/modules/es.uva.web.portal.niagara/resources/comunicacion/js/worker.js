'use strict';
/**
 * Comprobamos si el navefador soporta Workers y Push
 * Si lo soporta registramos el archivo sw.js
 */
if ('serviceWorker' in navigator ) {
  navigator.serviceWorker.register('/sw.js')
  .then(function(swReg) {
    console.log('Service Worker is registered', swReg);
    let swRegistration = swReg;
    swRegistration.update();
    //swRegistration.sync.register('comunicacionSync');
  })
  .catch(function(error) {
    console.error('Service Worker Error', error);
  });

} else {
  console.warn('Push messaging is not supported');
  //pushButton.textContent = 'Push Not Supported';
}

if ('serviceWorker' in navigator && 'SyncManager' in window) {
  navigator.serviceWorker.ready.then(function(reg) {
    return reg.sync.register('tag-name');
  }).catch(function() {
    // system was unable to register for a sync,
    // this could be an OS-level restriction
    //postDataFromThePage();
  });
} else {
  // serviceworker/sync not supported
  //postDataFromThePage();
}