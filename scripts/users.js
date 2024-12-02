$(document).ready(function () {
    // Function to fetch users from localStorage
    const getUsersFromStorage = () => JSON.parse(localStorage.getItem('users')) || [];

    // Function to render users in the table
    const renderUsers = () => {
        const users = getUsersFromStorage(); // Always fetch the latest data
        $('#user-table-body').empty(); // Clear existing rows
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

    // Render users on page load
    renderUsers();

    // Event handler for deleting a user
    $(document).on('click', '.delete-user', function () {
        const users = getUsersFromStorage(); // Fetch the latest data
        const index = $(this).data('index');
        users.splice(index, 1); // Remove user from array
        localStorage.setItem('users', JSON.stringify(users)); // Update localStorage
        renderUsers(); // Re-render the table
    });

    // Event handler for editing a user
    $(document).on('click', '.edit-user', function () {
        const users = getUsersFromStorage(); // Fetch the latest data
        const index = $(this).data('index');
        const user = users[index];

        // Populate a modal or form with user details for editing
        // Example implementation for an edit modal:
        $('#edit-user-modal').modal('show');
        $('#edit-user-name').val(user.name);
        $('#edit-user-surname').val(user.surname);
        $('#edit-user-email').val(user.email);
        $('#edit-user-phone').val(user.phone);
        $('#edit-user-service').val(user.service);
        $('#edit-user-status').val(user.status);

        // Save changes when the user confirms the edit
        $('#save-edit-user').off('click').on('click', function () {
            user.name = $('#edit-user-name').val();
            user.surname = $('#edit-user-surname').val();
            user.email = $('#edit-user-email').val();
            user.phone = $('#edit-user-phone').val();
            user.service = $('#edit-user-service').val();
            user.status = $('#edit-user-status').val();

            users[index] = user; // Update the user in the array
            localStorage.setItem('users', JSON.stringify(users)); // Update localStorage
            renderUsers(); // Re-render the table
            $('#edit-user-modal').modal('hide'); // Close the modal
        });
    });
    // Search functionality
    $('#search-bar').on('keyup', function () {
        const searchTerm = $(this).val().toLowerCase(); // Get the search term
        const rows = $('#user-table-body tr');

        rows.each(function () {
            const users = $(this).find('td').eq(0).text().toLowerCase();
         

            // Show row if search term matches service name or plan, hide otherwise
            if (users.indexOf(searchTerm) > -1 ) {
                $(this).show();
            } else {
                $(this).hide();
            }
        });
    });
});
