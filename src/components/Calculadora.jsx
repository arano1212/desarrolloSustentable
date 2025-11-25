import { useState } from "react";
import Recomendaciones from "./Recomendaciones";
import Resultados from "./resultados";
import { Element } from "react-scroll";


const Calculadora = () => {
    const [horas, setHoras] = useState("");
    const [huella, setHuella] = useState(null);
    const [nivel, setNivel] = useState(null);
  
    const calcularHuella = () => {
      if (horas === "" || horas < 0) return;
  
      const resultado = horas * 2;
      setHuella(resultado);
  
      if (resultado < 100) setNivel("bajo");
      else if (resultado < 200) setNivel("moderado");
      else setNivel("alto");
  
      setTimeout(() => {
        const resultadosSection = document.getElementById("resultados");
        if (resultadosSection) {
          resultadosSection.scrollIntoView({ behavior: "smooth" });
        }
      }, 300);
    };
  
    const fondoClase =
      nivel === "bajo"
        ? "bg-bajo"
        : nivel === "moderado"
        ? "bg-moderado"
        : nivel === "alto"
        ? "bg-alto"
        : "";
  
    return (
      <div className={`min-h-screen flex flex-col items-center ${fondoClase}`}>
        <div className="calculadora relative z-10 mt-10 bg-white p-8 shadow-xl rounded-2xl w-[90%] max-w-lg">
          <h1 className="titulo text-2xl font-bold text-center mb-6">
            🌍 Calculadora de Huella Digital
          </h1>
  
          <input
            type="number"
            placeholder="Horas de uso al día"
            value={horas}
            onChange={(e) => setHoras(Number(e.target.value))}
            className="input-horas w-full p-3 border rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
  
          <button
            onClick={calcularHuella}
            className="btn-calcular w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition"
          >
            Calcular
          </button>
  
          {huella !== null && (
            <>
              <Element name="resultados">
                <div id="resultados" className="mt-8">
                  <Resultados key={huella} huella={huella} />
                </div>
              </Element>
  
              <Element name="recomendaciones">
                <div id="recomendaciones" className="mt-12">
                  <Recomendaciones key={huella} huella={huella} />
                </div>
              </Element>
            </>
          )}
        </div>
      </div>
    );
  };
  
  export default Calculadora;