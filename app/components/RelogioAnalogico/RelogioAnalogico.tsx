"use client";
import React from "react";
import { useState, useEffect, useMemo } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

// interface RelogioProps {
//   horas: number | null;
//   minutos: number | null;
//   segundos: number | null;
// }

// function refreshTime(){
//     var dateString = new Date().toLocaleString("pt-BR", {timeZone: "America/Sao_Paulo"})
//     var formattedString = dateString.replace(", ", "- ")
// }

export const RelogioAnalogico = () => {
  const [horario, setHorario] = useState<Date>(new Date());
  const [e24Horas, setE24Horas] = useState<boolean>(true);
  const [montado, setMontado] = useState<boolean>(false);

  const anguloSegundos = horario.getSeconds() * 6;
  const anguloMinutos = horario.getMinutes() * 6 + horario.getSeconds() * 0.1;
  const anguloHoras =
    (horario.getHours() % 12) * 30 + horario.getMinutes() * 0.5;

  useEffect(() => {
    setMontado(true);
    const intervalo = setInterval(() => {
      setHorario(new Date());
    }, 1000);
    return () => clearInterval(intervalo);
  }, []);

  const formattedTime = useMemo<string>(() => {
    if (!montado) return "";
    const horas = e24Horas
      ? horario.getHours().toString().padStart(2, "0")
      : (horario.getHours() % 12 || 12).toString().padStart(2, "0");
    const minutos = horario.getMinutes().toString().padStart(2, "0");
    const segundos = horario.getSeconds().toString().padStart(2, "0");

    return `${horas}:${minutos}:${segundos}`; // ← SEM chaves, template string direto
  }, [horario, e24Horas, montado]); // ← array de dependências dentro do useMemo

  return (
    <Card>
      <div className="relogio-face">
        <div
          className="ponteiro-horas"
          style={{ transform: `rotate(${anguloHoras}deg)` }}
        />
        <div
          className="ponteiro-minutos"
          style={{ transform: `rotate(${anguloMinutos}deg)` }}
        />
        <div
          className="ponteiro-segundos"
          style={{ transform: `rotate(${anguloSegundos}deg)` }}
        />
      </div>
    </Card>
  );
};
