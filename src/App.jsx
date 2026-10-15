import { BrowserRouter } from 'react-router-dom';
import { Layout } from './components/Layout';
// Adjust these import paths if your files are in different folders
import { MyProvider } from './MyProvider'; 
import Child from './Child'; 

function App() {
  return (
    // The Provider MUST wrap everything that needs access to the context
    <MyProvider>
      <BrowserRouter>
        {/* If you are testing the Child component, it goes inside here */}
        <Child /> 
        <Layout />
      </BrowserRouter>
    </MyProvider>
  );
}

export default App;