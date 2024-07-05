import { useEffect } from "react";
import "./App.css";
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useNavigate } from 'react-router-dom';

function Home() {

  let navigate = useNavigate()
  const GoIndex = () => {
    navigate('/index');
  }
  const goproduct = () =>{
    navigate('/index')
  }
  const gosupplier = () =>{
    navigate('/supplier')
  }

  function GoClient(){
    navigate('/DisplayClient')
  }


  useEffect(() => {
    AOS.init({duration:3000})
  },[])
  return (
    <div className="home-1" >
      <nav className="nav-1" data-aos="fade-left">
        <a  className="nav-2 nav-2-1" onClick={GoIndex}>Home</a>  
        <a className="nav-2" onClick={goproduct}>Product</a>  
        <a  className="nav-2" onClick={ gosupplier}>Supplier</a>  
        <a  className="nav-2" onClick={ GoClient}>Client</a>  
      </nav>
      <ul className="main-1">
        <ul style={{display:'flex'}}>
        <h5 className="main-2" data-aos = "zoom-in">Inventory <br /> Management <br /> Interface</h5>
        </ul>
        <ul style={{display:'flex'}}>
        </ul>

      </ul>
      <ul style={{display:'flex'}}>
        <p className="txet-home-fl" data-aos="fade-right">This project involves creating a web application using FastAPI for the backend and React for the frontend. The application manages three main entities: Supplier, Client, and Product</p>
        <p className="txet-home-fl">
          <button className="main-6" onClick={GoIndex} data-aos="fade-up">Click To Home</button>
        </p>
      </ul>
    </div>
  );
}

export default Home;
