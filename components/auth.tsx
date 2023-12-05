import { auth, googleProvider } from "../config/firebase";
import {
  signInWithPopup,
} from "firebase/auth";

export const Auth = (): JSX.Element => {

  const signInWithGoogle = async (): Promise<void> => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (err: any) {
      console.error(err);
    }
  };

  return (
    <div>
      <button onClick={signInWithGoogle}> Sign In With Google</button>
    </div>
  );
};