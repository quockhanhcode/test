import "./App.css";
import Typography from "./components/Typography";
import Field from "./components/Field";
import Rate from "./components/Rate";
import Drag from "./components/Drag";
function App() {
  return (
    <div className="App">
      <Typography />
      <Field></Field>
      <Rate></Rate>
      <Drag></Drag>
    </div>
  );
}

export default App;
