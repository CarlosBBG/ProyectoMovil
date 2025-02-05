import React, { useState } from "react";
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  Image, 
  StyleSheet, 
  Dimensions,
  Alert,
  SafeAreaView,
  ScrollView,
  KeyboardAvoidingView,
  Platform
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
// Agrega esta línea en la sección de imports
import AsyncStorage from '@react-native-async-storage/async-storage';

const { width, height } = Dimensions.get("window");

const InicioSesion = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
        console.log("URL:", process.env.EXPO_PUBLIC_API_URL);
      const response = await axios.post(`${process.env.EXPO_PUBLIC_API_URL}/login`, {
        correo: email,
        password: password,
      });

      const { token, ...user } = response.data;
      
      // Guardar en AsyncStorage (reemplazo de localStorage)
      // Necesitarás instalar @react-native-async-storage/async-storage
      await AsyncStorage.setItem('usuario', JSON.stringify(user));
      await AsyncStorage.setItem('token', token);

      Alert.alert("Bienvenido", "Inicio de sesión exitoso");

      // Navegación basada en rol
      if (user.role === 'admin') {
        navigation.navigate('Administrador');
      } else if (user.role === 'conductor') {
        navigation.navigate('Conductor');
      } else if (user.role === 'estudiante') {
        navigation.navigate('Estudiante');
      }
    } catch (error) {
      console.error('Error:', error);
      Alert.alert(
        "Error",
        error.response?.status === 401 
          ? "Correo o contraseña incorrectos" 
          : "Error en el servidor"
      );
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
      >
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <View style={styles.logoContainer}>
            <Image
              source={{ uri: "https://ici2st.epn.edu.ec/eventosAnteriores/ICI2ST2023/images/ici2st2023/Logo_EPN.png" }}
              style={styles.logoEPN}
              resizeMode="contain"
            />
            <Text style={styles.tituloPrincipal}>SISTEMA DE TRANSPORTE ESTUDIANTIL</Text>
            <Image
              source={{ uri: "/polibus-logo-500h.png" }}
              style={styles.logoSecundario}
              resizeMode="contain"
            />
          </View>

          <View style={styles.formContainer}>
            <Text style={styles.tituloFormulario}>Iniciar Sesión</Text>
            
            <View style={styles.formGroup}>
              <Text style={styles.label}>Correo</Text>
              <TextInput
                style={styles.input}
                placeholder="alguien@example.com"
                keyboardType="email-address"
                autoCapitalize="none"
                value={email}
                onChangeText={setEmail}
              />
            </View>

            <View style={styles.formGroup}>
              <Text style={styles.label}>Contraseña</Text>
              <TextInput
                style={styles.input}
                placeholder="Contraseña"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
              />
            </View>

            <TouchableOpacity 
              style={styles.boton}
              onPress={handleLogin}
            >
              <Text style={styles.botonTexto}>Ingresar</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.registroLink}
              onPress={() => navigation.navigate("Registro")}
            >
              <Text style={styles.registroTexto}>
                ¿No estás registrado?{" "}
                <Text style={styles.registroLinkTexto}>Regístrate</Text>
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#fff",
  },
  container: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
  },
  logoContainer: {
    alignItems: "center",
    padding: 20,
  },
  logoEPN: {
    width: 150,
    height: 150,
    marginBottom: 10,
  },
  tituloPrincipal: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#001F5B",
    textAlign: "center",
    marginVertical: 10,
  },
  logoSecundario: {
    width: 200,
    height: 100,
    marginTop: 20,
  },
  formContainer: {
    padding: 40,
    borderTopWidth: 1,
    borderColor: "#CCC",
  },
  tituloFormulario: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#001F5B",
    textAlign: "center",
    marginBottom: 30,
  },
  formGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    color: "#333",
    marginBottom: 8,
    marginLeft: 10,
  },
  input: {
    backgroundColor: "#FFF",
    borderWidth: 2,
    borderColor: "#CCC",
    borderRadius: 30,
    padding: 15,
    fontSize: 16,
  },
  boton: {
    backgroundColor: "#001F5B",
    borderRadius: 30,
    padding: 15,
    marginTop: 20,
    alignItems: "center",
  },
  botonTexto: {
    color: "#FFF",
    fontSize: 18,
    fontWeight: "bold",
  },
  registroLink: {
    marginTop: 20,
    alignItems: "center",
  },
  registroTexto: {
    color: "#666",
  },
  registroLinkTexto: {
    color: "#001F5B",
    fontWeight: "bold",
    textDecorationLine: "underline",
  },
});

export default InicioSesion;