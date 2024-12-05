$(document).ready(function () {
    
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

       
        const services = JSON.parse(localStorage.getItem('services')) || [];
        services.push(newService);
        localStorage.setItem('services', JSON.stringify(services));

        
        $('#add-service-form')[0].reset();

        
        alert('Service added successfully!');
    });
});
