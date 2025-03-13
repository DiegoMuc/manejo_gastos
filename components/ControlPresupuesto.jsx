import { formatearCantidad } from '@/helpers';
import globalStyles from '@/styles/globalStyles.styles';
import { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import CircularProgress from 'react-native-circular-progress-indicator';
import { Button } from 'react-native-paper';



export const ControlPresupuesto = ({ presupuesto, gastos, resetearPresupuesto }) => {

    const [disponible, setDisponible] = useState(0);
    const [gastado, setGastado] = useState(0);
    const [porcentaje, setPorcentaje] = useState(0)

    useEffect(() => {
      const totalGastado = gastos.reduce( (total, gastos) => Number(gastos.cantidad) + total, 0 );
      const totalDisponible = presupuesto - totalGastado;

      const nuevoPorcentaje = (
        ((presupuesto - totalDisponible) / presupuesto) * 100
      )

      setTimeout(() => {
          setPorcentaje(nuevoPorcentaje);        
      }, 1000);


      setDisponible(totalDisponible);
      setGastado(totalGastado);
    }, [gastos])
    

  return (
    <View style={ styles.contenedor }>
        <View style={ styles.centrarGrafica }>
            <CircularProgress 
                value={porcentaje}
                duration={1000}
                radius={150}
                valueSuffix={'%'}
                title='Gastado'
                inActiveStrokeColor='#E5E5E5'
                inActiveStrokeWidth={15}
                activeStrokeColor='#124ff5'
                activeStrokeWidth={20}
                titleStyle={{ fontWeight: 'bold', fontSize: 30}}
            />
        </View>

        <Button
            style={ styles.boton }
            mode='contained'
            buttonColor='#a4bdff'
            rippleColor={'#124ff5'}
            onPress={resetearPresupuesto}
        >
            <Text style={ styles.btnTexto }>Reiniciar</Text>
        </Button>
        
        <View style={ styles.contenedorTexto }>
            <Text style={ styles.valor }>
                <Text style={ styles.label }>Presupuesto: {''}</Text>
                {formatearCantidad(presupuesto)}
            </Text>

            <Text style={ styles.valor }>
                <Text style={ styles.label }>Disponible: {''}</Text>
                {formatearCantidad(disponible)}
            </Text>

            <Text style={ styles.valor }>
                <Text style={ styles.label }>Gastos: {''}</Text>
                {formatearCantidad(gastado)}
            </Text>
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
    contenedor: {
        ...globalStyles.contenedor
    },
    centrarGrafica: {
        alignItems: 'center'
    },
    iamgen: {
        width: 250,
        height: 250,
    },
    contenedorTexto: {
        marginTop: 10,
    },
    valor: {
        fontSize: 20,
        textAlign: 'center',
        marginBottom: 10,
    },
    label: {
        fontWeight: '700',
        color: '#124ff5',
    },
    boton: {
        padding: 5,
        marginVertical: 20,
        borderRadius: 25,
        width: '50%',
        alignSelf: 'center',
    },
    btnTexto: {
        textAlign: 'center',
        fontSize: 15,
        fontWeight: '500',
        textTransform: 'uppercase',
        padding: 0,
    }
})

