import { View, Text, StatusBar, StyleSheet } from 'react-native';


export default function Header() {
  return (
    <View>
        <StatusBar barStyle={'light-content'} backgroundColor={'#124ff5'}/>
        <Text style={styles.texto} >Planificador de {''}
            gastos</Text>
    </View>
  );
}

const styles = StyleSheet.create({
    texto: {
        textAlign: 'center',
        fontSize: 30,
        fontWeight: 'bold',
        color: '#fff',
        textTransform: 'uppercase',
        paddingTop: 30,
    }
});