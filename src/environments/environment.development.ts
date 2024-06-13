export const environment = {
    baseUrl: "http://localhost:8080/api/v1",
    auth:  
        { 
        register: "/auth/register",
        authenticate: "/auth/authenticate"  
        },
    users:
        {
        personal: "/users/personal"
        },
    production: false,
    apiUrl: 'http://localhost:3000',
    firebase: {
        apiKey: "AIzaSyCQnOZNY5CGYmev597w2Mq3P3RmzjonTTw",
        authDomain: "tuquoque-f8720.firebaseapp.com",
        projectId: "tuquoque-f8720",
        storageBucket: "tuquoque-f8720.appspot.com",
        messagingSenderId: "182924398900",
        appId: "1:182924398900:web:a142f274ab0a344bae5561"
        }
};
