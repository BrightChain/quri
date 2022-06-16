/// <reference types="node" />
import { FirebaseApp } from "firebase/app";
import { Auth, GoogleAuthProvider, User, UserInfo } from "firebase/auth";
import { Database } from "firebase/database";
import { FieldValue, Firestore } from "firebase/firestore";
import { auth as firebaseUiAuth } from "firebaseui";
interface IQuriApp {
  firebaseHosting: boolean;
  firebaseApp?: FirebaseApp;
  config: firebaseConfig;
  onLoad: () => void;
}
