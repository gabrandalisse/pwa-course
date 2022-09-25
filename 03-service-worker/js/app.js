// Detect if we can use service worker
if ( navigator.serviceWorker ) {
    navigator.serviceWorker.register('/sw.js').then(reg => {
        
        /*
        This code simulates a request when the user does not have
        internet connection.

        setTimeout(() => {
            reg.sync.register('kitten-post');
            console.log('kitten pictures was sended to the server');
        }, 3000);
        */

        Notification.requestPermission().then(result => {
            console.log('permisson result:', result);
            reg.showNotification('Hello World!');
        });
    });
}

// fetch('https://reqres.in/api/users').then(res => res.text()).then(console.log);