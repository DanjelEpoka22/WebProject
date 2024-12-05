$(document).ready(function () {
    
    const getServicesFromStorage = () => JSON.parse(localStorage.getItem('services')) || [];

    
    const populateServiceDropdown = () => {
        const services = getServicesFromStorage(); 
        const serviceSelect = $('#service'); 
        
        serviceSelect.empty(); 

        if (services.length === 0) {
            serviceSelect.append('<option value="">No services available</option>'); 
        } else {
            services.forEach(service => {
                serviceSelect.append(`<option value="${service.name}">${service.name}</option>`); 
            });
        }
    };

   
    populateServiceDropdown();

    
    $('#add-user-form').on('submit', function (e) {
        e.preventDefault();

        const userName = $('#name').val();
        const userSurname = $('#surname').val();
        const userEmail = $('#email').val();
        const userPhone = $('#phone').val();
        const userService = $('#service').val(); 

        const newUser = {
            name: userName,
            surname: userSurname,
            email: userEmail,
            phone: userPhone,
            service: userService,
            status: "Active",
        };

        
        const users = JSON.parse(localStorage.getItem('users')) || [];
        users.push(newUser);
        localStorage.setItem('users', JSON.stringify(users));

       
        $('#add-user-form')[0].reset();

        
        alert('User added successfully!');
    });
});
