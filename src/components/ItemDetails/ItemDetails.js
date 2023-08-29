import './ItemDetails.scss'
import backLogo from '../../assets/images/arrow_back-24px.svg'
import editButton from '../../assets/images/edit-24px-white.svg'
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';



function ItemDetails() {
    const [item, setItem] = useState([])
    const { id } = useParams()

    function handleBackButton () {
        window.location.replace('/inventory')
    }

    function handleEditButton () {
        window.location.replace('/edititem/' + id)
    }

    const url = 'https://database-backend-brainstation-70fdd396b787.herokuapp.com/api/inventories/' + id
    useEffect(() => {
        axios.get(url)
            .then(response => {
                setItem(response.data);
            })
            .catch(error => {
                console.log("axios call failed", error);
            });
    }, [])

    if (item.length === 0) {
        return (
            <>
                <h1>Loading...</h1>
            </>
        )
    }
    else {
        let inStock;
        item[0].quantity != 0 ? inStock = true : inStock = false
        return (
            <div className='item-details'>
                <section className='item-details__top'>
                    <div className='item-details__back-button' onClick={handleBackButton}><img src={backLogo} alt='button used to go back'/></div>
                    <h1 className='item-details__h1'>{item[0].item_name}</h1>
                    <div className='item-details__edit-button' onClick={handleEditButton}><img src={editButton} alt='button used to edit one item' /></div>
                </section>
                <section className='item-details__bottom'>
                    <div className='item-details__left-column'>
                        <p className='item-details__title'>ITEM DESCRIPTION:</p>
                        <p className='item-details__description'>{item[0].description}</p>
                        <p className='item-details__category-title'>CATEGORY:</p>
                        <p className='item-details__category-value'>{item[0].category}</p>
                    </div>
                    <div className='item-details__right-column'>
                        <div className='item-details__status-container'>
                            <div className='item-details__status-left'>
                                <p className='item-details__status-title'>Status</p>
                                {inStock ? <p className='item-details__status-value-green'>In Stock</p> : <p className='item-details__status-value-red'>Out of stock</p>}
                            </div>
                            <div className='item-details__status-right'>
                                <p className='item-details__quantity-title'>Quantity</p>
                                <p className='item-details__quantity-value'>{item[0].quantity}</p>
                            </div>
                        </div>
                        <p className='item-details__warehouse-title'>WAREHOUSE:</p>
                        <p className='item-details__warehouse-value'>{item[0].warehouse_name}</p>
                    </div>
                </section>
            </div>
        )
    }
}

export default ItemDetails;