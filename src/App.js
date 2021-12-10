import { useState, useEffect } from "react";
import useLocalStorageState from "use-local-storage-state";

const App = () => {
   const[num, setNum] = useLocalStorageState('num',[]);
   const[max, setMax] = useLocalStorageState("max", '');
   const[rand, setRand] = useState(0);
   const[raffle, setRaffle] = useState(null);
   const[loading, setLoading] = useState(false);


   const handleOnChange = (e) =>{
     let temp = e.target.value;
    setMax(temp);
    console.log(max, "max1");
   }
   

   const randomName = () => {
    
    let temp = Math.floor(Math.random() * num.length);
setRaffle(num[temp]);
   }

   const handleOnClick = () =>{

     

setLoading(true);

     
    let temp = Math.floor(Math.random() * num.length);
     setDeceleratingTimeout(randomName, 10, 30);
  
    setTimeout(() => {
      setLoading(false);
      clearInterval();
      setRand(num[temp]);
    }, 3000);

   }
console.log(num, "num");

   useEffect(() => {
     //max is sent as a string so we have to convert it
    let temp = Number(max);

    console.log(typeof temp, "max2");
    setNum(Array(temp).fill().map((_, i) => i+1));
   
     
   }, [max, setNum]);

   useEffect(() => {
     let temp = num.filter(el => el !== rand);
    setNum(temp);
    if(num.length === 1){
      setMax('');
    }

   }, [rand]);



  
  function setDeceleratingTimeout(callback,factor, times) {
    const internalCallback = ((t, counter) => {
      return () => {
        if (--t > 0) {
          setTimeout(internalCallback, ++counter * factor);
          callback();
        }
      };
    })(times, 0);
  
    setTimeout(internalCallback, factor);
  }

  useEffect(() => {
    setInterval(makeSnow, 60);
  }, []);
 

function makeSnow() {
	const snow = document.createElement("div");
	const size = Math.random() * 4.5 + 3.5;
	snow.className = "snow";
	snow.style.width = size + "px";
	snow.style.height = size + "px";
	snow.style.left = Math.random() * window.innerWidth -30 + "px";
	snow.style.opacity = size / 8;
	if (size < 7) {
		snow.style.zIndex = -5;
	}
	snow.style.animationDuration = Math.random() * 4 + 3+ "s";
	document.body.appendChild(snow);
	setTimeout(() => snow.remove(), 2800);
}

  
  
  return (
    <>
      <div className="container">
      <div className="window">
		<div className="santa">
			<div className="head">
				<div className="face">
					<div className="redhat">
						<div className="whitepart"></div>
						<div className="redpart"></div>
						<div className="hatball"></div>
					</div>
					<div className="eyes"></div>
					<div className="beard">
						<div className="nouse"></div>
						<div className="mouth"></div>
					</div>
				</div>
				<div className="ears"></div>
			</div>
			<div className="body"></div>
		</div>
	</div>


 
        <div className="section">
        <div>
    <h1>Omnicom media group Nepal presents Secret Santa</h1>
  </div>
        <div className="section-one">
          <label htmlFor="quantity">How many santas do we have?</label>
          <input type="number" id="quantity" name="quantity" min="1" onChange={handleOnChange} value={max}/>
        </div>
        <div className="section-two">
          <h2>You are SECRET SANTA of:</h2>
          <div className="random">{loading ? raffle : rand}</div>
          <button onClick={handleOnClick} disabled={loading} className="btn">Roll</button>
        </div>
        <div className="display">
          <ul className="display-list">
          {
          num.map((el, index) =>{
            return(
            <li key={index}>{el}</li>
          )})
          }
          </ul>
        </div>
        </div>
      </div>

      
    </>
  );
}

export default App;
