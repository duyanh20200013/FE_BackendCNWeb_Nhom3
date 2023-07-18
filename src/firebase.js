// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyDvEi9KVHjc7runiltmIe0lGG4HgDFrKss',
  authDomain: 'airbnb-images-53fdf.firebaseapp.com',
  projectId: 'airbnb-images-53fdf',
  storageBucket: 'airbnb-images-53fdf.appspot.com',
  messagingSenderId: '142090623991',
  appId: '1:142090623991:web:991d715a12754d77f2acf2',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Storage and get a reference to the service
export const storage = getStorage(app);
