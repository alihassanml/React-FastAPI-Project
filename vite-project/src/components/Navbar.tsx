import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/css/bootstrap-grid.css'
import './App.css'
import { useNavigate } from "react-router-dom";


export default function Home() {
  const navigate = useNavigate();

 

  function goModel(){
    navigate('/')
  }
  const gosupplier = () =>{
    navigate('/supplier')
  }
  const goproduct = () =>{
    navigate('/index')
  }
  const goaddproduct = () => {
    navigate('/addproduct')
  }
  function AddSupplier(){
    navigate('/AddSupplier')
  }
  function GoClient(){
    navigate('/DisplayClient')
  }


  

  return (
    <>
      <nav  className="navbar  navbar-expand-lg navbar-dark" style={{backgroundColor:'#24292F',height:'70px',top:'0'}}>
        <div className="container-fluid">
          <a className="navbar-brand" href="#" style={{color:'  rgb(175, 173, 173)'}}>
            React
          </a>
          <button
            className="navbar-toggler" 
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a href='' className="nav-link " onClick={goModel} aria-current="page">
                  Home
                </a>
              </li>
             
              
              <li className="nav-item">
                <a href="#" className="nav-link " onClick={gosupplier} aria-disabled="true">
                 Supplier
                </a>
              </li>
              <li className="nav-item">
                <a href="#" className="nav-link " onClick={goproduct }>Product</a>
              </li>
              <li className="nav-item">
                <a href="#" className="nav-link " onClick={AddSupplier}>Add supplier</a>
              </li>

              <li className="nav-item">
                <a href="#" className="nav-link " onClick={GoClient}>Client</a>
              </li>
            </ul>
            <form className="d-flex" role="search">
              
              <button className="btn btn-outline-secondary" onClick={goaddproduct} type="submit" style={{width:'120px',height:'40px'}}>
                Add Product
              </button>
              <button  className="btn btn-outline-secondary mx-4" type="submit" style={{width:'135px',height:'40px'}}>
              <a href="https://alihassanml.streamlit.app/" target='blank' style={{textDecoration:'None'}}>Google Gemini </a>
              </button>
            </form>
          </div>
        </div>
      </nav>
    
    </>
    
  );
}
