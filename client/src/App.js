import NavBar from "./components/NavBar";
import "./styles/App.css";
import { useEffect, useState } from "react";
import Login from "./components/Login";
import StudentTable from "./components/tables/StudentTable";
import Verticalnav from "./components/VerticalNav";
import Table from "./components/tables/Table";
import TeachersTable from "./components/tables/TeachersTable";
import TableFilter from "./components/tables/TableFilter";
import MarksTable from "./components/tables/MarksTable";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainTable from "./components/MainTable";
import EditStudent from "./components/editing/EditStudent";
import { useCookies } from "react-cookie";
import { Cookies } from "react-cookie";
import axios from "axios";
import jwt_decode from "jwt-decode";
import AddStudent from "./components/editing/AddStudent";
axios.defaults.withCredentials = true;

function App() {
  const [showLogin, setShowLogin] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [table, setTable] = useState("Students");
  const [cookis, setCookies] = useCookies(["accessToken", "refreshToken"]);

  const cookie = new Cookies();
  const checkLoginCookie = () => {
    try {
      axios({
        method: "post",
        url: "http://localhost:3000/api/users/refresh",
        headers: {
          authorization: cookie.get("refreshToken"),
        },
      })
        .then((res) => {
          console.log("Hellooooo", res.data.auth);
          setIsAuthenticated(res.data.auth);
          console.log(res.data.auth);
        })
        .then(() => {
          const token = cookie.get("accesstoken");
          const decodedUser = jwt_decode(token);
          setUser(decodedUser);
        })
        .catch((err) => {});
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    checkLoginCookie();
  }, []);

  const authenticator = (status) => {
    if (status === false) setUser(null);
    setIsAuthenticated(status);
  };
  const triggerLoginPage = (status) => {
    setShowLogin(status);
  };

  const selectTable = (tableName) => {
    setTable(tableName);
  };

  let tab;
  if (table === "Students") {
    tab = <StudentTable authStatus={isAuthenticated} />;
  } else if (table === "Teachers") {
    tab = <TeachersTable authStatus={isAuthenticated} />;
  } else if (table === "Marks") {
    tab = <MarksTable authStatus={isAuthenticated} />;
  }

  return (
    <Router>
      <div className="App flex flex-col w-full">
        <NavBar
          showLogin={triggerLoginPage}
          authStatus={isAuthenticated}
          getLogout={authenticator}
          user={user}
        />
        <div className="flex w-screen h-full">
          {/* {isAuthenticated && <Verticalnav sendTable={selectTable} />} */}

          {!isAuthenticated ? (
            <Login
              showLogin={triggerLoginPage}
              auth={authenticator}
              user={setUser}
            />
          ) : (
            <>
              <Verticalnav sendTable={selectTable} />
              <Routes>
                {/* <div>
                <div className="w-full">{tab}</div>
              </div> */}
                <Route
                  path="/"
                  element={
                    <MainTable
                      table={table}
                      auth={isAuthenticated}
                      verifyAuth={authenticator}
                    />
                  }
                />
                <Route
                  path="/students/add"
                  element={<AddStudent verifyAuth={authenticator} />}
                />
                <Route path="/student/:id" element={<EditStudent />} />
                {/* <MainTable table={table} auth={isAuthenticated} /> */}
              </Routes>
            </>
          )}
        </div>
      </div>
    </Router>
  );
}

export default App;
