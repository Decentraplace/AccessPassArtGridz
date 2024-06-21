import ColorPixels from './components/ColorPixels.js';
import { ThirdwebProvider } from "@thirdweb-dev/react";
import { Base } from "@thirdweb-dev/chains";
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import logow from './styles/logow.png';
import logo from './styles/logo.png';
import React from "react";
import Scene from "./land.js";
import "./styles/Home.css";
import Leaderboard from './components/Leaderboard.js';


export default function Home() {

  const linkStyle = {
    textDecoration: "none",
    color: "white",
    fontSize: "16px",
    fontWeight: "bold",
    transition: "color 0.3s", // Add transition for smooth color change
  };
  
  // Add hover effect
  linkStyle[':hover'] = {
    color: "#67e4a4", // Change color on hover
    fontSize:"19px",
  };
  

  return (
    <ThirdwebProvider
      activeChain={Base}
      clientId=""
    >
      <main className="main">
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
          <Router>
            <div style={{ position: "fixed", top: "0", left: "0", width: "100%", zIndex: "2" }}>
              <div style={{ display: "flex", flexDirection: "row", height: "80px", alignItems: "center", background: "#D4F7E5" }}>
                <img src={logo} alt="Logo" style={{ marginLeft: "10px", width: "60px", height: "60px" }} />
                <nav>
                  <ul style={{ display: "flex", flexDirection: "row", listStyleType: "none", padding: 0, marginLeft: "20px" }}>
                    <li style={{ marginRight: "20px" }}>
                      <Link to="/" className="link">HOME</Link>
                    </li>
                    <li style={{ position: "relative", marginRight: "20px" }}>
                      <Link to="/color-pixels" className="link">COLOR PIXELS</Link>
                     
                    </li>
                    <li style={{ position: "relative", marginRight: "20px" }}>
                      <Link to="/leaderboard" className="link">LEADERBOARD</Link>
                     
                    </li>
                  </ul>
                </nav>
              </div>
            </div>
            <Routes>
            <Route exact path="/" element={<Scene/>} />
              <Route path="/color-pixels" element={<ColorPixels />} />
              <Route path="/leaderboard" element={<Leaderboard/>} />
            </Routes>
          </Router>
        </div>
      </main>
      <footer>
       <div style={{display:"flex", flexDirection:"column"}}>
       <img src={logow} alt="Description of the image" width={"100vw"} />
        <h1 style={
          {fontSize: "4rem"}
        } class= "logo">ArtGridz</h1>
        
       </div>

       <div class="row">
            <div class="col-3">           
            </div>
           
          
       </div>
       <div style={{display:"flex", flexDirection:"column"}}>
       <span class="logos">by</span>
            <span class="logo" style={{fontSize:"0.9rem"}}>DECENTR/PLACE</span>
            <span class="logoss">STUDIOS</span>
            </div>
       <div id="copyright">
           &copy;ArtGridz by Decentraplace STUDIOS | All Rights Reserved 2024
       </div>
       <div id="owner">
        
           <span>
              follow us on X: <a href="https://twitter.com/artgridz">@artgridz</a>
           </span>
       </div>
    </footer>
    </ThirdwebProvider>
  );
}
