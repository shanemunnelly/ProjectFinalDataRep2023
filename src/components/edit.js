import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Edit() {
    // This takes the id from the URL 
    let { id } = useParams();

    // Initialize state variables using the useState hook for each input field
    const [cardname, setCardName] = useState('');
    const [cardart, setCardArt] = useState('');
    const [cardpower, setPower] = useState('');
    const [cardtoughness, setToughness] = useState('');
    const [artist, setArtist] = useState('');

    // Access the navigate function from the useNavigate hook
    const navigate = useNavigate();

    // Use the useEffect hook to fetch the existing trading card data for editing
    useEffect(() => {
        axios.get('http://localhost:4000/api/tradingcard/' + id)
            .then((response) => {
                // Set state variables with the fetched data
                setCardName(response.data.cardname);
                setCardArt(response.data.cardart);
                setToughness(response.data.cardtoughness);
                setPower(response.data.cardpower);
                setArtist(response.data.artist);
            })
            .catch((error) => {
                console.log(error);
            });
    }, [id]); 

    // Handle form submission to update the trading card
    const handleSubmit = (e) => {
        e.preventDefault();

        // Create an object with the updated trading card data
        const tradingcard = {
            cardname: cardname,
            cardart: cardart,
            cardpower: cardpower,
            cardtoughness: cardtoughness,
            artist: artist
        }

        // Send a edit request to update the trading card on the server
        axios.put('http://localhost:4000/api/tradingcard/' + id, tradingcard)
            .then((res) => {
                // go to the 'read' page after successful update
                navigate('/read');
            })
            .catch((error) => {
                console.log(error);
            });
    }

    // form for editing trading card information
    return (
        <div>
            <h2>Please Make Any Corrections to the Cards If There is a Mistake</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Edit Trading Card Name: </label>
                    <input
                        type="text"
                        className="form-control"
                        value={cardname}
                        onChange={(e) => { setCardName(e.target.value) }}
                    />
                </div>
                <div className="form-group">
                    <label>Edit Trading Card Art: </label>
                    <input type="text"
                        className="form-control"
                        value={cardart}
                        onChange={(e) => { setCardArt(e.target.value) }}
                    />
                </div>
                <div className="form-group">
                    <label>Add Trading Card Power: </label>
                    <input type="text"
                        className="form-control"
                        value={cardpower}
                        onChange={(e) => { setPower(e.target.value) }}
                    />
                </div>
                <div className="form-group">
                    <label>Add Trading Card Toughness: </label>
                    <input type="text"
                        className="form-control"
                        value={cardtoughness}
                        onChange={(e) => { setToughness(e.target.value) }}
                    />
                </div>
                <div className="form-group">
                    <label>Edit Trading Card Artist: </label>
                    <input type="text"
                        className="form-control"
                        value={artist}
                        onChange={(e) => { setArtist(e.target.value) }}
                    />
                </div>
                <div>
                 <input
                        type="submit"
                        value="Edit TradingCard"
                    />
                </div>
            </form>
        </div>
    );
}