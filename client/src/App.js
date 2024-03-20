import logo from './logo.svg';
import './App.css';
import Form from './components/Form';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Submissions } from './components/Submissions';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route
            path="/form"
            element={<Form />}
          />
          <Route
            path="/submissions"
            element={<Submissions />}
          />
        </Routes>
    </Router>
    </>
  );
}

export default App;
