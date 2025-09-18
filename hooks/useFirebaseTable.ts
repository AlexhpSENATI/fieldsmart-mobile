// hooks/useFirebaseTable.ts
import { useEffect, useState } from "react";
import { listenToTable } from "../services/firebaseService";

export function useFirebaseTable<T>(table: string) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = listenToTable(table, (val) => {
      setData(val);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [table]);

  return { data, loading };
}
