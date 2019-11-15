var ganswers = [];

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
        $('#useremail').html(user.user.email);
        //User was loaded
        firebase.firestore().collection('answers').get().then(docs => {
            docs.forEach(snap => {
                let d = snap.data();
                ganswers.push({...d, id: snap.id});
            });
            myScore(user.user.uid);
            wOtherScores(user.user.uid);
        });
    } else {
        location.href = '../login.html';
        localStorage.removeItem('user');
    }
})();

function myScore(uid){
    let count = 0;
    ganswers.forEach(el => {
        if(el.uid == uid){
            count += el.score;
        }
    });
    $('#mscore').html(count);
}
function wOtherScores(uid){
    $('#others').html('');
    ganswers.forEach(el => {
        if(el.uid != uid){
            $('#others').append(`
                <h3>u_${el.uid.slice(0, 4)}: ${el.score} point(s)</h3>
            `);
        }
    });
}