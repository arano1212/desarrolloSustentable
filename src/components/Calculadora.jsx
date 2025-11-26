import { useState } from "react";
import Recomendaciones from "./Recomendaciones";
import Resultados from "./Resultados";
import { Element } from "react-scroll";

const DEFAULTS = {
  laptopW: 60,
  desktopW: 200,
  defaultFactor: 400 
};

const COUNTRY_FACTORS = [
  { code: "MX", name: "México", factor: 450 },
  { code: "US", name: "Estados Unidos", factor: 400 },
  { code: "ES", name: "España", factor: 200 },
  { code: "SE", name: "Suecia", factor: 50 },
  { code: "MANUAL", name: "Manual", factor: null }
];

const Calculadora = () => {
  
  const [tipo, setTipo] = useState("laptop");
  const [tempPotencia, setTempPotencia] = useState(DEFAULTS.laptopW);
  const [tempHoras, setTempHoras] = useState("");
  const [tempPais, setTempPais] = useState("MANUAL");
  const [tempFactor, setTempFactor] = useState(DEFAULTS.defaultFactor);

  const [huella, setHuella] = useState(null);
  const [nivel, setNivel] = useState(null);
  const [error, setError] = useState("");

  const seleccionarTipo = (t) => {
    setTipo(t);
    if (t === "laptop") setTempPotencia(DEFAULTS.laptopW);
    else if (t === "desktop") setTempPotencia(DEFAULTS.desktopW);
    else setTempPotencia("");
  };

  const onPaisChange = (code) => {
    setTempPais(code);
    const entry = COUNTRY_FACTORS.find((c) => c.code === code);
    if (!entry) return;
    if (entry.factor === null) setTempFactor(DEFAULTS.defaultFactor);
    else setTempFactor(entry.factor);
  };

  const calcularHuella = () => {
    setError("");
    if (tempHoras === "" || Number(tempHoras) < 0) {
      setError("Ingresa horas válidas.");
      return;
    }
    if (!tempPotencia || Number(tempPotencia) <= 0) {
      setError("Ingresa una potencia válida (W).");
      return;
    }
    if (!tempFactor || Number(tempFactor) <= 0) {
      setError("Ingresa un factor de emisión válido (gCO₂/kWh).");
      return;
    }

   
    const kWh = (Number(tempPotencia) * Number(tempHoras)) / 1000;
    const gCO2 = kWh * Number(tempFactor);
    const gRounded = Number(gCO2.toFixed(2));

    setHuella(gRounded); 
    if (gRounded < 50) setNivel("bajo");
    else if (gRounded < 200) setNivel("moderado");
    else setNivel("alto");

    setTimeout(() => {
      const resultadosSection = document.getElementById("resultados");
      if (resultadosSection) resultadosSection.scrollIntoView({ behavior: "smooth" });
    }, 300);
  };

  const fondoClase =
    nivel === "bajo" ? "bg-bajo" : nivel === "moderado" ? "bg-moderado" : nivel === "alto" ? "bg-alto" : "";

  return (
    <div className={`min-h-screen flex flex-col items-center ${fondoClase}`}>
      <div className="calculadora relative z-10 mt-10 bg-white p-8 shadow-xl rounded-2xl w-[90%] max-w-lg">
        <h1 className="titulo text-2xl font-bold text-center mb-6">🌍 Calculadora de Huella Digital</h1>

        {/* CHIPS TIPO */}
        <label className="block text-sm font-medium mb-2">Tipo de equipo</label>
        <div className="flex gap-2 mb-4">
          <button
            type="button"
            aria-pressed={tipo === "laptop"}
            onClick={() => seleccionarTipo("laptop")}
             style={{
      padding: "8px 16px",
      borderRadius: "8px",
      border: tipo === "laptop" ? "2px solid #2563eb" : "1px solid #ccc",
      backgroundColor: tipo === "laptop" ? "#2563eb" : "#f9f9f9",
      color: tipo === "laptop" ? "#fff" : "#333",
      cursor: "pointer",
      transition: "all 0.3s ease"
    }}
            className={`chip ${tipo === "laptop" ? "active" : ""}`}
          >
            Laptop
          </button>
          <button
            type="button"
            aria-pressed={tipo === "desktop"}
            onClick={() => seleccionarTipo("desktop")}
            style={{
      padding: "8px 16px",
      borderRadius: "8px",
      border: tipo === "desktop" ? "2px solid #2563eb" : "1px solid #ccc",
      backgroundColor: tipo === "desktop" ? "#2563eb" : "#f9f9f9",
      color: tipo === "desktop" ? "#fff" : "#333",
      cursor: "pointer",
      transition: "all 0.3s ease"
    }}

            className={`chip ${tipo === "desktop" ? "active" : ""}`}
          >
            Desktop
          </button>
          <button
            type="button"
            aria-pressed={tipo === "personalizado"}
            onClick={() => seleccionarTipo("personalizado")}
             style={{
      padding: "8px 16px",
      borderRadius: "8px",
      border: tipo === "personalizado" ? "2px solid #2563eb" : "1px solid #ccc",
      backgroundColor: tipo === "personalizado" ? "#2563eb" : "#f9f9f9",
      color: tipo === "personalizado" ? "#fff" : "#333",
      cursor: "pointer",
      transition: "all 0.3s ease"
    }}

            className={`chip ${tipo === "personalizado" ? "active" : ""}`}
          >
            Personalizado
          </button>
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <div>
            <label className="block text-sm font-medium mb-1">Potencia W</label>
            <input
              type="number"
              value={tempPotencia}
              onChange={(e) => setTempPotencia(e.target.value === "" ? "" : Number(e.target.value))}
              className="input-horas w-full p-3 border rounded-lg"
              placeholder="Ej. 60"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Horas al día</label>
            <input
              type="number"
              value={tempHoras}
              onChange={(e) => setTempHoras(e.target.value === "" ? "" : Number(e.target.value))}
              className="input-horas w-full p-3 border rounded-lg"
              placeholder="Ej. 4"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">País</label>
            <div className="flex flex-wrap gap-2">
              {COUNTRY_FACTORS.map((c) => (
                <button
                  key={c.code}
                  type="button"
                  onClick={() => onPaisChange(c.code)}
                    style={{
          padding: "6px 14px",
          borderRadius: "8px",
          border: tempPais === c.code ? "2px solid #2563eb" : "1px solid #ccc",
          backgroundColor: tempPais === c.code ? "#2563eb" : "#f9f9f9",
          color: tempPais === c.code ? "#fff" : "#333",
          cursor: "pointer",
          transition: "all 0.3s ease"
        }}

                  className={`country-chip ${tempPais === c.code ? "active" : ""}`}
                  title={c.factor ? `${c.factor} gCO₂/kWh` : "Ingresar manualmente"}
                >
                  {c.name}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Factor gCO₂/kWh</label>
            <input
              type="number"
              value={tempFactor}
              onChange={(e) => setTempFactor(Number(e.target.value))}
              className="input-horas w-full p-3 border rounded-lg"
              placeholder="Ej. 400"
            />
          </div>
        </div>

        {error && <p className="text-red-600 mt-3">{error}</p>}

        <button
          onClick={calcularHuella}
          className="btn-calcular w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition mt-4"
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