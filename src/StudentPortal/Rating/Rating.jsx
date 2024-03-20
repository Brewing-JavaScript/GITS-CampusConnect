

import React, { useState, useEffect } from 'react';

function Rating() {
    const [review, setReview] = useState('');
    const [reviews, setReviews] = useState([]);
    const [showReviews, setShowReviews] = useState(true);
    const [rating, setRating] = useState(0);

    useEffect(() => {
        // Retrieve reviews from local storage if available
        const storedReviews = JSON.parse(localStorage.getItem('reviews'));
        if (storedReviews) {
            setReviews(storedReviews);
        }

        // Retrieve rating from local storage if available
        const storedRating = localStorage.getItem('rating');
        if (storedRating) {
            setRating(parseInt(storedRating));
        }
    }, []);

    const handleInputChange = (event) => {
        setReview(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (review.trim() !== '') {
            const newReview = { content: review, rating };
            setReviews([...reviews, newReview]);
            setReview('');

            // Update local storage with new reviews
            localStorage.setItem('reviews', JSON.stringify([...reviews, newReview]));
        }
    };

    const toggleReviews = () => {
        setShowReviews(!showReviews);
    };

    // Function to handle star rating
    const handleStarClick = (selectedRating) => {
        setRating(selectedRating);
    };

    // Function to display stars for rating
    const renderStars = () => {
        const stars = [];
        for (let i = 1; i <= 5; i++) {
            stars.push(
                <span
                    key={i}
                    className={`cursor-pointer text-2xl ${i <= rating ? 'text-yellow-500' : 'text-gray-300'}`}
                    onClick={() => handleStarClick(i)}
                >
                    {i <= rating ? '★' : '☆'}
                </span>
            );
        }
        return stars;
    };

    return (
        <article>
            {/* Star rating section */}
            <div className="flex items-center space-x-2">
                {renderStars()}
            </div>
            {/* Review form */}
            {showReviews && (
                <div>
                    <form onSubmit={handleSubmit}>
                        <textarea
                            value={review}
                            onChange={handleInputChange}
                            placeholder="Write your review..."
                            className="w-full p-2 mb-4 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
                        ></textarea>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
                        >
                            Add Review
                        </button>
                    </form>
                    {/* Display existing reviews */}
                    {reviews.length > 0 && (
                        <div className="mt-4 space-y-2">
                            <h2 className="text-lg font-semibold">Reviews:</h2>
                            <ol>
                                {reviews.map((reviewObj, index) => (
                                    <li key={index} className="mb-2 flex">
                                        <span className="font-bold mr-2 text-black">{index + 1}.</span>
                                        <span>{reviewObj.content}</span>
                                        <span className="ml-2">
                                            {Array.from({ length: reviewObj.rating }, (_, i) => (
                                                <span key={i} className="text-yellow-500 text-2xl">★</span>
                                            ))}
                                        </span>
                                    </li>
                                ))}
                            </ol>
                        </div>
                    )}
                </div>
            )}
            {/* Close button */}
            <button
                onClick={toggleReviews}
                className="mt-4 text-gray-500 hover:text-gray-700 focus:outline-none"
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>
        </article>
    );
}

export default Rating;














