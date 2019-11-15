let doc = null;
let index = 0, last = 0;
let time = 30;
let currentans = null;

let aquestions = [];
let qanwers = [];

(() => {
    user = localStorage.getItem('user');
    user = JSON.parse(user);
    if (user) {
        const hash = location.hash.replace('#', '');
        if(hash){
            firebase.firestore().collection('tests').doc(hash).get().then(_doc => {
                doc = _doc.data();
                if(doc){
                    $('.list-group-item').attr('href', `#${hash}`);
                    setInformation();
                } else {
                    alert('Test not found');
                    location.href = './questions.html';
                }
            }).catch(err => {
                saveError(err);
            });
        } else {
            alert('ID not allowed');
            location.href = './questions.html';
        }
    }
})();

function setInformation() {
    if (doc) {
        qanwers = [];
        $('#tq').html(doc.testname);
        time = parseInt(doc.timequiz);
        aquestions = doc.answers;
        setQuestion(doc.answers[index]);
        last = doc.answers.length;
        timer();
    }
}

function setQuestion(question) {
    $('#q').html(question.question);
    question.answers.forEach((el, index) => {
        $(`#a${index + 1}`).html(el);
    });
    currentans = question.real.replace('a', '');
}

function answerQuestion(aid) {
    const cans = parseInt(currentans);
    qanwers.push({
        is: aid === cans,
        real: cans,
        answered: aid
    });
    if(index + 1 <= last - 1){
        setQuestion(aquestions[++index]);
        timer();
    } else {
        const score = getScore();
        const response = {
            doc, uanswers: qanwers, score
        }
        firebase.firestore().collection('answers').add({...response}).then(r => {
            Swal.fire({
                title: `${score}/10`,
                text: 'Test finished',
                icon: 'info'
            });
            setTimeout(() => location.href = './questions.html', 2000);
        }).catch(err => {
            saveError(err);
        });
    }
}

function getScore(){
    let corrects = 0;
    qanwers.forEach(el => {
        if(el.is) corrects++;
    });
    return (corrects / qanwers.length) * 10;
}

function timer() {
    let custime = time;
    const i = setInterval(() => {
        $('#tt').html(custime);
        if(custime == 0){
            answerQuestion(null);
            clearInterval(i);
        } else custime--;
    }, 1000);
}