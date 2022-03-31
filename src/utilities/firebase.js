import { initializeApp } from 'firebase/app';
import { getDatabase, onValue, ref, set } from 'firebase/database';
import { useState, useEffect } from 'react';

const firebaseConfig = {
    apiKey: "AIzaSyADpPA71BLb2gkZ76Xu-KBnwqJtBm1FOC8",
    authDomain: "scheduler-73336.firebaseapp.com",
    databaseURL: "https://scheduler-73336-default-rtdb.firebaseio.com",
    projectId: "scheduler-73336",
    storageBucket: "scheduler-73336.appspot.com",
    messagingSenderId: "704951362320",
    appId: "1:704951362320:web:053d6fdb77f78ee2667b95",
    measurementId: "G-YVVMVHEDP6"
};

const firebase = initializeApp(firebaseConfig);
const database = getDatabase(firebase);

export const useData = (path, transform) => {
    const [data, setData] = useState();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState();
  
    useEffect(() => {
      const dbRef = ref(database, path);
      const devMode = !process.env.NODE_ENV || process.env.NODE_ENV === 'development';
      if (devMode) { console.log(`loading ${path}`); }
      return onValue(dbRef, (snapshot) => {
        const val = snapshot.val();
        if (devMode) { console.log(val); }
        setData(transform ? transform(val) : val);
        setLoading(false);
        setError(null);
      }, (error) => {
        setData(null);
        setLoading(false);
        setError(error);
      });
    }, [path, transform]);
  
    return [data, loading, error];
};