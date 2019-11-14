function goToUrl(url, e){
    if(e) e.preventDefault();
    location.href = url;
}

function onAuth(f, err = null){
    try{
        firebase.auth().onAuthStateChanged(u => f(u));
    } catch(e){
        if(err) err(e);
    }
}

function uid(){
    return (firebase.auth().currentUser || {}).uid;
}

function saveError(err){
    if(typeof err === 'object') err = JSON.stringify(err);
    else err = String(err);
    sessionStorage.setItem('err', err);
}