import "./Chat.css";

function Chat() {
    return (
        <div className="chat">

            <div className="hero">

                <h1>RetailPulse AI</h1>

                <p>
                    SQL Analytics & Business Intelligence Assistant
                </p>

            </div>

            <div className="suggestions">

                <div className="card">
                    📊 Show Monthly Revenue
                </div>

                <div className="card">
                    📦 Low Stock Products
                </div>

                <div className="card">
                    👥 Top Customers
                </div>

                <div className="card">
                    💰 Profit by Category
                </div>

            </div>

            <div className="prompt-box">

                <input
                    type="text"
                    placeholder="Ask about your business..."
                />

                <button>
                    Analyze
                </button>

            </div>

        </div>
    );
}

export default Chat;