import { useState, useEffect } from "react";
import { auth } from "../firebase/config";

import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";

import { useAuthContext } from "./useAuthContext";

export const useSignup = () => {
  const [hata, setHata] = useState(null);
  const [bekliyor, setBekliyor] = useState(false);
  const [iptal, setIptal] = useState(false);

  const { dispatch } = useAuthContext();

  useEffect(() => {
    return () => setIptal(true);
  }, []);

  const signup = async (email, password, displayName) => {
    setHata(null);
    setBekliyor(true);

    try {
      // signup
      const res = await createUserWithEmailAndPassword(auth, email, password);

      if (!res) {
        throw new Error("Üye işleminde hata oluştu");
      }

      await updateProfile(res.user, { displayName });

      dispatch({ type: "LOGIN", payload: res.user });

      if (!iptal) {
        setBekliyor(false);
        setHata(null);
      }
    } catch (err) {
      if (!iptal) {
        setHata(err.message);
        setBekliyor(false);
      }
    }
  };

  return { signup, hata, bekliyor };
};
