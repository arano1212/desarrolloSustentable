import React from "react";
import { motion } from "framer-motion";

const Resultados = ({ huella }) => {
  return (
    <motion.div
      className="resultados"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
    >
      <h2>📊 Tu Huella Digital</h2>
      <p>
        Has generado aproximadamente{" "}
        <strong>{huella} kg CO₂</strong> en un día.
      </p>
    </motion.div>
  );
};

export default Resultados;
