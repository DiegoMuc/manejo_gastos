import { View, Text, StyleSheet } from "react-native";
import { Button, TextInput } from "react-native-paper";
import { Picker } from "@react-native-picker/picker";
import { useEffect, useState } from "react";

export const FormularioGasto = ({ setModal, handleGasto, setGasto, gasto, eliminarGasto }) => {

  const [nombre, setNombre] = useState("");
  const [cantidad, setCantidad] = useState("");
  const [categoria, setCategoria] = useState("");
  const [id, setId] = useState('');
  const [fecha, setFecha] = useState('');


  useEffect(() => {
    if(gasto?.nombre) {
      setNombre(gasto.nombre)
      setCantidad(gasto.cantidad)
      setCategoria(gasto.categoria)
      setId(gasto.id)
      setFecha(gasto.fecha)
    }
  }, [gasto])
  

  return (
    <View style={{ padding: 20, alignItems: "center" }}>
      <View>
        <Text style={styles.titulo}>{gasto?.nombre ? 'Editar Gasto...' : 'Nuevo Gasto...'}</Text>

        <View>
          <TextInput
            style={styles.input}
            mode="outlined"
            label={"Nombre gasto"}
            outlineColor="#124ff5"
            activeOutlineColor="#124ff5"
            textColor="#000"
            keyboardType="default"
            value={nombre}
            onChangeText={setNombre}
          />

          <TextInput
            style={styles.input}
            mode="outlined"
            label={"Cantidad gasto"}
            outlineColor="#124ff5"
            activeOutlineColor="#124ff5"
            textColor="#000"
            keyboardType="numeric"
            value={cantidad}
            onChangeText={setCantidad}
          />

          <View style={{ marginTop: 25, marginBottom: 35 }}>
            <Text style={{ fontSize: 15, fontWeight: "500", color: "#124ff5" }}>
              Categoria gasto
            </Text>
            <Picker
              style={{ borderBlockColor: "#000", color: "#124ff5" }}
              selectedValue={categoria}
              onValueChange={(value) => {
                setCategoria(value);
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
        </View>
      </View>

      <Button
        style={styles.btnAgregar}
        mode="contained"
        buttonColor="#21a742"
        rippleColor={"#58c171"}
        onPress={() => handleGasto({ nombre, cantidad, categoria, id, fecha })}
      >
        <Text style={{ color: "#fff", textTransform: "uppercase" }}>
        {gasto?.nombre ? 'Aceptar' : 'Agregar'}
        </Text>
      </Button>

      <View style={ styles.btnContainer }>
          <Button
            style={styles.btn}
            mode="contained"
            buttonColor="#da4b4b"
            rippleColor={"#cf7070"}
            onPress={() => {
              setModal(false)
              setGasto({})
            }}
          >
            <Text style={{ color: "#fff", textTransform: "uppercase" }}>
              Cancelar
            </Text>
          </Button>

          {
            !!id && (
            <Button 
              style={styles.btn}
              mode="contained"
              buttonColor="#124ff5"
              rippleColor={"#cf7070"}
              onPress={() => eliminarGasto(id)}
            >
              <Text style={{ color: "#fff", textTransform: "uppercase" }}>
                Eliminar
              </Text>
            </Button>
            )
          }

      </View>
      
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    backgroundColor: "#fff",
    width: 310,
    marginTop: 20,
  },
  titulo: {
    textAlign: "center",
    fontSize: 30,
    fontWeight: "500",
    color: "#124ff5",
    textTransform: "uppercase",
    marginVertical: 20,
  },
  btnContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  btn: {
    marginTop: 0,
    marginTop: 270,
    marginHorizontal: 10,
    width: '50%',
  },
  btnAgregar: {
    width: 250,
  }
});
