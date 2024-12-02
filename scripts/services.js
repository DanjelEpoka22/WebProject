$(document).ready(function () {
    // Load services from localStorage and display them
    function loadServices() {
        const services = JSON.parse(localStorage.getItem('services')) || [];
        const currentDate = new Date();

        $('#service-table-body').empty();

        services.forEach((service, index) => {
            // Calculate the difference between the endDate and the current date
            const serviceEndDate = new Date(service.endDate);
            const timeDifference = serviceEndDate - currentDate;
            const daysUntilExpiration = timeDifference / (1000 * 3600 * 24);

            // Create a row for each service
            const row = `
                <tr class="${daysUntilExpiration <= 7 && daysUntilExpiration >= 0 ? 'table-warning' : ''}">
                    <td>${service.name}</td>
                    <td>${service.plan}</td>
                    <td>${service.startDate}</td>
                    <td>${service.endDate}</td>
                    <td>
                        <button class="btn btn-warning btn-sm edit-service" data-index="${index}" data-bs-toggle="modal" data-bs-target="#edit-service-modal">Edit</button>
                        <button class="btn btn-danger btn-sm delete-service" data-index="${index}">Delete</button>
                    </td>
                </tr>
            `;
            $('#service-table-body').append(row);
        });
    }

    loadServices();

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

        // Reload the service table to reflect changes
        loadServices();

        // Show a success message
        alert('Service added successfully!');
    });

    // Handle delete service
    $(document).on('click', '.delete-service', function () {
        const index = $(this).data('index');
        const services = JSON.parse(localStorage.getItem('services')) || [];
        services.splice(index, 1);
        localStorage.setItem('services', JSON.stringify(services));

        // Reload the service table to reflect changes
        loadServices();
    });

    // Handle edit service
    $(document).on('click', '.edit-service', function () {
        const index = $(this).data('index');
        const services = JSON.parse(localStorage.getItem('services')) || [];
        const service = services[index];

        // Fill in the modal with the current service details
        $('#edit-service-type').val(service.name);
        $('#edit-service-plan').val(service.plan);
        $('#edit-start-date').val(service.startDate);
        $('#edit-end-date').val(service.endDate);

        // Update the service when the "Save changes" button is clicked
        $('#save-edit-service').off('click').on('click', function () {
            services[index] = {
                name: $('#edit-service-type').val(),
                plan: $('#edit-service-plan').val(),
                startDate: $('#edit-start-date').val(),
                endDate: $('#edit-end-date').val(),
            };

            localStorage.setItem('services', JSON.stringify(services));

            // Reload the service table to reflect changes
            loadServices();

            // Close the modal
            $('#edit-service-modal').modal('hide');
        });
    });

    // Search functionality
    $('#search-bar').on('keyup', function () {
        const searchTerm = $(this).val().toLowerCase(); // Get the search term
        const rows = $('#service-table-body tr');

        rows.each(function () {
            const serviceName = $(this).find('td').eq(0).text().toLowerCase();
            const servicePlan = $(this).find('td').eq(1).text().toLowerCase();

            // Show row if search term matches service name or plan, hide otherwise
            if (serviceName.indexOf(searchTerm) > -1 || servicePlan.indexOf(searchTerm) > -1) {
                $(this).show();
            } else {
                $(this).hide();
            }
        });
    });
    loadServices();
});
