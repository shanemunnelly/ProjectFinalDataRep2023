import { useEffect, useState } from "react";
import axios from "axios";
import TradingCards from "./tradingcards";

function Read() {
   
    const [data, setData] = useState([]);

  useEffect(
    ()=>{
        
        axios.get('http://localhost:4000/api/tradingcards')
        .then(
            (response)=>{
                setData(response.data)
            }
        )
        .catch(
            (error)=>{
                console.log(error);
            }
        )

    }, []
  );

  const Reload = (e)=>{
    axios.get('http://localhost:4000/api/tradingcards')
        .then(
            (response)=>{
                setData(response.data)
            }
        )
        .catch(
            (error)=>{
                console.log(error);
            }
        )
  }

    return (
        <div>
            <h2>Hello from Read Component!</h2>
            <TradingCards myTradingCards={data} ReloadData={Reload}></TradingCards>
        </div>
    );

}

export default Read;