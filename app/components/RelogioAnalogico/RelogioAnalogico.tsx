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


  return (
    <Card className="bg-[#686868] border-black p-2 w-full h-full">
      <div className=" flex-col size-20 relative  bg-white h-full w-full rounded-full">
        <div
          className="bg-[#dcdbdb] absolute top-1/2 left-1/2 w-28  origin-bottom -translate-1/2 border-black p-0.5 rounded-r-full z-10"
          style={{ transform: `rotate(${anguloHoras}deg)` }}
        />
        <div
          className="bg-black absolute top-1/2 left-1/2 w-38  origin-bottom -translate-1/2 p-0.5 rounded-r-full z-20"
          style={{ transform: `rotate(${anguloMinutos}deg)` }}
        />
        <div
          className="bg-red-600 absolute top-1/2 left-1/2 w-38  origin-bottom -translate-1/2 p-0.5 rounded-r-full z-30 "
          style={{ transform: `rotate(${anguloSegundos}deg)` }}
        />
      </div>
    </Card>
  );
};
