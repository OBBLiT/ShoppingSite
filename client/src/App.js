import "./App.css";
import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Outlet } from "react-router-dom";
import Home from "./Pages/Home";
import Loading from "./Pages/Tools/loading";
import Admin, { AdminSuccess, AdminHome } from "./Pages/Admin/Admin";
import AdminAddItems from "./Pages/Admin/AddItems";
import AdminItems from "./Pages/Admin/Items";
import AdminSettings from "./Pages/Admin/Settings";
import AdminUsers from "./Pages/Admin/Users";
import AdminEditItems from "./Pages/Admin/EditItems";
import AdminDeleteItems from "./Pages/Admin/DeleteItems";
import Item from "./Pages/Item";
function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [hello, setHello] = useState("Nothing Yet");
  useEffect(() => {
    fetch("/api")
      .then((res) => {
        return res.json();
      })
      .then((dat) => {
        setHello(dat);
        setIsLoading(false);
        console.log(dat);
      });
  }, []);
  return (
    <Router>
      <Routes>
        <Route index element={<Home />} />
        <Route path=":id" element={<Item />} />
        <Route
          path="/admin"
          element={
            <>
              <Outlet></Outlet>
            </>
          }
        >
          <Route index element={<Admin />} />
          <Route path=":id" element={<AdminSuccess />}>
            <Route index element={<AdminHome />} />
            <Route path="items/:id" element={<Item />} />
            <Route path="items" element={<AdminItems />} />
            <Route path="users" element={<AdminUsers />} />
            <Route path="settings" element={<AdminSettings />} />
            <Route path="additems" element={<AdminAddItems />} />
            <Route path="edititems" element={<AdminEditItems />} />
            <Route path="deleteitems" element={<AdminDeleteItems />} />
          </Route>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
