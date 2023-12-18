import React, { useState, useEffect } from 'react';

const MetaCriticRatingComponent = ({ rating }) => {
    const [displayRating, setDisplayRating] = useState(0);

    useEffect(() => {
        // Animate the rating reveal
        const interval = setInterval(() => {
            setDisplayRating(prev => {
                if (prev < rating) return prev + 1;
                clearInterval(interval);
                return rating;
            });
        }, 20); // Adjust speed of the animation

        return () => clearInterval(interval);
    }, [rating]);

    return (
        <div className={`text-lg font-bold ${getRatingColor(rating)}`}>
            {displayRating}
        </div>
    );
};

const getRatingColor = (rating) => {
    if (rating >= 75) return 'text-green-600';
    if (rating >= 50) return 'text-yellow-600';
    return 'text-red-600';
};

export default MetaCriticRatingComponent;
