import "./Tracking.css";

export function TrackingPage() {
    const params = new URLSearchParams(window.location.search);
    const name = params.get("name");
    const image = params.get("image");
    const quantity = params.get("quantity");
    const deliveryDate = new Date(Number(params.get("delivery")))
        .toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" });

    return (
        <>
            <title>Tracking</title>
            <div className="header">
                <div className="left-section">
                    <a href="/" className="header-link">
                        <img className="logo" src="images/logo-white.png" />
                        <img className="mobile-logo" src="images/mobile-logo-white.png" />
                    </a>
                </div>
                <div className="middle-section">
                    <input className="search-bar" type="text" placeholder="Search" />
                    <button className="search-button">
                        <img className="search-icon" src="images/icons/search-icon.png" />
                    </button>
                </div>
                <div className="right-section">
                    <a className="orders-link header-link" href="/orders">
                        <span className="orders-text">Orders</span>
                    </a>
                    <a className="cart-link header-link" href="/checkout">
                        <img className="cart-icon" src="images/icons/cart-icon.png" />
                        <div className="cart-quantity">3</div>
                        <div className="cart-text">Cart</div>
                    </a>
                </div>
            </div>
            <div className="tracking-page">
                <div className="order-tracking">
                    <a className="back-to-orders-link link-primary" href="/orders">
                        View all orders
                    </a>
                    <div className="delivery-date">
                        Arriving on {deliveryDate}
                    </div>
                    <div className="product-info">{name}</div>
                    <div className="product-info">Quantity: {quantity}</div>
                    <img className="product-image" src={image} />
                    <div className="progress-labels-container">
                        <div className="progress-label">Preparing</div>
                        <div className="progress-label current-status">Shipped</div>
                        <div className="progress-label">Delivered</div>
                    </div>
                    <div className="progress-bar-container">
                        <div className="progress-bar"></div>
                    </div>
                </div>
            </div>
        </>
    );
}
