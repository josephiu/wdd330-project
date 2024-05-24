import {fetchCryptoPrices, handleSearch, handleSort, handleSignup, setupCharts } from './enhancements.js';




document.addEventListener('DOMContentLoaded', () => {
    fetchCryptoPrices();
    setupCharts();
    
    document.getElementById('search').addEventListener('input', handleSearch);
    document.getElementById('sort').addEventListener('change', handleSort);
    document.getElementById('signup-form').addEventListener('submit', handleSignup);

    // Learn More button functionality
    const learnMoreBtn = document.getElementById('learn-more-btn');
    const learnMoreText = document.getElementById('learn-more-text');

    learnMoreBtn.addEventListener('click', () => {
        if (learnMoreText.style.display === 'none') {
            learnMoreText.style.display = 'block';
            learnMoreBtn.innerText = 'Show Less';
        } else {
            learnMoreText.style.display = 'none';
            learnMoreBtn.innerText = 'Learn More';
        }
    });

 

        const hamButton = document.getElementById('hamburger-menu');
        const navigation = document.getElementById('myNav');

        hamButton.addEventListener('click', () => {
        navigation.classList.toggle('open');
        hamButton.classList.toggle('open');
    });

    



});












