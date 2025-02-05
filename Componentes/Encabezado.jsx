import React from 'react';
import PropTypes from 'prop-types';
import { 
  View, 
  Text, 
  Image, 
  TouchableOpacity, 
  StyleSheet 
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Encabezado = ({ logoSrc, text }) => {
  const navigation = useNavigation();

  const handleLogout = async () => {
    try {
      // Eliminar el usuario de AsyncStorage
      await AsyncStorage.removeItem('usuario');
      navigation.navigate('Login'); // Navegar a la pantalla de inicio de sesión
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Image 
        source={{ uri: logoSrc }} 
        style={styles.logo} 
        resizeMode="contain"
      />
      
      <Text style={styles.text}>{text}</Text>

      <TouchableOpacity 
        style={styles.button} 
        onPress={handleLogout}
      >
        <Image 
          source={{ uri: 'https://cdn-icons-png.flaticon.com/128/906/906811.png' }} 
          style={styles.icon} 
          resizeMode="contain"
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#ffffff',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  logo: {
    width: 125,
    height: 50,
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#001f5b',
    textAlign: 'center',
    flex: 1,
    marginHorizontal: 10,
  },
  button: {
    padding: 5,
  },
  icon: {
    width: 35,
    height: 35,
  },
});

Encabezado.defaultProps = {
  logoSrc: 'https://ici2st.epn.edu.ec/eventosAnteriores/ICI2ST2023/images/ici2st2023/Logo_EPN.png',
  text: 'SISTEMA DE TRANSPORTE ESTUDIANTIL',
};

Encabezado.propTypes = {
  logoSrc: PropTypes.string,
  text: PropTypes.string,
};

export default Encabezado;