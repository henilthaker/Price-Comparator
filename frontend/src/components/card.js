import { Link } from 'react-router-dom';
const Card = ({ item }) => {
    return (
        <div className="card">
            <Link to={item.link} target="_blank" rel="noopener noreferrer">
                <img src={item.image} className="card-img-top" alt="" />
                <div className="card-body">
                    <h5 className="card-title">{item.prod_name}</h5>
                    <div className="price-and-comment">
                        <span className="card-text">&#8377; {item.price}</span>
                    </div>
                </div>
            </Link>
        </div>
    )
}
export default Card;
