import React, { useRef, useState } from 'react';
import './HappyCustomers.scss';

const customerReviews = [
    { name: 'Sarah M.', review: "I'm blown away by the quality...", stars: 5 },
    { name: 'Alex K.', review: "Finding clothes that align...", stars: 5 },
    { name: 'James L.', review: "As someone who's always...", stars: 5 },
    { name: 'Emily R.', review: "I love the variety and quality...", stars: 5 },
    { name: 'Michael T.', review: "Great customer service...", stars: 4 },
    { name: 'Anna P.', review: "A wide selection of trendy...", stars: 5 },
    { name: 'John D.', review: "I found the perfect outfit...", stars: 5 },
    { name: 'Sophia W.', review: "Fashion-forward and affordable...", stars: 5 }
    // Add more reviews as needed
];

const HappyCustomers = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const sliderRef = useRef(null);

    const handleNext = () => {
        if (currentIndex < customerReviews.length - 3) {
            setCurrentIndex(currentIndex + 1);
        }
    };

    const handlePrev = () => {
        if (currentIndex > 0) {
            setCurrentIndex(currentIndex - 1);
        }
    };

    const translateValue = -(currentIndex * (100 / 3)); // Adjust for 3 items per view

    return (
        <div className="happy-customers container">
            <div className="happy-customers__header">
                <h2>Our Happy Customers</h2>
            </div>
            <div className="happy-customers__slider-container">
                <div
                    className="happy-customers__slider"
                    ref={sliderRef}
                    style={{ transform: `translateX(${translateValue}%)` }}
                >
                    {customerReviews.map((customer, index) => (
                        <div className="happy-customers__card" key={index}>
                            <div className="happy-customers__stars">
                                {Array.from({ length: customer.stars }).map((_, i) => (
                                    <svg key={i} viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
                                        <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                                    </svg>
                                ))}
                            </div>
                            <div className="happy-customers__info">
                                <div className="happy-customers__name">{customer.name}</div>
                                <div className="happy-customers__verified-icon">
                                    <svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
                                        <path d="M12 0C5.37 0 0 5.37 0 12s5.37 12 12 12 12-5.37 12-12S18.63 0 12 0zM10 17.93l-4.57-4.57 1.41-1.41L10 15.1l7.17-7.17 1.41 1.41L10 17.93z" />
                                    </svg>
                                </div>
                            </div>
                            <div className="happy-customers__description">
                                {customer.review}
                            </div>
                        </div>
                    ))}
                </div>
                <div className="happy-customers__nav">
                    <div className="happy-customers__nav-button" onClick={handlePrev}>
                        &lt;
                    </div>
                    <div className="happy-customers__nav-button" onClick={handleNext}>
                        &gt;
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HappyCustomers;