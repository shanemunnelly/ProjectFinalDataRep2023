import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
function TradingCardItem(props) {

    return (
        <div>
            <Card>
                <Card.Header>{props.myTradingCard.title}</Card.Header>
                <Card.Body>
                    <blockquote className="blockquote mb-0">
                        <img src={props.myTradingCard.cover}></img>
                        <footer>
                            {props.myTradingCard.author 
                            }
                        </footer>
                    </blockquote>
                </Card.Body>
                <Link to={'/edit/'+props.myTradingCard._id} className='btn btn-primary'>Edit</Link>
                <Button variant='danger' onClick={
                    (e)=>{
                        e.preventDefault();

            axios.delete('http://localhost:4000/api/tradingcard/'+props.myTradingCard._id)
                        .then((res)=>{
                            let reload = props.Reload();
                        })
                        .catch();
                    }
                }>Delete</Button>
            </Card>
        
        </div>
    );

}

export default TradingCardItem;