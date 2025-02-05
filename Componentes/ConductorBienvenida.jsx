import React from 'react';
import { View, Text, Image, StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

const ConductorBienvenida = ({ mensaje, imagen }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.mensaje}>{mensaje}</Text>
      <Text style={styles.mensaje}>
        ¡Aquí podrás iniciar y ver el detalle de tu ruta asignada!
      </Text>
      <Image 
        source={typeof imagen === 'string' ? { uri: imagen } : imagen} 
        style={styles.imagen} 
      />
    </View>
  );
};

// En ConductorBienvenida.js
const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 15,
    },
    mensaje: {
      fontSize: width < 768 ? 24 : 38, // Tamaño responsivo
      fontWeight: 'bold',
      color: '#001f5b',
      textAlign: 'center',
      marginBottom: 10,
    },
    imagen: {
      width: width < 768 ? width * 0.8 : height * 0.6,
      height: width < 768 ? width * 0.8 : height * 0.6,
      resizeMode: 'contain',
    },
  });

export default ConductorBienvenida;