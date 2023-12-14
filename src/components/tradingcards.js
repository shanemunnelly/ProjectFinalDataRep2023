import TradingCardItem from "./tradingcardItem";

function TradingCards(props){

    return props.myTradingCards.map(
        (tradingcard)=>{
            return <TradingCardItem myTradingCard={tradingcard} key={tradingcard._id} Reload={()=>{props.ReloadData();}}></TradingCardItem>
        }
    );

}

export default TradingCards;