import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import ForgotPassword from "./pages/ForgotPassword";
import PostDoubt from "./pages/PostDoubt";
import FindMentors from "./pages/FindMentors";
import Sessions from "./pages/Sessions";
import Profile from "./pages/Profile";
import MentorRequests from "./pages/MentorRequest";
import ViewDoubts from "./pages/ViewDoubts";
import MyDoubts from "./pages/MyDoubts";
import BookSession from "./pages/BookSession";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route
          path="/forgot-password"
          element={<ForgotPassword />}
        />
        <Route
          path="/post-doubt"
          element={<PostDoubt />}
        />
        <Route
          path="/find-mentors"
          element={<FindMentors />}
        />
        <Route
          path="/sessions"
          element={<Sessions />}
        />
        <Route
          path="/profile"
          element={<Profile />}
        />
        <Route
          path="/mentor-requests"
          element={<MentorRequests />}
        />
        <Route
  path="/view-doubts"
  element={<ViewDoubts />}
/>
<Route
  path="/my-doubts"
  element={<MyDoubts />}
/>
<Route
  path="/test"
  element={<h1>TEST ROUTE WORKING</h1>}
/>
<Route
  path="/book-session"
  element={<BookSession />}
/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;