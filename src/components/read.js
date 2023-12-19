import { useEffect, useState } from "react";
import axios from "axios";
import TradingCards from "./tradingcards";
import Button from 'react-bootstrap/Button';
import './Create.css';

function Read() {
    // State variables for storing trading card data, sorting order, and sorted data
    const [data, setData] = useState([]);
    const [sortOrder, setSortOrder] = useState('asc'); // 'asc' or 'desc'
    const [sortedData, setSortedData] = useState([]);

    // Function to sort trading card data based on card name and sorting order
    const sortData = (order, tradingCardsData) => {
        const sorted = [...tradingCardsData].sort((a, b) => {
            const nameA = a.cardname.toLowerCase();
            const nameB = b.cardname.toLowerCase();
            return order === 'asc' ? nameA.localeCompare(nameB) : nameB.localeCompare(nameA);
        });
        setSortedData(sorted);
    };

    // Fetch trading card data from the server on component mount
    useEffect(() => {
        axios.get('http://localhost:4000/api/tradingcards')
            .then((response) => {
                setData(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    // Effect to re-sort data whenever sortOrder or data changes
    useEffect(() => {
        sortData(sortOrder, data);
    }, [sortOrder, data]);

    // Function to reload trading card data from the server
    const Reload = () => {
        axios.get('http://localhost:4000/api/tradingcards')
            .then((response) => {
                setData(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    // Render the Read component with a heading, sort button, and TradingCards component
    return (
        <>
            <div>
                <h1>This is a database of cards from the trading card game Magic: The Gathering</h1>
                <h2>Please use the edit button if you see any issues or problems with cards</h2>
            </div>
            <div>
                {/* Button to toggle sorting order */}
                <Button variant="warning" onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}>
                    Sort by Name
                </Button>
                <div>
                    {/* Display the TradingCards component with sorted data and reload function */}
                    <TradingCards myTradingCards={sortedData} ReloadData={Reload}></TradingCards>
                </div>
            </div>
        </>
    );
}

export default Read;
