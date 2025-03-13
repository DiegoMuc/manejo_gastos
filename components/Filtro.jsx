import globalStyles from "@/styles/globalStyles.styles";
import { Picker } from "@react-native-picker/picker";
import { useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";

export const Filtro = ({ setFiltro, filtro, gastos, setGastosFiltrados }) => {

    useEffect(() => {
        if( filtro === '' ) {
            setGastosFiltrados([])
        } else {
            const gastosFiltrados = gastos.filter( gasto => gasto.categoria === filtro )

            setGastosFiltrados( gastosFiltrados )
        }
    }, [filtro])
    
    
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Filtrar Gastos</Text>
      <Picker
      selectedValue={filtro}
      onValueChange={(valor) => {
        setFiltro(valor)
      }}
      >
        <Picker.Item label="-- Seleccione --" value="" />
        <Picker.Item label="Ahorro" value="ahorro" />
        <Picker.Item label="Comida" value="comida" />
        <Picker.Item label="Casa" value="casa" />
        <Picker.Item label="Gastos varios" value="gastos" />
        <Picker.Item label="Ocio" value="ocio" />
        <Picker.Item label="Salud" value="Salud" />
        <Picker.Item label="Suscripciones" value="suscripciones" />
        <Picker.Item label="Diversion" value="diversion" />
      </Picker>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...globalStyles.contenedor,
    transform: [{ translateY: 0 }],
    marginTop: 80,
  },
  label: {
    fontSize: 23,
    fontWeight: "700",
    color: "#124ff5",
  },
});
