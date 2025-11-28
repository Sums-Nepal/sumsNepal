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

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="/academia" element={<Academia />} />
            <Route path="/student" element={<Student />} />
            <Route path="/privacy-policy" element={<PrivacyAndPolicies />} />
            <Route path="/business" element={<Business />} />
            <Route path="/entrepreneurship" element={<Entrepreneurship />} />
            <Route path="/project" element={<ProjectGallery />} />
            <Route path="*" element={<NotFoundPage />} />
            <Route path="/city" element={<City />} />
            <Route path="/post-your-offer" element={<ContactForm />} />
            <Route path="/our-teams" element={<Team />} />
            <Route path="/references" element={<ReferencesPage />} />
            <Route path="/references" element={<ReferencesPage />} />
            <Route path="/references/:id" element={<IndRefrences />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
