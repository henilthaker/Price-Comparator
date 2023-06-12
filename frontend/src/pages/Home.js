import { useContext, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { ItemContext } from '../contexts/ItemContext';
import Card from '../components/card';
const Home = () => {
    const[is_loading, setIsLoading] = useState(false);
    const [search_item, setSearchItem] = useState('');
    const { item, dispatch } = useContext(ItemContext);
    const fetchItems = async () => {
        const url = `/api/items?s_key=${search_item}`;
        setIsLoading(true);
        const response = await fetch(url);
        const json = await response.json();
        dispatch({ type: 'SET_ITEM', payload: json });
        setIsLoading(false);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        fetchItems();
    }

    return (
        <>
            <form className="d-flex container my-4" role="search" onSubmit={handleSubmit}>
                <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"
                    value={search_item}
                    onChange={(e) => {
                        setSearchItem(e.target.value)
                    }}
                />
                <button className="btn btn-outline-success" type="submit">Search</button>
            </form>
            {is_loading && <div className="container">Loading...</div>}
            {
                item && item.map(single_item=>(
                    <Card key = {uuidv4()} item={single_item} />
                ))
            }
        </>
    )
}
export default Home;