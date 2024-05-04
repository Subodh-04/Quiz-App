import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Topic from "./pages/Topic";
import Question from "./pages/Question";
import Result from "./pages/Result";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home showLogin={false} />} />
          <Route path="/login" element={<Home showLogin />} />
          <Route path="/topic" element={<Topic />} />
          <Route path="/questions/:category" element={<Question />} />
          <Route path="/result/:points" element={<Result />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
