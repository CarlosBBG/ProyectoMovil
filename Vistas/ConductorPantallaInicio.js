import React, { useEffect, useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ActivityIndicator, 
  Dimensions, 
  ScrollView 
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import ConductorBienvenida from '../Componentes/ConductorBienvenida';
import Encabezado from '../Componentes/Encabezado';
import BarraLateral from '../Componentes/BarraLateral';

const { width, height } = Dimensions.get('window');
const isMobile = width < 768; // Consideramos móvil si el ancho es menor a 768px

const ConductorPantallaInicio = () => {
  const navigation = useNavigation();
  const [conductor, setConductor] = useState(null);
  const [loading, setLoading] = useState(true);

  const menuItems = [
    { label: "Inicio", link: "ConductorInicio" },
    { label: "Iniciar Ruta", link: "ConductorIniciarRuta" },
    { label: "Ver Estado de la Ruta", link: "ConductorRutaCheck" },
  ];

  const mensaje = "Bienvenido al Sistema de Transporte Estudiantil";
  const imagen = require('./polibus-logo-500h.png');

  useEffect(() => {
    const fetchConductor = async () => {
      try {
        const storedUser = await AsyncStorage.getItem('usuario');
        const token = await AsyncStorage.getItem('token');
        
        if (!storedUser || !token) {
          navigation.navigate('Login');
          return;
        }

        const userData = JSON.parse(storedUser);
        const conductorId = userData.id;

        const response = await axios.get(
          `${process.env.EXPO_PUBLIC_API_URL}/conductores/${conductorId}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );

        setConductor(response.data);
      } catch (error) {
        Alert.alert("Error", "No se pudo cargar la información del conductor");
      } finally {
        setLoading(false);
      }
    };

    fetchConductor();
  }, [navigation]);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#001f5b" />
        <Text>Cargando datos del conductor...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Encabezado />
      
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.contentContainer}>
          {/* Barra lateral solo en desktop */}
          {!isMobile && conductor && (
            <BarraLateral
              userName={`${conductor.nombre} ${conductor.apellido}`}
              userRole={conductor.role || "Conductor"}
              userIcon="https://cdn-icons-png.flaticon.com/128/1464/1464721.png"
              menuItems={menuItems}
            />
          )}

          {/* Contenido principal */}
          <View style={styles.mainContent}>
            <ConductorBienvenida mensaje={mensaje} imagen={imagen} />
            
            {/* Menú alternativo para móviles */}
            {isMobile && conductor && (
              <View style={styles.mobileMenu}>
                {menuItems.map((item, index) => (
                  <TouchableOpacity
                    key={index}
                    style={styles.menuButton}
                    onPress={() => navigation.navigate(item.link)}
                  >
                    <Text style={styles.menuButtonText}>{item.label}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContainer: {
    flexGrow: 1,
  },
  contentContainer: {
    flex: 1,
    flexDirection: isMobile ? 'column' : 'row',
  },
  mainContent: {
    flex: 1,
    padding: isMobile ? 10 : 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mobileMenu: {
    marginTop: 20,
    borderTopWidth: 1,
    borderTopColor: '#ccc',
    paddingTop: 20,
  },
  menuButton: {
    backgroundColor: '#001f5b',
    padding: 15,
    borderRadius: 8,
    marginVertical: 5,
  },
  menuButtonText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});

export default ConductorPantallaInicio;