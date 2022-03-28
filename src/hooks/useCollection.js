import { useEffect, useState, useRef } from "react";
import { db } from "../firebase/config";
import {
  collection,
  onSnapshot,
  query,
  where,
  orderBy,
} from "firebase/firestore";

export const useCollection = (col, _query, _orderBy) => {
  const [belgeler, setBelgeler] = useState(null);
  const [hata, setHata] = useState(null);

  const q = useRef(_query).current;
  const oBy = useRef(_orderBy).current;

  useEffect(() => {
    let ref = collection(db, col);

    if (q) {
      ref = query(ref, where(...q));
    }
    if (oBy) {
      ref = query(ref, orderBy(...oBy));
    }

    const unsubscribe = onSnapshot(
      ref,
      (snapshot) => {
        let sonuclar = [];
        snapshot.docs.forEach((doc) => {
          sonuclar.push({ ...doc.data(), id: doc.id });
        });

        setBelgeler(sonuclar);
        setHata(null);
      },
      (error) => {
        setHata("Veriler getirilemedi");
      }
    );

    return () => unsubscribe();
  }, [col]);

  return { belgeler, hata };
};
