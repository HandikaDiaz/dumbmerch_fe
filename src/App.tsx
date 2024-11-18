import { useEffect } from "react";
import { UserEntity } from "./entities/user-entity";
import { AppRouter } from "./routers"
import { setUser } from "./store/auth/auth-slice";
import { useAppDispatch } from "./store/hooks/global-hook"
import { apiV1 } from "./utils/api";
import Cookies from "js-cookie";
import { SearchProvider } from "./features/base/pages/search";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

declare global {
  interface Window {
    snap: any;
  }
}
function App() {
  const dispatch = useAppDispatch();

  async function checkAuth() {
    try {
      const { data } = await apiV1.get<null, { data: UserEntity }>("/auth/check", {
        headers: {
          Authorization: `Bearer ${Cookies.get("token")}`
        }
      });
      dispatch(setUser(data));
      toast.success("Successfully authenticated!");
    } catch (error) {
      toast.error("Authentication failed!");
      console.error(error);
    }
  }

  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <>
      <SearchProvider>
        <AppRouter />
      </SearchProvider>
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        closeOnClick draggable
        pauseOnHover />
    </>
  )
}

export default App
