
import Applayout from './components/layout/AppLayout';
import { CryptoContextProvider } from './context/context'


const App = () => (
	<CryptoContextProvider>
	<Applayout/>
	</CryptoContextProvider>

);
export default App;
