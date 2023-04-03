import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./css/style.scss";

import IntroPage from "./IntroPage";
import Todo from "./Todo";
import SignIn from "./SignIn";
import SignUp from "./SignUp";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route ex path="/" element={<IntroPage />} />
          <Route path="/todo" element={<Todo />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
