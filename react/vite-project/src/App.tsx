// App.jsx
import ContactList from "./components/ContactList";
import Navbar from "./components/navbar";

function App() {
  return (
    <div>
      <Navbar></Navbar>
      <hr/>
      <ContactList></ContactList>
    </div>
  );
}

export default App;
