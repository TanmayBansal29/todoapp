import { Toaster } from "react-hot-toast";
import AppMainButtons from "./components/AppMainButtons";
import Title from "./components/Title";
import TodosList from "./components/TodosList";

function App() {
  return (
    <>
    <div className="flex w-[100%] max-w-[1200px] mx-auto justify-center items-center">
      <div className="max-w-[750px] my-0 w-[100%] mx-auto">
      <Title>TO-DO APP</Title>
        <AppMainButtons/>
        <TodosList />
      </div>
    </div>
    <Toaster
    position="top-right"
    toastOptions={{
      style: {
        fontSize: '1.1rem'
      }
    }}
    />
    </>
  );

}

export default App;
