// Import the functions you need from the SDKs you need
import {getFirestore} from 'firebase/firestore';
import 'firebase/firestore';
import * as firebase from "firebase";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDRnND31TO0FT183UXPjf81wSdfYXI3nmc",
  authDomain: "hayat-e4f0c.firebaseapp.com",
  projectId: "hayat-e4f0c",
  storageBucket: "hayat-e4f0c.appspot.com",
  messagingSenderId: "890528001366",
  appId: "1:890528001366:web:248820ae1a20543d357af7",
  measurementId: "G-B189N1XS0S"
};
const api =firebaseConfig.apiKey;
export{api};
//iffirebase has been initialized
if(!firebase.apps.length){
  app=firebase.initializeApp(firebaseConfig);
}else{
  app=firebase.app();
}
// Initialize Firebase
const auth=firebase.auth();
export {auth};
export const firestore =firebase.firestore();

export async function getUserInfo(){
  try {
    let doc = await firestore
      .collection('users')
      .doc(auth.currentUser.uid)
      .get();

    if (!doc.exists){
      alert('No user data found!')
    } else {
      let dataObj = doc.data();
      alert(dataObj.UserName);
    }
  } catch (err){
  alert('There is an error.', err.message)
  }
}
export const CreateUserDocument =async (user ,UserName,phoneno,city)=>{
  if(!user) return;
  const userRef = await firestore.doc(`users/${user.uid}`);
  const snapshot=await userRef.get();
  if(!snapshot.exists){
    const {email}=user;
    const{username}=UserName;
    const {Phoneno}=phoneno;
    const{City}=city;
    try{
      userRef.set({
        email,
        username,
        Phoneno,
        City,
        createdAt:new Date(),
      });
    }
    catch(error){
      alert(error.message);
    }

  }
}