import './App.css';
import AuthProvider from './context/AuthContext';
import Layout from "./pages/Layout";

function App() {
  return (
    <AuthProvider>
        <Layout/>
    </AuthProvider>
  );
}

export default App;
