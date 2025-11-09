document.addEventListener('DOMContentLoaded', () => {
    const steps = document.querySelectorAll('.form-step');
    const stepIndicators = document.querySelectorAll('.step__indicator');
    const nextBtn = document.querySelector('.btn-next');
    const backBtn = document.querySelector('.btn-back');
    const confirmBtn = document.querySelector('.btn-confirm');
    const navButtons = document.querySelector('.navigation-buttons');
    const billingSwitch = document.getElementById('billing-cycle');
    const changePlanBtn = document.querySelector('.change-plan-btn');

    let currentStep = 1;
    const formData = {
        plan: 'arcade',
        billing: 'monthly',
        addons: []
    };

    const updateStepVisibility = () => {
        steps.forEach(step => {
            step.hidden = parseInt(step.dataset.step) !== currentStep;
        });
        stepIndicators.forEach(indicator => {
            indicator.classList.toggle('active', parseInt(indicator.dataset.step) === currentStep);
        });

        backBtn.hidden = currentStep === 1;
        nextBtn.hidden = currentStep === 4 || currentStep === 5;
        confirmBtn.hidden = currentStep !== 4;
        navButtons.style.display = currentStep === 5 ? 'none' : 'flex';
    };

    const validateStep1 = () => {
        let isValid = true;
        const name = document.getElementById('name');
        const email = document.getElementById('email');
        const phone = document.getElementById('phone');

        if (!name.value.trim()) {
            showError(name, 'This field is required');
            isValid = false;
        } else {
            hideError(name);
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email.value.trim()) {
            showError(email, 'This field is required');
            isValid = false;
        } else if (!emailRegex.test(email.value)) {
            showError(email, 'Valid email required');
            isValid = false;
        } else {
            hideError(email);
        }

        if (!phone.value.trim()) {
            showError(phone, 'This field is required');
            isValid = false;
        } else {
            hideError(phone);
        }

        return isValid;
    };

    const showError = (input, message) => {
        const formGroup = input.parentElement;
        const errorEl = formGroup.querySelector('.error-message');
        formGroup.classList.add('error');
        errorEl.textContent = message;
    };

    const hideError = (input) => {
        const formGroup = input.parentElement;
        const errorEl = formGroup.querySelector('.error-message');
        formGroup.classList.remove('error');
        errorEl.textContent = '';
    };

    const updatePrices = () => {
        const isYearly = billingSwitch.checked;
        formData.billing = isYearly ? 'yearly' : 'monthly';

        document.querySelector('.toggle-label.monthly').classList.toggle('active', !isYearly);
        document.querySelector('.toggle-label.yearly').classList.toggle('active', isYearly);

        // Update plan prices
        document.querySelectorAll('.plan-option').forEach(plan => {
            const priceEl = plan.querySelector('.plan-price');
            const bonusEl = plan.querySelector('.plan-bonus');
            const price = plan.querySelector('input').dataset[isYearly ? 'priceYearly' : 'priceMonthly'];
            priceEl.textContent = isYearly ? `$${price}/yr` : `$${price}/mo`;
            bonusEl.hidden = !isYearly;
        });

        // Update addon prices
        document.querySelectorAll('.addon-option').forEach(addon => {
            const priceEl = addon.querySelector('.addon-price');
            const price = addon.querySelector('input').dataset[isYearly ? 'priceYearly' : 'priceMonthly'];
            priceEl.textContent = isYearly ? `+$${price}/yr` : `+$${price}/mo`;
        });
    };

    const updateSummary = () => {
        const isYearly = formData.billing === 'yearly';
        const planName = formData.plan.charAt(0).toUpperCase() + formData.plan.slice(1);
        const billingText = isYearly ? 'Yearly' : 'Monthly';
        const shortBilling = isYearly ? 'yr' : 'mo';

        const planInput = document.querySelector(`input[name="plan"][value="${formData.plan}"]`);
        const planPrice = parseInt(planInput.dataset[isYearly ? 'priceYearly' : 'priceMonthly']);

        document.querySelector('.summary-plan-name').textContent = `${planName} (${billingText})`;
        document.querySelector('.summary-plan-price').textContent = `$${planPrice}/${shortBilling}`;

        const addonsContainer = document.querySelector('.summary-addons');
        addonsContainer.innerHTML = '';
        let totalAddonPrice = 0;

        formData.addons.forEach(addonId => {
            const addonInput = document.getElementById(addonId);
            const addonName = addonInput.parentElement.querySelector('.addon-name').textContent;
            const addonPrice = parseInt(addonInput.dataset[isYearly ? 'priceYearly' : 'priceMonthly']);
            totalAddonPrice += addonPrice;

            const addonEl = document.createElement('div');
            addonEl.classList.add('summary-addon');
            addonEl.innerHTML = `
                <p class="summary-addon-name">${addonName}</p>
                <p class="summary-addon-price">+$${addonPrice}/${shortBilling}</p>
            `;
            addonsContainer.appendChild(addonEl);
        });

        const totalPrice = planPrice + totalAddonPrice;
        document.querySelector('.summary-total p:first-child').textContent = `Total (per ${isYearly ? 'year' : 'month'})`;
        document.querySelector('.total-price').textContent = `+$${totalPrice}/${shortBilling}`;
    };

    nextBtn.addEventListener('click', () => {
        if (currentStep === 1 && !validateStep1()) {
            return;
        }

        if (currentStep === 2) {
            const selectedPlan = document.querySelector('input[name="plan"]:checked');
            if (selectedPlan) {
                formData.plan = selectedPlan.value;
            }
        }

        if (currentStep === 3) {
            formData.addons = [];
            document.querySelectorAll('input[name="addon"]:checked').forEach(addon => {
                formData.addons.push(addon.id);
            });
        }

        if (currentStep === 4) {
            // This is handled by the confirm button
            return;
        }

        currentStep++;
        if (currentStep === 4) {
            updateSummary();
        }
        updateStepVisibility();
    });

    backBtn.addEventListener('click', () => {
        if (currentStep > 1) {
            currentStep--;
            updateStepVisibility();
        }
    });

    confirmBtn.addEventListener('click', (e) => {
        e.preventDefault(); // Prevent form submission for this demo
        currentStep++;
        updateStepVisibility();
    });

    billingSwitch.addEventListener('change', updatePrices);

    changePlanBtn.addEventListener('click', () => {
        currentStep = 2;
        updateStepVisibility();
    });

    // Initialize
    updateStepVisibility();
    updatePrices();
});