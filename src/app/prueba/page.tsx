'use client'

import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase";

export default function PruebaLogin() {
  const [result, setResult] = useState("");

  const handleLogin = async () => {
    setResult("Intentando login...");
    try {
      const userCred = await signInWithEmailAndPassword(
        auth,
        "jotagary25@protonmail.com",
        "jorge123123"
      );
      setResult(`✅ Login exitoso: ${userCred.user.email}`);
      
    } catch (error: unknown) {
      // setResult(`❌ Error: ${error.message}`);
      if (error instanceof Error) {
        console.log(error.message || "Error al iniciar sesión");
      } else {
        console.log("Error desconocido");
      }
    }
  };

  return (
    <div className="p-10">
      <h1 className="text-2xl font-bold mb-4">Prueba Login Firebase</h1>
      <button onClick={handleLogin} className="bg-green-500 text-white px-4 py-2 rounded">
        Login de prueba
      </button>
      <p className="mt-4 text-lg">{result}</p>
    </div>
  );
}
