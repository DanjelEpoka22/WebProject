$(document).ready(function () {
    
    const getUsersFromStorage = () => JSON.parse(localStorage.getItem('users')) || [];

    
    const renderUsers = () => {
        const users = getUsersFromStorage(); 
        $('#user-table-body').empty(); 
        if (users.length === 0) {
            $('#user-table-body').append('<tr><td colspan="7" class="text-center">No users available</td></tr>');
        } else {
            users.forEach((user, index) => {
                $('#user-table-body').append(`
                    <tr>
                        <td>${user.name}</td>
                        <td>${user.surname}</td>
                        <td>${user.email}</td>
                        <td>${user.phone}</td>
                        <td>${user.service}</td>
                        <td>${user.status}</td>
                        <td>
                            <button class="btn btn-warning btn-sm edit-user" data-index="${index}">Edit</button>
                            <button class="btn btn-danger btn-sm delete-user" data-index="${index}">Delete</button>
                        </td>
                    </tr>
                `);
            });
        }
    };

    
    renderUsers();

    
    $(document).on('click', '.delete-user', function () {
        const users = getUsersFromStorage(); 
        const index = $(this).data('index');
        users.splice(index, 1); 
        localStorage.setItem('users', JSON.stringify(users)); 
        renderUsers(); 
    });

   
    $(document).on('click', '.edit-user', function () {
        const users = getUsersFromStorage(); 
        const index = $(this).data('index');
        const user = users[index];

   
        $('#edit-user-modal').modal('show');
        $('#edit-user-name').val(user.name);
        $('#edit-user-surname').val(user.surname);
        $('#edit-user-email').val(user.email);
        $('#edit-user-phone').val(user.phone);
        $('#edit-user-service').val(user.service);
        $('#edit-user-status').val(user.status);

        
        $('#save-edit-user').off('click').on('click', function () {
            user.name = $('#edit-user-name').val();
            user.surname = $('#edit-user-surname').val();
            user.email = $('#edit-user-email').val();
            user.phone = $('#edit-user-phone').val();
            user.service = $('#edit-user-service').val();
            user.status = $('#edit-user-status').val();

            users[index] = user; 
            localStorage.setItem('users', JSON.stringify(users));
            renderUsers(); 
            $('#edit-user-modal').modal('hide');
        });
    });
    
    $('#search-bar').on('keyup', function () {
        const searchTerm = $(this).val().toLowerCase(); 
        const rows = $('#user-table-body tr');

        rows.each(function () {
            const users = $(this).find('td').eq(0).text().toLowerCase();
         

            
            if (users.indexOf(searchTerm) > -1 ) {
                $(this).show();
            } else {
                $(this).hide();
            }
        });
    });
});
