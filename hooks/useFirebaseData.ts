// hooks/useFirebaseData.ts
import { useEffect, useState } from "react";
import { db } from "../config/firebaseConfig";
import { ref, onValue } from "firebase/database";

interface Sensores {
  bomba: boolean;
  enEspera: boolean;
  humedadAmbiental: number;
  humedadSuelo: number;
  ip: string;
  modoAutomatico: boolean;
  temperatura: number;
  tiempoRestanteEspera: number;
  tiempoUso: number;
  ultimoRiego: number;
}

interface Config {
  [key: string]: any; // Ajusta según la estructura real de tu tabla config
}

interface Historial {
  id: string;
  bomba: boolean;
  fecha_epoch: number;
  fecha_texto: string;
  humedadAmbiental: number;
  humedadSuelo: number;
  temperatura: number;
}

export const useFirebaseData = () => {
  const [sensores, setSensores] = useState<Sensores | null>(null);
  const [config, setConfig] = useState<Config | null>(null);
  const [historial, setHistorial] = useState<Historial[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Sensores
    const sensoresRef = ref(db, "sensores");
    const unsubSensores = onValue(sensoresRef, (snap) => {
      if (snap.exists()) {
        setSensores(snap.val());
      } else {
        setSensores(null);
      }
    });

    // Config
    const configRef = ref(db, "config");
    const unsubConfig = onValue(configRef, (snap) => {
      if (snap.exists()) {
        setConfig(snap.val());
      } else {
        setConfig(null);
      }
    });

    // Historial
    const historialRef = ref(db, "historial");
    const unsubHistorial = onValue(historialRef, (snap) => {
      if (snap.exists()) {
        const dataObj = snap.val();
        const dataArray = Object.entries(dataObj).map(([id, item]: any) => ({
          id,
          ...item,
        }));
        // ordenar por fecha ascendente
        dataArray.sort((a, b) => a.fecha_epoch - b.fecha_epoch);
        setHistorial(dataArray as Historial[]);
      } else {
        setHistorial([]);
      }
    });

    setLoading(false);

    return () => {
      unsubSensores();
      unsubConfig();
      unsubHistorial();
    };
  }, []);

  return { sensores, config, historial, loading };
};
