import { loadHeaderFooter, fetchCryptoPrices, handleSearch, handleSort, handleSignup, setupCharts } from './enhancements.js';

loadHeaderFooter();


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

    // Hamburger menu functionality
    // const hamburgerMenu = document.getElementById('hamburger-menu');
    // console.log(hamburgerMenu);
    // const navLinks = document.getElementById('myNav');

    // hamburgerMenu.addEventListener('click', () => {
    //     navLinks.classList.toggle('show');
    // });

        const hamButton = document.getElementById('hamburger-menu');
        const navigation = document.getElementById('myNavinside');

        hamButton.addEventListener('click', () => {
        navigation.classList.toggle('open');
        hamButton.classList.toggle('open');
    });

    



});












