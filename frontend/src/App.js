import {Redirect, Route, Switch} from "react-router-dom";
import {useSelector} from "react-redux";

// Containers
import Login from "./containers/Login/Login";
import Register from "./containers/Register/Register";
import Dashboard from "./containers/Dashboard/Dashboard";
import ShareCalendar from "./containers/ShareCalendar/ShareCalendar";
import Collaborators from "./containers/Collaborators/Collaborators";

// Components
import Layout from "./components/UI/Layout/Layout";
import NewEvent from "./containers/NewEvent/NewEvent";
import EditEvent from "./containers/EditEvent/EditEvent";

const ProtectedRoute = ({isAllowed, redirectTo, ...props}) => {
  return isAllowed ?
    <Route {...props}/> :
    <Redirect to={redirectTo}/>
};

const App = () => {
  const user = useSelector(state => state.users.user);

  return (
    <Layout>
      <Switch>
        <ProtectedRoute
          isAllowed={!user}
          redirectTo="/"
          path="/login"
          component={Login}
        />
        <ProtectedRoute
          isAllowed={!user}
          redirectTo="/"
          path="/register"
          component={Register}
        />
        <ProtectedRoute
          exact
          isAllowed={user}
          redirectTo="/login"
          path="/"
          component={Dashboard}
        />
        <ProtectedRoute
          isAllowed={user}
          redirectTo="/login"
          path="/share-calendar"
          component={ShareCalendar}
        />
        <ProtectedRoute
          isAllowed={user}
          redirectTo="/login"
          path="/collaborators"
          component={Collaborators}
        />
        <ProtectedRoute
            isAllowed={user}
            redirectTo="/login"
            path="/new-event"
            component={NewEvent}
        />
        <ProtectedRoute
            isAllowed={user}
            redirectTo="/login"
            path="/edit-event/:id"
            component={EditEvent}
        />
      </Switch>
    </Layout>
  );
}

export default App;
