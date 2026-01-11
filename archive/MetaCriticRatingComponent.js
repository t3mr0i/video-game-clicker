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

    // Function to determine the color based on the rating score
    const getRatingColor = (rating) => {
        if (rating >= 75) return 'bg-green-500';
        if (rating >= 50) return 'bg-yellow-500';
        return 'bg-red-500';
    };

    const ratingColor = getRatingColor(rating);

    return (
        rating && (
            <div className={`rounded-md shadow-lg p-4 ${ratingColor} text-white text-center`}>
                <div className="text-4xl font-bold" style={{ fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif" }}>
                    {Math.ceil(displayRating)}
                </div>            </div>
        )
    );
};

export default MetaCriticRatingComponent;
