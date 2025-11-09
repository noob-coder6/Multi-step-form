# Frontend Mentor - Multi-step form solution

This is a solution to the [Multi-step form challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/multistep-form-YVAnSdqQBJ). Frontend Mentor challenges help you improve your coding skills by building realistic projects.

## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
  - [Continued development](#continued-development)
- [Author](#author)

## Overview

### The challenge

Users should be able to:

- Complete each step of the sequence
- Go back to a previous step to update their selections
- See a summary of their selections on the final step and confirm their order
- View the optimal layout for the interface depending on their device's screen size
- See hover and focus states for all interactive elements on the page
- Receive form validation messages if:
  - A field has been missed
  - The email address is not formatted correctly
  - A step is submitted, but no selection has been made

### Links

- Solution URL: [Solution URL](https://github.com/noob-coder6/Multi-step-form.git)
- Live Site URL: [Live site URL](https://noob-coder6.github.io/Multi-step-form/)

## My process

### Built with

- Semantic HTML5 markup
- CSS custom properties
- Flexbox
- CSS Grid
- Mobile-first workflow
- Vanilla JavaScript

### What I learned

This project helped me strengthen my understanding of:

**Multi-step form logic**: Managing state across different form steps and maintaining data consistency throughout the user journey.

```js
const formData = {
    plan: 'arcade',
    billing: 'monthly',
    addons: []
};
```

**Form validation**: Implementing real-time validation with user-friendly error messages.

```js
const validateStep1 = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.value)) {
        showError(email, 'Valid email required');
        return false;
    }
    return true;
};
```

**Dynamic pricing**: Toggling between monthly and yearly billing cycles and updating prices across multiple components.

```js
const price = plan.querySelector('input').dataset[isYearly ? 'priceYearly' : 'priceMonthly'];
priceEl.textContent = isYearly ? `$${price}/yr` : `$${price}/mo`;
```

**Responsive design**: Creating a mobile-first layout that adapts beautifully to desktop screens using CSS Grid.

```css
@media (min-width: 768px) {
  .form-container {
    display: grid;
    grid-template-columns: 274px 1fr;
    gap: 6.25rem;
  }
}
```

### Continued development

Areas I want to focus on in future projects:

- Implementing form data persistence using localStorage
- Adding smooth transitions between form steps
- Exploring more advanced form validation patterns
- Enhancing accessibility with ARIA labels and keyboard navigation
- Refactoring JavaScript into modular, reusable components

## Author

- Frontend Mentor - [@noob-coder6](https://www.frontendmentor.io/profile/yourusername)