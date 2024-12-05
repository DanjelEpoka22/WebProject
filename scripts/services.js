$(document).ready(function () {
    
    function loadServices() {
        const services = JSON.parse(localStorage.getItem('services')) || [];
        const currentDate = new Date();

        $('#service-table-body').empty();

        services.forEach((service, index) => {
           
            const serviceEndDate = new Date(service.endDate);
            const timeDifference = serviceEndDate - currentDate;
            const daysUntilExpiration = timeDifference / (1000 * 3600 * 24);

            
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

        
        loadServices();

       
        alert('Service added successfully!');
    });

    
    $(document).on('click', '.delete-service', function () {
        const index = $(this).data('index');
        const services = JSON.parse(localStorage.getItem('services')) || [];
        services.splice(index, 1);
        localStorage.setItem('services', JSON.stringify(services));

        
        loadServices();
    });

    
    $(document).on('click', '.edit-service', function () {
        const index = $(this).data('index');
        const services = JSON.parse(localStorage.getItem('services')) || [];
        const service = services[index];

       
        $('#edit-service-type').val(service.name);
        $('#edit-service-plan').val(service.plan);
        $('#edit-start-date').val(service.startDate);
        $('#edit-end-date').val(service.endDate);

        
        $('#save-edit-service').off('click').on('click', function () {
            services[index] = {
                name: $('#edit-service-type').val(),
                plan: $('#edit-service-plan').val(),
                startDate: $('#edit-start-date').val(),
                endDate: $('#edit-end-date').val(),
            };

            localStorage.setItem('services', JSON.stringify(services));

            
            loadServices();

            
            $('#edit-service-modal').modal('hide');
        });
    });

    
    $('#search-bar').on('keyup', function () {
        const searchTerm = $(this).val().toLowerCase(); 
        const rows = $('#service-table-body tr');

        rows.each(function () {
            const serviceName = $(this).find('td').eq(0).text().toLowerCase();
            const servicePlan = $(this).find('td').eq(1).text().toLowerCase();

            
            if (serviceName.indexOf(searchTerm) > -1 || servicePlan.indexOf(searchTerm) > -1) {
                $(this).show();
            } else {
                $(this).hide();
            }
        });
    });
    loadServices();
});
