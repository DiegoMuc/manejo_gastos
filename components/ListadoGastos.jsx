import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { Gasto } from "./Gasto";

export const ListadoGastos = ({
  gastos,
  setModal,
  setGasto,
  filtro,
  gastosFiltrados,
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Gastos</Text>

      {filtro
        ? gastosFiltrados.map((gasto) => (
            <Gasto
              key={gasto.id}
              gasto={gasto}
              setModal={setModal}
              setGasto={setGasto}
            />
          ))
        : gastos.map((gasto) => (
            <Gasto
              key={gasto.id}
              gasto={gasto}
              setModal={setModal}
              setGasto={setGasto}
            />
          ))}

      { (gastos.length === 0 ||
        (gastosFiltrados.length === 0 && !!filtro) && (
          <Text style={styles.noGastos}>No hay gastos</Text>
        ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 30,
    marginBottom: 100,
  },
  titulo: {
    color: "#124ff5",
    fontWeight: "700",
    fontSize: 25,
    textAlign: "center",
    marginTop: 20,
  },
  noGastos: {
    marginTop: 20,
    marginBottom: 50,
    textAlign: "center",
    fontSize: 20,
  },
});
