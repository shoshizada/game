let modal = document.getElementById('id01');

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

const getData = (event) => {
    event.preventDefault();

    const form = event.target; // הטופס שלחצתי עליו

    const name1 = form.elements.uname1.value;
    const name2 = form.elements.uname2.value;

    console.log(name1, name2);
    saveData(name1, name2);
    open('index.html'); // HTML פתיחת דף חדש של
};

const saveData = (name1,name2) => {
   
    localStorage.setItem('username1', name1);
    localStorage.setItem('username2', name2);
};

onload = () => {
    const btn = document.getElementById('new');
    btn.addEventListener('click', function () {
        document.getElementById('id01').style.display = 'block';
    });
    const p = document.getElementsByTagName('p')[0];
    p.addEventListener('click', function () {
        document.getElementById('id01').style.display = 'block';
    });
    const span = document.getElementsByTagName('span')[0];
    span.addEventListener('click', function () {
        document.getElementById('id01').style.display = 'none';
    });
    const form = document.getElementsByTagName('form')[0];
    form.addEventListener('submit', function () {
        getData(event);
    });
    const open = document.getElementById('open');
    open.addEventListener('click', function () {
        document.getElementById("myNav").style.width = "100%";
        
      
      
    });
    
    const close = document.getElementById('close');
    close.addEventListener('click', function () {
       
        document.getElementById("myNav").style.width = "0%";
    });
}
