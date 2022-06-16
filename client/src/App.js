import NavBar from "./components/NavBar";
import "./styles/App.css";
import { useState } from "react";
import Login from "./components/Login";
import StudentTable from "./components/tables/StudentTable";
import Verticalnav from "./components/VerticalNav";
import Table from "./components/tables/Table";
import TeachersTable from "./components/tables/TeachersTable";

function App() {
  const [showLogin, setShowLogin] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [table, setTable] = useState("");
  const authenticator = (status) => {
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
  } else {
    tab = <TeachersTable authStatus={isAuthenticated} />;
  }

  return (
    <div className="App">
      <NavBar
        showLogin={triggerLoginPage}
        authStatus={isAuthenticated}
        user={user}
      />
      <div className="flex w-full h-full">
        <Verticalnav sendTable={selectTable} />

        {!isAuthenticated ? (
          <Login
            showLogin={triggerLoginPage}
            auth={authenticator}
            user={setUser}
          />
        ) : (
          <div className="w-full">{tab}</div>
        )}
      </div>
    </div>
  );
}

export default App;
