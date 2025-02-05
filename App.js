import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import RegistroEstudiantes from './Vistas/RegistroEstudiantes';
import InicioSesion from './Componentes/InicioSesion';
import ConductorBienvenida from './Componentes/ConductorBienvenida';

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
        <Stack.Screen name="Conductor" component={ConductorBienvenida} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}