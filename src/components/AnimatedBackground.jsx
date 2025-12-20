import Appname from "./Appname";

function AnimatedBackground() {
    return (
      <>
      
     
      <div className="wr">

        
      
        {Array.from({ length: 10 }).map((_, i) => (
          <div key={i} className="box"></div>
        ))}
      </div>
     
      </>
    );
  }
  
  export default AnimatedBackground;
  