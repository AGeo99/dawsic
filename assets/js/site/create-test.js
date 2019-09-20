var questions = [];
function questionTemplate(iteration){
    return `<div class="container-fluid">
    <div class="input-group">
        <span class="input-group-addon" id="basic-q${iteration}">Question ${iteration}</span>
        <input type="text" class="form-control" placeholder="Question"
            aria-describedby="basic-q${iteration}">
    </div>
    <br>
    <div class="input-group">
        <span class="input-group-addon" id="basic-a1">
            <input type="radio" aria-label="Answer" name="q${iteration}"> Answer 1
        </span>
        <input type="text" class="form-control" placeholder="Answer"
            aria-describedby="basic-a1">
    </div>
    <br>
    <div class="input-group">
        <span class="input-group-addon" id="basic-a2">
            <input type="radio" aria-label="Answer" name="q${iteration}"> Answer 2
        </span>
        <input type="text" class="form-control" placeholder="Answer"
            aria-describedby="basic-a2">
    </div>
    <br>
    <div class="input-group">
        <span class="input-group-addon" id="basic-a3">
            <input type="radio" aria-label="Answer" name="q${iteration}"> Answer 3
        </span>
        <input type="text" class="form-control" placeholder="Answer"
            aria-describedby="basic-a3">
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
    questions.forEach((el, ind) => {
        topaste += questionTemplate(ind + 1);
    });
    out.innerHTML = topaste;
}