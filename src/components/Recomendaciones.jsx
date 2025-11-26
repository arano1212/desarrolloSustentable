import React from "react";
import { motion } from "framer-motion";

const Recomendaciones = ({ huella }) => {
  let tips = [];

  if (huella <= 50) {
    tips = [
      "🌱 Tener una planta en casa ayuda a mejorar la calidad del aire.",
      "💡 Usa focos LED: consumen hasta 80% menos energía.",
      "🔌 Apaga luces y desconecta cargadores cuando no los uses."
    ];
  } else if (huella > 50 && huella <= 150) {
    tips = [
      "🚴 Usa bicicleta o camina en trayectos cortos en lugar del coche.",
      "🥦 Reduce el consumo de carne roja, su producción genera mucho CO₂.",
      "📱 Baja el brillo de tus dispositivos para ahorrar energía."
    ];
  } else {
    tips = [
      "⚡ Considera cambiar a energías renovables si es posible.",
      "🚗 Comparte coche o usa transporte público para reducir emisiones.",
      "📉 Reduce el uso de tus dispositivos al menos 2h al día."
    ];
  }

  return (
    <motion.div
      className="recomendaciones"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
    >
      <h2>💡 Recomendaciones según tu consumo</h2>
      <ul>
        {tips.map((tip, index) => (
          <motion.li
            key={index}
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
            viewport={{ once: true }}
          >
            {tip}
          </motion.li>
        ))}
      </ul>
    </motion.div>
  );
};

export default Recomendaciones;