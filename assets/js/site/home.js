var questions = [];

(() => {
    user = localStorage.getItem('user');
    user = JSON.parse(user);
    if (user) {
        $('#useremail').html(user.user.email);
        //User was loaded
        firebase.firestore().collection('tests').where('userref', '==', user.user.uid).get().then(docs => {
            docs.forEach(snap => questions.push({...snap.data(), id: snap.id}));
            myQuestionTemplate();
        });
    }
})();

function signout(e) {
    e.preventDefault();
    x = confirm('Are you want to sign out right now?');
    if (x) {
        location.href = '../login.html';
    }
}

function myQuestionTemplate(){
    $('#ligr').html('');
    questions.forEach(el => {
        $('#ligr').append(`
            <a href="#" class="list-group-item active">
                <h4 class="list-group-item-heading"><b>Q</b>: ${el.testname}</h4>
                <p class="list-group-item-text"><b>Time</b>: ${el.timequiz}s (${el.modality})</p>
                <div class="div-block">
                    <div class="div-flex"></div>
                    <button class="btn btn-default" onclick="deleteTest('${el.id}')">Delete test</button>
                </div>
            </a> 
        `);
    });
}

function deleteTest(id){
    x = confirm('You want delete this document right now?');
    if(x){
        firebase.firestore().collection('tests').doc(id).delete().then(r => {
            questions = questions.map(d => d.id != id);
            myQuestionTemplate();
        });
    }
}