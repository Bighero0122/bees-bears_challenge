import { ChakraProvider } from "@chakra-ui/react";
import { WizardLayout } from "./components/WizardLayout";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <ChakraProvider>
      <WizardLayout />
      <ToastContainer position="top-right" autoClose={5000} />
    </ChakraProvider>
  );
}

export default App;
