import  Navbar  from "./Navbar";
import Client from "./Client";

function DisplayClient() {
  return (
    <>
    <div>
      <Navbar/>
        <div  style={{minHeight:'100vh',backgroundColor:'#0D1117'}}>
        <ul className="main-mine">
        <h1 className="main-2-text" style={{paddingLeft:'100px',paddingTop:'20px'}}>List Of Product</h1>
        
      </ul>
        <br />
      <Client/>

      </div>
    </div>

    </>
  );
}

export default DisplayClient
