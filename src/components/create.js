import { useState, useEffect } from "react";
import axios from "axios";
import './Create.css';

function Create() {
    // Initialize state variables using the useState hook for each input field and pop-up display
    const [cardname, setCardName] = useState('');
    const [cardart, setCardArt] = useState('');
    const [cardpower, setPower] = useState('');
    const [cardtoughness, setToughness] = useState('');
    const [artist, setArtist] = useState('');
    const [showPopup, setShowPopup] = useState(false);

    // Handle form submission by preventing the default form behavior
    const handleSubmit = (e) => {
        e.preventDefault();

        // Create an object with the form data
        const tradingcard = {
            cardname: cardname,
            cardart: cardart,
            cardpower: cardpower,
            cardtoughness: cardtoughness,
            artist: artist
        };

        // Send a POST request to the server with the trading card data
        axios.post('http://localhost:4000/api/tradingcard', tradingcard)
            .then(() => {
                // If successful, display a pop-up message, reset form fields, and reload the page
                setShowPopup(true);
                setCardName('');
                setCardArt('');
                setPower('');
                setToughness('');
                setArtist('');
            })
            .catch((error) => {
                // Log any errors to the console
                console.log(error);
            });
    }

    // Use the useEffect hook to manage the pop-up duration and page reload
    useEffect(() => {
        // If the showPopup state is true, set a timeout to hide the pop-up and reload the page after 2 seconds
        if (showPopup) {
            setTimeout(() => {
                setShowPopup(false);
                window.location.reload(); // Refresh the page
            }, 2000); // Set the duration of the pop-up (in milliseconds)
        }
    }, [showPopup]);

    // Render the form and pop-up components
    return (
        <div className="centered-form">
            <h2>Please Enter the details of the card you would like to add to this database</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Add Trading Card Name: </label>
                    <input
                        type="text"
                        className="form-control"
                        value={cardname}
                        onChange={(e) => { setCardName(e.target.value) }}
                    />
                </div>
                <div className="form-group">
                    <label>Add Trading Card Art: </label>
                    <input
                        type="text"
                        className="form-control"
                        value={cardart}
                        onChange={(e) => { setCardArt(e.target.value) }}
                    />
                </div>
                <div className="form-group">
                    <label>Add Trading Card Power: </label>
                    <input
                        type="text"
                        className="form-control"
                        value={cardpower}
                        onChange={(e) => { setPower(e.target.value) }}
                    />
                </div>
                <div className="form-group">
                    <label>Add Trading Card Toughness: </label>
                    <input
                        type="text"
                        className="form-control"
                        value={cardtoughness}
                        onChange={(e) => { setToughness(e.target.value) }}
                    />
                </div>
                <div className="form-group">
                    <label>Add Trading Card Artist: </label>
                    <input
                        type="text"
                        className="form-control"
                        value={artist}
                        onChange={(e) => { setArtist(e.target.value) }}
                    />
                </div>
                <div>
                <input type="submit" value="Add TradingCard" />
                </div>
            </form>

            {showPopup && (
                <div className="popup">
                    <p>Thank you for adding a card!</p>
                </div>
            )}
        </div>
    );
}

export default Create;