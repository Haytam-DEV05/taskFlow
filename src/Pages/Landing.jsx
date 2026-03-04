import Navbar from "../Components/Templates/Navbar";
import Home from "../Components/Sections/Home" ;
import Solution from "../Components/Sections/Solution" ;
import Pricing from "../Components/Sections/Pricing" ;
import Footer from "../Components/Templates/Footer";

export default function Landing() {
  return (
    <>
      <Navbar />
      <Home />
      <Solution />
      <Pricing />
      <Footer />
    </>
  );
}
