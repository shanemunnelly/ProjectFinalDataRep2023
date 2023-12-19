import TradingCardItem from "./tradingcardItem";

function TradingCards(props) {
    // Map/array of trading cards and TradingCardItem for each
    return props.myTradingCards.map(
        (tradingcard) => {
            //specific trading card item and key for the card
            return <TradingCardItem
                myTradingCard={tradingcard}  
                key={tradingcard._id}        // Provide a unique key for React to update the list
                Reload={() => {              // Pass a callback function to reload data when needed
                    props.ReloadData();      
                }}
            ></TradingCardItem>
        }
    );
}

export default TradingCards;
