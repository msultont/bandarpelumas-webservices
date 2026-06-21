import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";
import Home from "./pages/Home";
import About from "./pages/About";
import Spareparts from "./pages/Spareparts";
import "./App.css";

export default function App() {
	return (
		<BrowserRouter>
			<div className="app">
				<Header />
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/about" element={<About />} />
					<Route path="/spareparts" element={<Spareparts />} />
				</Routes>
				<Footer />
				<ScrollToTop />
			</div>
		</BrowserRouter>
	);
}
