import { Alert, Image, ScrollView, StyleSheet, Text, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NuevoPresupuesto } from "@/components/NuevoPresupuesto";
import { useEffect, useState } from "react";
import { ControlPresupuesto } from "@/components/ControlPresupuesto";
import { Button, IconButton, Modal, Portal } from "react-native-paper";
import { FormularioGasto } from "@/components/FormularioGasto";
import { generarId } from "@/helpers";
import { ListadoGastos } from "@/components/ListadoGastos";
import Header from "@/components/Header";
import { Filtro } from "@/components";

export default function App() {

  const [isValidPresupuesto, setIsValidPresupusto] = useState(false);
  const [presupuesto, setPresupuesto] = useState("");
  const [gastos, setGastos] = useState([]);
  const [modal, setModal] = useState(false);
  const [gasto, setGasto] = useState({});
  const [filtro, setFiltro] = useState("");
  const [gastosFiltrados, setGastosFiltrados] = useState([]);



  useEffect(() => {
    const obtenerPresupuestoStorage = async () => {
      try {
        const presupuestoStorage =
          (await AsyncStorage.getItem("planificador_presupuesto")) ?? 0;

        if (presupuestoStorage > 0) {
          setPresupuesto(presupuestoStorage);
          setIsValidPresupusto(true);
        }
      } catch (error) {
        console.log(error);
      }
    };
    obtenerPresupuestoStorage();
  }, []);



  useEffect(() => {
    if (isValidPresupuesto) {
      const guardarPresupuestoStorage = async () => {
        try {
          await AsyncStorage.setItem("planificador_presupuesto", presupuesto);
        } catch (error) {
          console.log(error);
        }
      };
      guardarPresupuestoStorage();
    }
  }, [isValidPresupuesto]);



  useEffect(() => {
    const obtenerGastosStorage = async () => {
      try {
        const gastosStorage =
          (await AsyncStorage.getItem("planificador_gastos")) ?? [];

        setGastos(gastosStorage ? JSON.parse(gastosStorage) : []);
      } catch (error) {
        console.log(error);
      }
    };

    obtenerGastosStorage();
  }, []);



  useEffect(() => {
    const guardarGastosStorage = async () => {
      try {
        await AsyncStorage.setItem(
          "planificador_presupuesto",
          JSON.stringify(gastos)
        );
      } catch (error) {
        console.log(error);
      }
    };

    guardarGastosStorage();
  }, [gastos]);



  const handleNuevoPresupuesto = (presupuesto) => {
    if (Number(presupuesto) > 0) {
      setIsValidPresupusto(true);
    } else {
      Alert.alert("Error", "El Presupuesto no puede ser 0 o menor", "OK");
    }
  };



  const handleGasto = (gasto) => {
    if ([gasto.nombre, gasto.categoria, gasto.cantidad].includes("")) {
      Alert.alert("Error", "Todos los campos son obligatorios");
      return;
    }

    if (gasto.id) {
      const gastosActualizados = gastos.map((gastoState) =>
        gastoState.id === gasto.id ? gasto : gastoState
      );

      setGastos(gastosActualizados);
    } else {
      gasto.id = generarId();
      gasto.fecha = Date.now();
      setGastos([...gastos, gasto]);
    }
    setModal(!modal);
  };



  const eliminarGasto = (id) => {
    Alert.alert(
      "¿Deseas eliminar este gasto?",
      "Un gasto eliminado no se puede recuperar",
      [
        { text: "No", style: "Cancel" },
        {
          text: "Si",
          style: "Eliminar",
          onPress: () => {
            const gastosActualizados = gastos.filter(
              (gastoState) => gastoState.id !== id
            );

            setGastos(gastosActualizados);
            setModal(!modal);
            setGasto({});
          },
        },
      ]
    );
  };

  const resetearPresupuesto = () => {
    Alert.alert(
      '¿Deseas reiniciar a un presupuesto nuevo?',
      'Esto eliminara el presupuesto y gastos',
      [
        { text: 'No', style: 'cancel '},
        { text: 'Si', onPress: async () => {
          try {
            await AsyncStorage.clear()

            setIsValidPresupusto(false)
            setPresupuesto(0)
            setGastos([])
          } catch (error) {
            console.log(error);
            
          }
        }},
      ]
   )
  }


  return (
    <View style={styles.contenedor}>
      <ScrollView keyboardShouldPersistTaps="handled">
        <View style={styles.header}>
          <Header />

          {isValidPresupuesto ? (
            <ControlPresupuesto 
              presupuesto={presupuesto} 
              gastos={gastos} 
              resetearPresupuesto={ resetearPresupuesto }
            />
          ) : (
            <NuevoPresupuesto
              handleNuevoPresupuesto={handleNuevoPresupuesto}
              presupuesto={presupuesto}
              setPresupuesto={setPresupuesto}
            />
          )}
        </View>

        {isValidPresupuesto && (
          <>
            <Filtro
              filtro={filtro}
              setFiltro={setFiltro}
              gastos={gastos}
              setGastosFiltrados={setGastosFiltrados}
            />

            <ListadoGastos
              gastos={gastos}
              setModal={setModal}
              setGasto={setGasto}
              filtro={filtro}
              gastosFiltrados={gastosFiltrados}
            />
          </>
        )}
      </ScrollView>

      {modal && (
        <Portal>
          <Modal
            dismissable
            visible={modal}
            contentContainerStyle={styles.modal}
          >
            <FormularioGasto
              modal={modal}
              setModal={setModal}
              handleGasto={handleGasto}
              gasto={gasto}
              setGasto={setGasto}
              eliminarGasto={eliminarGasto}
            />
          </Modal>
        </Portal>
      )}

      {isValidPresupuesto && (
        <IconButton
          style={styles.botonMas}
          mode="outlined"
          icon="plus"
          iconColor="#fff"
          rippleColor={"#124ff5"}
          size={50}
          onPress={() => setModal(!modal)}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  contenedor: {
    backgroundColor: "#E5E5E5",
    flex: 1,
  },
  header: {
    backgroundColor: "#124ff5",
    minHeight: 200,
  },
  botonMas: {
    position: "absolute",
    bottom: 20,
    right: 20,
    backgroundColor: "#124ff5",
    borderColor: "#124ff5",
  },
  modal: {
    backgroundColor: "#FFF",
    marginHorizontal: 20,
    marginVertical: 30,
    flex: 1,
    borderRadius: 20,
    justifyContent: "flex-start",
    alignItems: "center",
  },
});
