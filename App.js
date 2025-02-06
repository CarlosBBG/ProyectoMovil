import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import RegistroEstudiantes from './Vistas/RegistroEstudiantes';
import InicioSesion from './Componentes/InicioSesion';
import ConductorPantallaInicio from './Vistas/ConductorPantallaInicio';
import ConductorIniciarRuta from './Vistas/ConductorIniciarRuta';
import ConductorRutaCheck from './Vistas/ConductorRutaCheck';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={InicioSesion} />
        <Stack.Screen 
          name="Registro" 
          component={RegistroEstudiantes}
          options={{ title: 'Registro de Estudiantes' }}
        />
        <Stack.Screen name="Conductor" component={ConductorPantallaInicio} />
        <Stack.Screen name="ConductorIniciarRuta" component={ConductorIniciarRuta} />
        <Stack.Screen name="ConductorRutaCheck" component={ConductorRutaCheck} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}