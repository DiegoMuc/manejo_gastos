import App from "./App";
import { PaperProvider } from 'react-native-paper';

export default function RootLayout() {
  return (
    <PaperProvider>
      <App /> 
    </PaperProvider>
  )
}
