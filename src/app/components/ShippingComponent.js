import React from 'react';
import Modal from 'react-modal';
import 'tailwindcss/tailwind.css';


const ShippingComponent = ({ isModalOpen, closeModal, game, publishers, shipGame, calculateUpfrontPayment, calculateRevenueShare, addNotification }) => {
    // Randomly select three publishers
    const selectedPublishers = publishers.sort(() => 0.5 - Math.random()).slice(0, 3);
    const handleShipGame = (publisherName) => {
        shipGame(game.id, publisherName);
        closeModal(); // Close the modal after shipping
        addNotification(`Game ${game.name} shipped with ${publisherName || 'self-publishing'}.`, 'info');
    };

    return (
        <Modal isOpen={isModalOpen} onRequestClose={closeModal} className="bg-white rounded-lg p-6 mx-auto my-12 border max-w-xl">
            <h2 className="text-lg font-bold mb-4 text-gray-800">Shipping Options for {game.name}</h2>
            {selectedPublishers.map((publisher, index) => {
                const upfrontPayment = calculateUpfrontPayment(game, publisher);
                const revenueShare = calculateRevenueShare(publisher);

                return (
                    <div key={index} className="publisher-offer mb-4">
                        {/* Placeholder for image */}
                        <div className="mb-3 w-16 h-16 bg-gray-200 rounded-full"></div>

                        <h3 className="text-md font-semibold text-gray-800">{publisher.name}</h3>
                        <p className="text-gray-700">Upfront Payment: ${upfrontPayment.toFixed(2)}</p>
                        <p className="text-gray-700">Revenue Share: {revenueShare.toFixed(2)}%</p>
                        <button
                            onClick={() => handleShipGame(publisher.name)}
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-2"
                        >
                            Ship with {publisher.name}
                        </button>
                    </div>
                );
            })}
            <button
                onClick={() => shipGame(game.id, null)}
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mt-2"
            >
                Self Publish
            </button>
        </Modal>
    );
};

export default ShippingComponent;
