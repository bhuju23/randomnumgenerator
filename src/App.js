import { useState, useEffect } from "react";
import useLocalStorageState from "use-local-storage-state";

const App = () => {
   const[num, setNum] = useLocalStorageState('num',[]);
   const[max, setMax] = useLocalStorageState("max", '');
   const[rand, setRand] = useState(null);
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
  
  
  return (
    <>
      <div>
        <div>
          <label htmlFor="quantity">Max number:</label>
          <input type="number" id="quantity" name="quantity" min="1" onChange={handleOnChange} value={max}/>
        </div>
        <div>
          <h2>And the number is:</h2>
          <div>{loading ? raffle : rand}</div>
          <button onClick={handleOnClick} disabled={loading}>Roll</button>
        </div>
        <div>
          <ul>
          {
          num.map((el, index) =>{
            return(
            <li key={index}>{el}</li>
          )})
          }
          </ul>
        </div>
      </div>
    </>
  );
}

export default App;
