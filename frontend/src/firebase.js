import React, { useState, useEffect, createContext, useContext } from "react";
import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged, sendEmailVerification, verifyBeforeUpdateEmail, updateProfile, getIdToken } from 'firebase/auth';
import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage';
import axios from './axios';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: "semesterproject-14bba.firebaseapp.com",
  projectId: "semesterproject-14bba",
  storageBucket: "semesterproject-14bba.appspot.com",
  messagingSenderId: "913956988816",
  appId: "1:913956988816:web:a69ebec0173899cfa6b515",
  measurementId: "G-KRJK9X0XTL"
}; 

const FirebaseContext = createContext(null);
export const useFirebase = () => useContext(FirebaseContext);

const firebaseApp = initializeApp(firebaseConfig);
const firebaseAuth = getAuth(firebaseApp);
const storage = getStorage(firebaseApp);

export const FirebaseProvider = (props) => {
    const [user, setUser] = useState(null);
    const [admin, setadmin] = useState(false);
    const [token, setToken] = useState('');

    async function upload(file, user, setLoading) {
        const fileRef = ref(storage, user.uid + '.jpeg');
        setLoading(true);
        await uploadBytes(fileRef, file);
        const photoURL = await getDownloadURL(fileRef);
        await updateProfile(user, { photoURL });
        setLoading(false);
    }

    async function verifyEmail(user, setEditEmail) {
        const res = await sendEmailVerification(user, {
            url: "http://localhost:3000/profile"
        });
        console.log(res);
    }

    async function updateProfileWithVerification(email, user, displayName, setLoading, setError) {
        setLoading(true);
        await updateProfile(user, { displayName });
        if (email !== user.email) {
            verifyBeforeUpdateEmail(user, email, {
                url: "http://localhost:3000/profile"
            })
                .then(() => {
                    window.alert("Verification sent to provided email.");
                })
                .catch((err) => {
                    window.alert(err);
                })
        }
        setLoading(false);
    }

    useEffect(() => {
        onAuthStateChanged(firebaseAuth, async (currentUser) => {
            if (currentUser) {
                const token=await getIdToken(currentUser)
                setToken(token)
                if (currentUser.email === process.env.REACT_APP_ADMIN_EMAIL) {
                    setadmin(true);
                }
                setUser(currentUser);
                   if(currentUser.email!==process.env.REACT_APP_ADMIN_EMAIL){
                await axios.get("/users/updateTrips",{
                headers:{
                    'Content-Type':'application/json'
                },
                    withCredentials:true
                })
            }
            } else {
                setadmin(false);
                setUser(0); // Changed from 0 to null
            }
        });
    }, []);

    useEffect(() => {
        if (token) {
            axios.post('/gettoken', {}, {
                headers: {
                    'Authorization': 'Bearer ' + token
                }
            })
                .then((res) => {
                    console.log("Normal user");
                })
        }
    }, [token]);

    return (
        <FirebaseContext.Provider
            value={{
                useFirebase,
                user,
                setUser,
                firebaseAuth,
                upload,
                updateProfileWithVerification,
                verifyEmail,
                admin,
                setadmin,
                token
            }}
        >
            {props.children}
        </FirebaseContext.Provider>
    );
}

export default FirebaseContext;
