import { View, Text, StyleSheet, FlatList, Pressable } from 'react-native'
import React from 'react'
import globalStyles from '@/styles/globalStyles.styles';
import { formatearCantidad, formatearFecha } from '@/helpers';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';


const diccionarioIconos = {
  ahorro: "cash",
  comida: "food",
  casa: "home",
  gastos_varios: "shopping",
  ocio: "gamepad-variant",
  salud: "heart-pulse",
  suscripciones: "youtube-subscription",
  diversion: "emoticon-happy",
}


export const Gasto = ({ gasto, setModal, setGasto  }) => {

    const {nombre, categoria, cantidad, fecha} = gasto;

    const handleAcciones = () => {
      setModal(true)
      setGasto(gasto)
    }

  return (
    <Pressable
      onPress={handleAcciones}
    >
      <View style={ styles.container }>
        <View style={ styles.contenido }>         

          <View style={ styles.contenedorIcon }>
            <Icon name={diccionarioIconos[categoria] || "help-circle"}  style={ styles.icon } size={50} color='#000' />

            <View style={ styles.contenedorTexto }>
              <Text style={ styles.nombre }>{nombre}</Text>
              <Text style={ styles.categoria }>{categoria}</Text>
              <Text style={ styles.fecha }>Fecha: {formatearFecha(fecha)}</Text>
            </View>
          </View>   

          <Text style={ styles.cantidad }>{formatearCantidad(cantidad)}</Text>
        </View>
      </View>
    </Pressable>
  )
}

const styles = StyleSheet.create({
    container: {
        ...globalStyles.contenedor,
        marginBottom: 15,
    },
    contenido: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    contenedorIcon: {
      flexDirection: 'row',
      alignItems: 'center',
      flex: 1,
    },
    icon: {
      marginRight: 20,
    },
    contenedorTexto: {
      flex: 1,
    },
    categoria: {
      fontSize: 13,
      fontWeight: '500',
      color: '#7f7f7f',
    },
    nombre: {
      color: "#124ff5",
      textTransform: 'uppercase',
      fontSize: 18,
      fontWeight: '500',
      marginBottom: 5,    
    },
    cantidad: {
      fontSize: 18,
      fontWeight: 'bold',
    },
    fecha: {
      fontSize: 13,
      fontWeight: '500',
      color: '#7f7f7f'
    }
})
