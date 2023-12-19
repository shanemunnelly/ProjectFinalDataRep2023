import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import axios from 'axios';

function TradingCardItem(props) {
    return (
        <div className="centered">
            <Card>
                <Card.Header>{props.myTradingCard.cardname}</Card.Header>
                <Card.Body>
                    <blockquote className="blockquote mb-0">
                        <img
                            height={300}
                            width={300}
                            src={props.myTradingCard.cardart}
                            alt="Card Art"
                            className="rounded"
                        />
                        <p>
                            Power: {props.myTradingCard.cardpower} Toughness:{' '}
                            {props.myTradingCard.cardtoughness}
                        </p>
                        <footer>By {props.myTradingCard.artist}</footer>
                    </blockquote>
                </Card.Body>
                <Link to={'/edit/' + props.myTradingCard._id} className="button1">
                    Edit
                </Link>
                <Button
                    variant="warning"
                    className='button2'
                    onClick={(e) => {
                        e.preventDefault();
                        // This requests to Deletes the card
                        axios
                            .delete('http://localhost:4000/api/tradingcard/' + props.myTradingCard._id)
                            .then((res) => {
                                // Reloads the page after successful deletion
                                let reload = props.Reload();
                            })
                            .catch();
                    }}
                >
                    Delete
                </Button>
            </Card>
        </div>
    );
}

export default TradingCardItem;
