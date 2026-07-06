import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";
import Home from "./pages/Home";
import About from "./pages/About";
import Spareparts from "./pages/Spareparts";
import Contact from "./pages/Contact";

export default function App() {
	return (
		<BrowserRouter>
			<div className="app">
				<Header />
				<Routes>
					<Route
						path={`${import.meta.env.BASE_URL}`}
						element={<Home />}
					/>
					<Route
						path={`${import.meta.env.BASE_URL}about`}
						element={<About />}
					/>
					<Route
						path={`${import.meta.env.BASE_URL}marketplace`}
						element={<Spareparts />}
					/>
					<Route
						path={`${import.meta.env.BASE_URL}contact`}
						element={<Contact />}
					/>
				</Routes>
				<Footer />
				<ScrollToTop />
			</div>
		</BrowserRouter>
	);
}
