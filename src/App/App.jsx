import Router from "./Router";
import { useEffect } from "react";

const App = () => {
  useEffect(() => {
    if (window.AOS) {
      window.AOS.init({
        duration: 1000,
        once: false,
      });

      window.AOS.refresh();
    }
  }, []);
  return <Router />;
};

export default App;
