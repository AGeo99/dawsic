function login(e){
    let email = $('#email').val();
    let password = $('#password').val();
    firebase.auth().signInWithEmailAndPassword(email, password).then(_ => {
        localStorage.setItem('user', JSON.stringify(_));
        location.href = 'user/home.html';
    }).catch(err => {
        saveError(err);
        Swal.fire({
            title: '¡Error!',
            text: 'An error was occurred when try log-in in site',
            icon: 'error'
        });
    });
}