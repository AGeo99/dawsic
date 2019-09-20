function signout(e){
    e.preventDefault();
    x = confirm('Are you want to sign out right now?');
    if(x){
        alert('Sign out success');
        location.href = '../login.html';
    }
}