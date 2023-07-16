import useAuthCheck from "./hooks/use-auth-check";
import MainLayout from "./layout/MainLayout";

function App() {
  const authCheck = useAuthCheck();
  return (
    <div>
      {!authCheck ? (
        <div
          className="d-flex align-items-center justify-content-center"
          style={{ height: "100vh" }}
        >
          <h2>Loading.....</h2>
        </div>
      ) : (
        <MainLayout />
      )}
    </div>
  );
}

export default App;
