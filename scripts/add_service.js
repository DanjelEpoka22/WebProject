$(document).ready(function () {
    // Handle Add Service form submission
    $('#add-service-form').on('submit', function (e) {
        e.preventDefault();

        const serviceType = $('#service-type').val();
        const servicePlan = $('#service-plan').val();
        const startDate = $('#start-date').val();
        const endDate = $('#end-date').val();

        const newService = {
            name: serviceType,
            plan: servicePlan,
            startDate: startDate,
            endDate: endDate,
        };

        // Save to localStorage
        const services = JSON.parse(localStorage.getItem('services')) || [];
        services.push(newService);
        localStorage.setItem('services', JSON.stringify(services));

        // Clear the form
        $('#add-service-form')[0].reset();

        // Show a success message
        alert('Service added successfully!');
    });
});
