import firebase from 'firebase/app'
const firebaseConfig = {
    apiKey: "AIzaSyBttFvZGWPKauXbna8mLT0lX4grJp3I948",
    authDomain: "clocker-work-0.firebaseapp.com",
    projectId: "clocker-work-0",
    storageBucket: "clocker-work-0.appspot.com",
    messagingSenderId: "593838061521",
    appId: "1:593838061521:web:ad90d4243430fac5d712f0",
    measurementId: "G-DEBRD17HQV"
};
  
export default firebase.apps.length
    ? firebase.app()
    : firebase.initializeApp(firebaseConfig);
