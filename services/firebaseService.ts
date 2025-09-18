// services/firebaseService.ts
import { ref, onValue } from "firebase/database";
import { db } from "../config/firebaseConfig";

// Función genérica para escuchar cambios en cualquier tabla
export const listenToTable = (table: string, callback: (data: any) => void) => {
  const tableRef = ref(db, table);
  const unsubscribe = onValue(tableRef, (snapshot) => {
    if (snapshot.exists()) {
      callback(snapshot.val());
    } else {
      callback(null);
    }
  });
  return unsubscribe;
};
