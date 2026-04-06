import Navbar from "./components/Navbar";
import AllRoute from "./route/AllRoute";
import appStore from "./redux/appStore";
import { Provider } from "react-redux";

function App() {
  return (
    <>
      <Provider store={appStore}>
        <AllRoute />
      </Provider>
    </>
  );
}

export default App;
