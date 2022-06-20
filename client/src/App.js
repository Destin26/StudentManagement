import NavBar from "./components/NavBar";
import "./styles/App.css";
import { useState } from "react";
import Login from "./components/Login";
import StudentTable from "./components/tables/StudentTable";
import Verticalnav from "./components/VerticalNav";
import Table from "./components/tables/Table";
import TeachersTable from "./components/tables/TeachersTable";
import TableFilter from "./components/tables/TableFilter";
import MarksTable from "./components/tables/MarksTable";

function App() {
  const [showLogin, setShowLogin] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [table, setTable] = useState("Students");
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
  } else if (table === "Teachers") {
    tab = <TeachersTable authStatus={isAuthenticated} />;
  } else if (table === "Marks") {
    tab = <MarksTable authStatus={isAuthenticated} />;
  }

  return (
    <div className="App flex flex-col w-full">
      <NavBar
        showLogin={triggerLoginPage}
        authStatus={isAuthenticated}
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
            <div>
              <div className="w-full">{tab}</div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default App;
