import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-modal';
import 'tailwindcss/tailwind.css';

const ShippingCelebrationModal = ({ isOpen, onClose, game, publisher }) => {
    if (!isOpen) return null;

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onClose}
            className="fixed inset-0 flex items-center justify-center z-50 outline-none focus:outline-none"
            overlayClassName="fixed inset-0 bg-black bg-opacity-50"
        >
            <div className="bg-white p-8 rounded-lg max-w-md text-center animate-bounce">
                <h2 className="text-3xl font-bold text-green-600 mb-4">Game Shipped!</h2>
                <h3 className="text-xl font-semibold mb-4">{game.name}</h3>
                {publisher ? (
                    <p className="text-lg mb-4">Shipped with {publisher}</p>
                ) : (
                    <p className="text-lg mb-4">Self-Published</p>
                )}
                <div className="flex justify-center mb-4">
                    <img
                        src="/images/celebration.gif"
                        alt="Celebration"
                        className="max-w-full h-auto"
                    />
                </div>
                <div className="flex justify-center space-x-4">
                    <button
                        onClick={onClose}
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    >
                        Continue
                    </button>
                </div>
            </div>
        </Modal>
    );
};

const ShippingComponent = ({
    isModalOpen,
    closeModal,
    game,
    publishers = [],
    shipGame,
    calculateUpfrontPayment,
    calculateRevenueShare,
    addNotification
}) => {
    const [selectedPublishers, setSelectedPublishers] = useState([]);
    const [celebrationModalOpen, setCelebrationModalOpen] = useState(false);
    const [shippedGame, setShippedGame] = useState(null);
    const [shippedPublisher, setShippedPublisher] = useState(null);

    useEffect(() => {
        if (isModalOpen && publishers && publishers.length > 0) {
            const selectPublishers = () => publishers.sort(() => 0.5 - Math.random()).slice(0, Math.min(3, publishers.length));
            setSelectedPublishers(selectPublishers());
        }
    }, [isModalOpen, publishers]);

    const handleShipGame = (publisherName) => {
        if (!game || !game.id) {
            console.error("Cannot ship game: game object or game ID is undefined");
            addNotification && addNotification("Error shipping game: Missing game data", "error");
            closeModal && closeModal();
            return;
        }

        shipGame && shipGame(game.id, publisherName);
        closeModal && closeModal();

        // Trigger celebration
        setShippedGame(game);
        setShippedPublisher(publisherName);
        setCelebrationModalOpen(true);

        addNotification && addNotification(`Game ${game.name || 'Unknown'} shipped with ${publisherName || 'self-publishing'}.`, 'info');
    };

    const closeCelebrationModal = () => {
        setCelebrationModalOpen(false);
        setShippedGame(null);
        setShippedPublisher(null);
    };

    if (!game) {
        return null;
    }

    return (
        <>
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

            <ShippingCelebrationModal
                isOpen={celebrationModalOpen}
                onClose={closeCelebrationModal}
                game={shippedGame}
                publisher={shippedPublisher}
            />
        </>
    );
};

ShippingCelebrationModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  game: PropTypes.shape({
    name: PropTypes.string.isRequired
  }),
  publisher: PropTypes.string
};

ShippingComponent.propTypes = {
  isModalOpen: PropTypes.bool.isRequired,
  closeModal: PropTypes.func.isRequired,
  game: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired
  }),
  publishers: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    imageName: PropTypes.string,
  })),
  shipGame: PropTypes.func.isRequired,
  calculateUpfrontPayment: PropTypes.func,
  calculateRevenueShare: PropTypes.func,
  addNotification: PropTypes.func
};

export default ShippingComponent;