var questions = [];
function questionTemplate(iteration){
    return `<div class="container-fluid">
    <div class="input-group">
        <span class="input-group-addon" id="basic-q${iteration}">Question ${iteration}</span>
        <input type="text" class="form-control" placeholder="Question"
            aria-describedby="basic-q${iteration}" id="q${iteration}_0">
    </div>
    <br>
    <div class="input-group">
        <span class="input-group-addon" id="basic-a1">
            <input value="a1" type="radio" aria-label="Answer" name="q${iteration}"> Answer 1
        </span>
        <input type="text" class="form-control" placeholder="Answer"
            aria-describedby="basic-a1" id="a${iteration}_0">
    </div>
    <br>
    <div class="input-group">
        <span class="input-group-addon" id="basic-a2">
            <input value="a2" type="radio" aria-label="Answer" name="q${iteration}"> Answer 2
        </span>
        <input type="text" class="form-control" placeholder="Answer"
            aria-describedby="basic-a2" id="a${iteration}_1">
    </div>
    <br>
    <div class="input-group">
        <span class="input-group-addon" id="basic-a3">
            <input value="a3" type="radio" aria-label="Answer" name="q${iteration}"> Answer 3
        </span>
        <input type="text" class="form-control" placeholder="Answer"
            aria-describedby="basic-a3" id="a${iteration}_2">
    </div>
</div>
<hr>`;
}
function addQuestion(){
    let out = document.getElementById('added-questions');
    if(questions.length < 10){
        questions.push(true);
        out.innerHTML += questionTemplate(questions.length);
    }
}
function removeQuestion(){
    let out = document.getElementById('added-questions');
    questions.pop();
    let topaste = '';
    questions.forEach((_, ind) => {
        topaste += questionTemplate(ind + 1);
    });
    out.innerHTML = topaste;
}
function saveTest(){
    const testname = $('#testname').val();
    const timequiz = $('#timequestion').val();
    const modality = $('#modality').val();
    const resolveQuestions = [];
    if(questions.length > 0){
        questions.forEach((_, i) => {
            let k = i + 1;
            let question = $(`#q${k}_0`).val();
            let answers = [$(`#a${k}_0`).val(), $(`#a${k}_1`).val(), $(`#a${k}_2`).val()];
            let real = $(`input[name='q${k}']:checked`).val();
            if(real){
                resolveQuestions.push({ question, answers, real });
            }
        });
        const response = {
            testname, timequiz, modality, answers: resolveQuestions,
            userref: JSON.parse(localStorage.getItem('user')).user.uid
        };
        firebase.firestore().collection('tests').add({...response}).then(doc => {
            Swal.fire({
                title: 'Nice!',
                text: 'Test saved',
                icon: 'success'
            });
            setTimeout(() => window.location.reload(), 2000);
        }).catch(err => {
            saveError(err);
            Swal.fire({
                title: 'Error!',
                text: "Can't save this document right now",
                icon: 'error'
            });
        });
    } else {
        alert('Question must be more than 1');
    }
}