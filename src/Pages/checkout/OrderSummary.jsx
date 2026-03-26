import { useState } from "react";
import dayjs from "dayjs";
import { formatMoney } from "../../utils/Money";
import { DeliveryOptions } from "./DeliveryOptions";
import axios from "axios";

// Separate component so each cart item has its own quantity state
function CartItem({ cartItem, selectedDeliveryOption, deliveryOptions, loadCart }) {
    const [quantity, setQuantity] = useState(cartItem.quantity);
    const [isEditing, setIsEditing] = useState(false);

    const deleteCartItem = async () => {
        await axios.delete(`https://ecommerce-project-5oie.onrender.com/api/cart-items/${cartItem.productId}`);
        await loadCart();
    };

    
    const updateCartItem = async () => {
        await axios.put(`https://ecommerce-project-5oie.onrender.com/api/cart-items/${cartItem.productId}`, {
            quantity: quantity,
        });
        await loadCart();
        setIsEditing(false);
    };

    return (
        <div className="cart-item-container">
            <div className="delivery-date">
                
                Delivery date: {dayjs(selectedDeliveryOption.estimatedDeliveryTimeMs).format('dddd, MMMM D')}
            </div>

            <div className="cart-item-details-grid">
                <img className="product-image" src={cartItem.product.image} alt={cartItem.product.name} />

                <div className="cart-item-details">
                    <div className="product-name">{cartItem.product.name}</div>
                    <div className="product-price">{formatMoney(cartItem.product.priceCents)}</div>

                    <div className="product-quantity">
                        {isEditing ? (
                           
                            <>
                                <span>Quantity: </span>
                                <input
                                    type="number"
                                    min="1"
                                    value={quantity}
                                    onChange={(e) => setQuantity(Number(e.target.value))}
                                    style={{ width: "50px", marginRight: "8px" }}
                                />
                                <span
                                    className="update-quantity-link link-primary"
                                    onClick={updateCartItem}
                                >
                                    Save
                                </span>
                                <span
                                    className="delete-quantity-link link-primary"
                                    onClick={() => {
                                        setQuantity(cartItem.quantity); // reset to original
                                        setIsEditing(false);
                                    }}
                                    style={{ marginLeft: "8px" }}
                                >
                                    Cancel
                                </span>
                            </>
                        ) : (
                            
                            <>
                                <span>
                                    Quantity: <span className="quantity-label">{cartItem.quantity}</span>
                                </span>
                                <span
                                    className="update-quantity-link link-primary"
                                    onClick={() => setIsEditing(true)}
                                >
                                    Update
                                </span>
                                <span
                                    className="delete-quantity-link link-primary"
                                    onClick={deleteCartItem}
                                >
                                    Delete
                                </span>
                            </>
                        )}
                    </div>
                </div>

                <DeliveryOptions cartItem={cartItem} deliveryOptions={deliveryOptions} loadCart={loadCart} />
            </div>
        </div>
    );
}

export function OrderSummary({ cart, deliveryOptions, loadCart }) {
    return (
        <div className="order-summary">
            {deliveryOptions.length > 0 && cart.map((cartItem) => {
                const selectedDeliveryOption = deliveryOptions.find(
                    (deliveryOption) => deliveryOption.id === cartItem.deliveryOptionId
                );

                return (
                    <CartItem
                        key={cartItem.productId}
                        cartItem={cartItem}
                        selectedDeliveryOption={selectedDeliveryOption}
                        deliveryOptions={deliveryOptions}
                        loadCart={loadCart}
                    />
                );
            })}
        </div>
    );
}