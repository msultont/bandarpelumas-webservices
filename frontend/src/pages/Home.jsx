import { useEffect, useState } from "react";
import Hero from "../components/Hero";
import Stats from "../components/Stats";
import Services from "../components/Services";
import Features from "../components/Features";
import Testimonials from "../components/Testimonials";
import FAQ from "../components/FAQ";
import api from "../lib/api";

export default function Home() {
    const [serverInfo, setServerInfo] = useState(null);

    useEffect(() => {
        // Contact backend GET / on every homepage visit
        api.get("/")
            .then((res) => {
                console.log("[Home] Backend response:", res.data);
                setServerInfo(res.data);
            })
            .catch((err) => {
                console.error("[Home] Backend unreachable:", err.message);
            });
    }, []);

    return (
        <>
            <Hero />
            <Stats />
            <Services />
            <Features />
            <Testimonials />
            <FAQ />
        </>
    );
}
