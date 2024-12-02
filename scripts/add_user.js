$(document).ready(function () {
    // Function to fetch services from localStorage
    const getServicesFromStorage = () => JSON.parse(localStorage.getItem('services')) || [];

    // Populate the service dropdown on page load
    const populateServiceDropdown = () => {
        const services = getServicesFromStorage(); // Fetch available services from localStorage
        const serviceSelect = $('#service'); // The service dropdown element
        
        serviceSelect.empty(); // Clear existing options

        if (services.length === 0) {
            serviceSelect.append('<option value="">No services available</option>'); // If no services available
        } else {
            services.forEach(service => {
                serviceSelect.append(`<option value="${service.name}">${service.name}</option>`); // Add each service as an option
            });
        }
    };

    // Populate the service dropdown on page load
    populateServiceDropdown();

    // Handle Add User form submission
    $('#add-user-form').on('submit', function (e) {
        e.preventDefault();

        const userName = $('#name').val();
        const userSurname = $('#surname').val();
        const userEmail = $('#email').val();
        const userPhone = $('#phone').val();
        const userService = $('#service').val(); // Get selected service

        const newUser = {
            name: userName,
            surname: userSurname,
            email: userEmail,
            phone: userPhone,
            service: userService,
            status: "Active", // Default status; modify based on logic
        };

        // Save to localStorage
        const users = JSON.parse(localStorage.getItem('users')) || [];
        users.push(newUser);
        localStorage.setItem('users', JSON.stringify(users));

        // Clear the form
        $('#add-user-form')[0].reset();

        // Show a success message
        alert('User added successfully!');
    });
});
