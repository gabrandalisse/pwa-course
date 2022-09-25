// one method to see if we can use service worker on the nav
// if ('serviceWorker' in navigator) console.log('we can use it');

// another method
if (navigator.serviceWorker) {
    
  // service worker installation
  navigator.serviceWorker.register("/sw.js");
}
