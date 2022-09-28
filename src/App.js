import CardForm from "./components/CardForm";
import CardImage from "./components/CardImage";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="container">
      <div className="main">
        <aside className="sidebar">
          <CardImage />
        </aside>
        <div className="content">
          <CardForm />
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default App;
