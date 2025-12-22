import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./Layout";
import {
  Academia,
  Business,
  City,
  ContactForm,
  Entrepreneurship,
  Home,
  IndRefrences,
  NotFoundPage,
  PrivacyAndPolicies,
  ProjectGallery,
  Student,
  Team,
} from "./pages";
import ReferencesPage from "./pages/References/References";
import AIC from "./pages/AIC/AIC";
import Login from "./pages/Login/Login";
import Register from "./components/auth/RegsiterComponent";
import ProtectedWrapper from "./components/ProtectedWrapper";
import CreateProjectForm from "./components/createFormProject/createFormProject";
import Verify from "./pages/verify/verify";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            element={
              <ProtectedWrapper>
                <Layout />
              </ProtectedWrapper>
            }
          >
            <Route index element={<Home />} />
            <Route path="/academia" element={<Academia />} />
            <Route path="/student" element={<Student />} />
            <Route path="/privacy-policy" element={<PrivacyAndPolicies />} />
            <Route path="/business" element={<Business />} />
            <Route path="/sip" element={<Entrepreneurship />} />
            <Route path="/aiC" element={<AIC />} />
            <Route path="/project" element={<ProjectGallery />} />
            <Route path="*" element={<NotFoundPage />} />
            <Route path="/city" element={<City />} />
            <Route path="/post-your-offer" element={<ContactForm />} />
            <Route path="/our-teams" element={<Team />} />
            <Route path="/references" element={<ReferencesPage />} />
            <Route path="/references" element={<ReferencesPage />} />
            <Route path="/references/:id" element={<IndRefrences />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Register />} />
            <Route path="/project/create" element={<CreateProjectForm />} />
            <Route path="/verify" element={<Verify />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
