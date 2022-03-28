import { useState } from "react";
import { auth } from "../firebase/config";
import { signOut } from "firebase/auth";
import { useAuthContext } from "./useAuthContext";

export const useLogout = () => {
  const [hata, setHata] = useState(null);
  const [bekliyor, setBekliyor] = useState(false);
  const { dispatch } = useAuthContext();

  const logout = async () => {
    setHata(null);
    setBekliyor(true);

    try {
      // sign the user out
      await signOut(auth);

      // dispatch logout action
      dispatch({ type: "LOGOUT" });

      // update state
      setBekliyor(false);
      setHata(null);
    } catch (err) {
      setHata(err.message);
      setBekliyor(false);
    }
  };

  return { logout, hata, bekliyor };
};
