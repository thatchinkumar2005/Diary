import { BrowserRouter, Route, Routes } from "react-router-dom";
import RequireAuth from "../features/auth/RequireAuth";
import { GlobalStyles } from "../ui/GlobalStyles";
import PublicAppLayout from "../components/PublicAppLayout";
import PublicHome from "../pages/Public/PublicHome";
import { UserContextProvider } from "../contexts/UserContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Login from "../pages/Public/Login";
import Register from "../pages/Public/Register";
import AskToVerify from "../pages/Public/AskToVerify";
import Verify from "../features/auth/Verify";
import Diaries from "../pages/Secure/Diaries";
import AppLayout from "../components/AppLayout";
import CreateJournal from "../pages/Secure/CreateJournal";
import PersistenLogin from "../features/auth/PersistenLogin";
import EditJournal from "../pages/Secure/EditJournal";
import User from "../pages/Secure/User";
import Logout from "../features/auth/Logout";
import Diary from "../pages/Secure/Diary";
import EditUserPage from "../pages/Secure/EditUserPage";

function App() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 0,
      },
    },
  });
  return (
    <>
      <GlobalStyles />
      <QueryClientProvider client={queryClient}>
        <UserContextProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<PublicAppLayout />}>
                <Route index element={<PublicHome />} />
                <Route path="/auth/login" element={<Login />} />
                <Route path="/auth/register" element={<Register />} />
                <Route path="/auth/verify/:mailToken" element={<Verify />} />
              </Route>
              <Route path="/auth/verify" element={<AskToVerify />} />
              <Route element={<PersistenLogin />}>
                <Route element={<RequireAuth />}>
                  <Route element={<AppLayout />}>
                    <Route path="/diaries" element={<Diaries />} />
                    <Route path="/diaries/create" element={<CreateJournal />} />
                    <Route path="/diaries/edit/:id" element={<EditJournal />} />
                    <Route path="diaries/:id" element={<Diary />} />
                    <Route path="/user" element={<User />} />
                    <Route path="/auth/logout" element={<Logout />} />
                    <Route path="/user/edit/:edit" element={<EditUserPage />} />
                  </Route>
                </Route>
              </Route>
            </Routes>
          </BrowserRouter>
        </UserContextProvider>
      </QueryClientProvider>
    </>
  );
}

export default App;
