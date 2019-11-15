var publicQuestions = [];

(() => {
    setTimeout(() => {
        if(!uid()){
            location.href = '../login.html';
            localStorage.removeItem('user');
        }
    }, 1000);
    user = localStorage.getItem('user');
    user = JSON.parse(user);
    if(user){
        firebase.firestore().collection('tests').get().then(docs => {
            docs.forEach(snap => {
                let iel = snap.data();
                if(iel.userref != user.user.uid){
                    publicQuestions.push({...snap.data(), id: snap.id});
                }
            });
            publicQuestionTemplate();
        });
    } else {
        location.href = '../login.html';
        localStorage.removeItem('user');
    }
})();

function publicQuestionTemplate(){
    $('#ligr').html('');
    publicQuestions.forEach(el => {
        $('#ligr').append(`
            <a href="#" class="list-group-item active">
                <h4 class="list-group-item-heading">${el.testname}</h4>
                <p class="list-group-item-text">${el.modality}</p>
                <div class="div-block">
                    <div class="div-flex"></div>
                    <button class="btn btn-default" onclick="goToUrl('answer.html#${el.id}')">Answer test</button>
                </div>
            </a>
        `);
    });
}