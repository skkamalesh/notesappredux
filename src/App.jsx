import Home from "./Components/Home";
import Sidebar from "./Components/Sidebar";
import NotesContext from "./Context/NotesContext";

function App() {
  return (
    <div className="flex gap-6 ">
      <Sidebar />
      <NotesContext>
        <Home />
      </NotesContext>
    </div>
  );
}
export default App;
