import {getUsers, deleteUser} from './api/userApi';

// Populate table of users via API call.
getUsers().then(result => {
  let usersBody = "";

  result.forEach(users => {
    usersBody += `<tr>
    <td><a href="#" data-id="${users.id}" class="deleteUser">Delete</a></td>
    <td>${users.id}</td>
    <td>${users.firstName}</td>
    <td>${users.lastName}</td>
    <td>${users.email}</td>
    </tr>`
  });

  global.document.getElementById('users').innerHTML = usersBody;

  const deleteLinks = global.document.getElementsByClassName('deleteUser');

  // Must use array form to create a real array from a DOM collection
  // getElementsByClassname only returns an "array like" object.
  Array.from(deleteLinks, link => {
    link.onclick = function(event) {
      const element = event.target;
      event.preventDefault();
      deleteUser(element.attributes["data-id"].value);
      const row = element.parentNode.parentNode;
      row.parentNode.removeChild(row);
    };
  });
});
