import globalStyles from '@/styles/globalStyles.styles';
import { View, Text, StyleSheet } from 'react-native';
import { Button, TextInput } from 'react-native-paper';



export const NuevoPresupuesto = ({
  presupuesto, 
  setPresupuesto, 
  handleNuevoPresupuesto
}) => {

  
  return (
    <View style={styles.contenedor } >
      <Text style={ styles.titulo }>Define tu presupuesto...</Text>
      <TextInput
        style={ styles.input }
        mode='outlined'
        label={'Definir presupuesto'}
        outlineColor='#124ff5'
        activeOutlineColor='#124ff5'
        textColor='#000'
        keyboardType='numeric'
        value={ presupuesto }
        onChangeText={ setPresupuesto }
      />

      <Button
        style={ styles.boton }
        mode='contained'
        buttonColor='#a4bdff'
        rippleColor={'#124ff5'}
        onPress={() => handleNuevoPresupuesto(presupuesto)}
      >
        Agregar presupuesto
      </Button>



    </View>
  )
}

const styles = StyleSheet.create({
    contenedor: {
      ...globalStyles.contenedor,
      
    },
    titulo: {
      fontSize: 20,
      fontWeight: '600',
      textAlign: 'center',
      color: '#124ff5',
      textTransform: 'uppercase',
      marginBottom: 20,
    },
    input: {
      backgroundColor: '#FFF',
    },
    boton: {
      marginHorizontal: 55,
      marginVertical: 10
    }
})