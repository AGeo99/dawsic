function register(e){
    let name = $('#name').val();
    let username = $('#username').val();
    let password = $('#password').val(), cpassword = $('#cpassword').val();
    let email = $('#email').val();
    if(password === cpassword){
        firebase.auth().createUserWithEmailAndPassword(email, password).then(_ => {
            firebase.database().ref('users').set({name,email,password,username}, err => {
                saveError(err);
            });
            location.href = './login.html';
        }).catch(err => {
            saveError(err);
            Swal.fire({
                title: '¡Error!',
                text: 'An error was occurred when try register in site',
                icon: 'error'
            });
        });
    }
}