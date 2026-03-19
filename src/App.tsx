import { lazy, Suspense } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import { PageLayout } from "./components";

// Lazy load page components
const HomePage = lazy(() => import("./pages/HomePage"));
const AboutPage = lazy(() => import("./pages/AboutPage"));
const ServicesPage = lazy(() => import("./pages/ServicesPage"));
const ProductsPage = lazy(() => import("./pages/ProductsPage"));
const ContactPage = lazy(() => import("./pages/ContactPage"));
const ComponentShowcase = lazy(
  () => import("./components/demo/ComponentShowcase"),
);

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PageLayout />}>
          <Route
            index
            element={
              <Suspense fallback={<div>Loading...</div>}>
                <HomePage />
              </Suspense>
            }
          />
          <Route
            path="/a-propos"
            element={
              <Suspense fallback={<div>Loading...</div>}>
                <AboutPage />
              </Suspense>
            }
          />
          <Route
            path="/services"
            element={
              <Suspense fallback={<div>Loading...</div>}>
                <ServicesPage />
              </Suspense>
            }
          />
          <Route
            path="/produits"
            element={
              <Suspense fallback={<div>Loading...</div>}>
                <ProductsPage />
              </Suspense>
            }
          />
          <Route
            path="/contact"
            element={
              <Suspense fallback={<div>Loading...</div>}>
                <ContactPage />
              </Suspense>
            }
          />
          <Route
            path="demo"
            element={
              <Suspense fallback={<div>Loading...</div>}>
                <ComponentShowcase />
              </Suspense>
            }
          />
        </Route>
        <Route path="*" element={<Navigate to={"/"} replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
