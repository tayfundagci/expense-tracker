import { useState, useEffect } from "react";
import { auth } from "../firebase/config";

import { useAuthContext } from "./useAuthContext";

import { signInWithEmailAndPassword } from "firebase/auth";

export const useLogin = () => {
  const [hata, setHata] = useState(null);
  const [bekliyor, setBekliyor] = useState(false);
  const [iptal, setIptal] = useState(false);

  const { dispatch } = useAuthContext();

  useEffect(() => {
    return () => setIptal(true);
  }, []);

  const login = async (email, password) => {
    setHata(null);
    setBekliyor(true);

    try {
      // signup
      const res = await signInWithEmailAndPassword(auth, email, password);

      if (!res) {
        throw new Error("Giriş işleminde hata oluştu");
      }

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

  return { login, hata, bekliyor };
};
