import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import 'tailwindcss/tailwind.css';

const ShippingComponent = ({ isModalOpen, closeModal, game, publishers = [], shipGame, calculateUpfrontPayment, calculateRevenueShare, addNotification }) => {
    const [selectedPublishers, setSelectedPublishers] = useState([]);

    useEffect(() => {
        // Randomly select three publishers when the modal is opened
        if (isModalOpen && publishers && publishers.length > 0) {
            const selectPublishers = () => publishers.sort(() => 0.5 - Math.random()).slice(0, Math.min(3, publishers.length));
            setSelectedPublishers(selectPublishers());
        }
    }, [isModalOpen, publishers]); // This effect should run only when the modal opens or publishers list changes

    const handleShipGame = (publisherName) => {
        if (!game || !game.id) {
            console.error("Cannot ship game: game object or game ID is undefined");
            addNotification && addNotification("Error shipping game: Missing game data", "error");
            closeModal && closeModal();
            return;
        }
        
        shipGame && shipGame(game.id, publisherName);
        closeModal && closeModal(); // Close the modal after shipping
        addNotification && addNotification(`Game ${game.name || 'Unknown'} shipped with ${publisherName || 'self-publishing'}.`, 'info');
    };

    // If game is undefined, don't render the modal
    if (!game) {
        return null;
    }

    return (
        <Modal isOpen={isModalOpen} onRequestClose={closeModal} className="bg-white rounded-lg p-6 mx-auto my-12 border max-w-xl">
            <h2 className="text-lg font-bold mb-4 text-gray-800">Shipping Options for {game?.name || 'Your Game'}</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                {selectedPublishers && selectedPublishers.length > 0 ? (
                    selectedPublishers.map((publisher, index) => {
                        if (!publisher) return null;
                        
                        const upfrontPayment = calculateUpfrontPayment && game ? calculateUpfrontPayment(game, publisher) : 0;
                        const revenueShare = calculateRevenueShare && publisher ? calculateRevenueShare(publisher) : 0;

                        return (
                            <div key={index} className="publisher-offer bg-gray-50 p-4 rounded-lg shadow-sm border border-gray-200">
                                <div className="flex flex-col items-center">
                                    {publisher.imageName && (
                                        <img 
                                            src={`/images/publishers/${publisher.imageName}`} 
                                            alt={publisher.name || 'Publisher'} 
                                            className="mb-3 w-16 h-16 rounded-full" 
                                            onError={(e) => {
                                                e.target.onerror = null;
                                                e.target.src = '/images/placeholder.png';
                                            }}
                                        />
                                    )}

                                    <h3 className="text-md font-semibold text-gray-800">{publisher.name || 'Publisher'}</h3>
                                    <p className="text-gray-700">Upfront Payment: ${typeof upfrontPayment === 'number' ? upfrontPayment.toFixed(2) : '0.00'}</p>
                                    <p className="text-gray-700">Revenue Share: {typeof revenueShare === 'number' ? revenueShare.toFixed(2) : '0'}%</p>
                                    <button
                                        onClick={() => handleShipGame(publisher.name)}
                                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-2 w-full text-center"
                                    >
                                        Ship with {publisher.name || 'Publisher'}
                                    </button>
                                </div>
                            </div>
                        );
                    })
                ) : (
                    <div className="col-span-3 text-gray-700 mb-4 text-center">No publishers available at this time.</div>
                )}
            </div>
            
            <div className="text-center">
                <button
                    onClick={() => handleShipGame(null)}
                    className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mt-2"
                >
                    Self Publish
                </button>
            </div>
        </Modal>
    );
};

export default ShippingComponent;
