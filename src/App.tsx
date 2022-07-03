import { ErrorBoundary } from "react-error-boundary";
import { ErrorFallback } from "./components";
import { ListContainer as UsersListContainer } from "./containers/Users";
import Container from '@mui/material/Container';
function App() {
  const handleError = (error: Error, info: { componentStack: string }) => {
    console.log(error);
    console.log(info);
  };

  return (
    <ErrorBoundary FallbackComponent={ErrorFallback} onError={handleError}>
      <Container maxWidth={"sm"}>
        <UsersListContainer />
      </Container>
    </ErrorBoundary>
  );
}

export default App;
