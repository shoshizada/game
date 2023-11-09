const game = {
    i: 1,
    j: 1,
    startTurn:2,
    counter: 0,
    finish: false,
    turn: 1,
    points1: 0,
    points2: 0,
    fullMat1: [5],
    fullMat2: [5],
    //fullArr1: [0, 0, 0, 0, 0, 0, 0],
    //fullArr2: [0, 0, 0, 0, 0, 0, 0],
    fillMat() {
        for (let i = 0; i < 5; i++) {
            this.fullMat1[i] = new Array(5).fill(0);
            this.fullMat2[i] = new Array(5).fill(0);
        }


    },
    colorMat: [],
    fillcolorMat() {
        this.colorMat[0] = new Array(4, 5, 2, 1, 3);
        this.colorMat[1] = new Array(3, 4, 5, 2, 1);
        this.colorMat[2] = new Array(1, 3, 4, 5, 2);
        this.colorMat[3] = new Array(2, 1, 3, 4, 5);
        this.colorMat[4] = new Array(5, 2, 1, 3, 4);

    },
    minus:[1,1,2,2,2,3,3],
    //פונקציה שמגרילה מספר בין אחד לחמש
    randomNumber() {
        let rnd = Math.floor(Math.random() * 5) + 1;
        return rnd;
    },
    //בתחילת כל סבב האריח מינוס אחד מונח בין העיגולים 
    ariach_1() {
        let ariach_1 = document.querySelector('#ariach-1');
        const img_1 = document.createElement('img');
        img_1.setAttribute('src', 'images/ariach-1.jpg');
        img_1.alt = 'ariach-1';
        img_1.draggable = true;
        img_1.id = 'ar1';
        
      
        ariach_1.append(img_1);
    },
    //של האריחים random  בתחילת כל סבב 
    randomAriach() {
        let t1 = document.getElementById('player1').children[0];
        let t2 = document.getElementById('player2').children[0];
        t1.classList.remove('animated', 'zoomIn');
        t2.classList.remove('animated', 'zoomIn');
        if (this.startTurn === 1) {
            this.startTurn++;
            this.turn = 2;
        }
        else {
            this.startTurn--;
            this.turn = 1;
        }
        this.ariach_1();
        let number;
        for (let i = 0; i < 5; i++) {
            for (let j = 0; j < 4; j++) {
                number = this.randomNumber();
                let ariach = document.querySelector(`#circle${i + 1}`);
                const img = document.createElement('img');

                img.setAttribute('src', `images/ariach ${number}.jpg`);
                img.alt = number;
                img.draggable = true;
                img.id = `a-${this.i++}-${this.j++}`;
      
                ariach.append(img);
            }
        }
        this.turns();
    },
    
   

    drag(event) {
        
        event.dataTransfer.setData("data", event.target.id);
        event.dataTransfer.setData("idCircle", event.target.parentElement.id);


    },

    drop(event) {
        
        if (!event.currentTarget.hasChildNodes()) {
            event.preventDefault();
            const data = event.dataTransfer.getData("data");
            const idCircle = event.dataTransfer.getData("idCircle");
            const circle = document.getElementById(idCircle);
            const a = document.getElementById(data);
            const row = event.target.parentElement.cells.length - 1;
            let board;
            if (game.turn === 1) {
                board = board1 = document.getElementById('right2').tBodies[0].rows[row];
            }
            else {
                board = document.getElementById('left2').tBodies[0].rows[row];
            }


            if (!(data === 'ar1')) {
                if (idCircle === 'ariach-1') {
                    if (circle.firstChild.id !== 'ar1') {
                        if (event.target.parentElement.parentElement.parentElement.classList.contains('minus')) {
                            event.target.classList.add('tdminus');
                            a.draggable = false;
                            a.classList.add('arOn');
                            game.counter += 1;

                            event.target.append(a);
                            game.moveMiddle(circle, a);
                            if (game.counter === 21)
                                game.fillBoard();
                        }
                        else {
                            for (let i = 0; i < 5; i++) {
                                if (game.colorMat[row][i] == a.alt) {

                                    if (!board.cells[i].hasChildNodes() || board.cells[i].firstChild.alt !== a.alt) {
                                        event.target.classList.add('tdWithAr');
                                        a.draggable = false;
                                        a.classList.add('arOn');
                                        game.counter += 1;

                                        event.target.append(a);
                                        game.moveMiddle(circle, a);
                                        if (game.counter === 21)
                                            game.fillBoard();
                                    }
                                    break;
                                }

                            }
                        }



                    }
                }
                else {
                    if (event.target.parentElement.parentElement.parentElement.classList.contains('minus')) {
                        event.target.classList.add('tdminus');
                        a.draggable = false;
                        a.classList.add('arOn');
                        event.target.append(a);
                        game.counter += 1;
                        console.log(game.counter);
                        game.moveMiddle(circle, a);
                        if (game.counter === 21)
                            game.fillBoard();
                    }
                    else {
                        for (let i = 0; i < 5; i++) {
                            if (game.colorMat[row][i] == a.alt) {
                                if (!board.cells[i].hasChildNodes() || board.cells[i].firstChild.alt !== a.alt) {
                                    event.target.classList.add('tdWithAr');
                                    a.draggable = false;
                                    a.classList.add('arOn');
                                    event.target.append(a);
                                    game.counter += 1;
                                    console.log(game.counter);
                                    game.moveMiddle(circle, a);
                                    if (game.counter === 21)
                                        game.fillBoard();
                                }
                                break;
                            }
                        }
                    }


                }

            }
            else {
                if (event.target.parentElement.parentElement.parentElement.classList[0] === 'minus') {
                    event.target.classList.add('tdminus');
                    a.draggable = false;
                    a.classList.add('arOn');
                    game.counter++;
                    event.target.append(a);
                    if (game.counter === 21)
                        game.fillBoard();

                }

         
            }
        }
    },
    turns() {
        const x = document.getElementById('cover1');
        const y = document.getElementById('cover2');
        let t1 = document.getElementById('player1').children[0];
        let t2 = document.getElementById('player2').children[0];
        if (this.turn === 1) {
            t1.classList.add('animated', 'zoomIn');
            t2.classList.remove('animated', 'zoomIn');
            t1.textContent = ` תורך ${localStorage.getItem('username1')}`;
            t2.textContent = 'חשוב בינתיים :)';
            x.classList.remove('cover');
            y.classList.add('cover');
        }
        else {
            t1.classList.remove('animated', 'zoomIn');
            t2.classList.add('animated','zoomIn');
            t1.textContent = 'חשוב בינתיים :)';
            t2.textContent = `תורך ${localStorage.getItem('username2')}`;
            y.classList.remove('cover');
            x.classList.add('cover');
        }
    },
    dragDrop(event) {
        
        const arch = document.querySelectorAll('.grid-cotainer img');

       
        for (let i = 0; i < arch.length; i++) {
            const a = arch[i];
            a.addEventListener('dragstart', this.drag);
        }
        let tbls;
        
        tbls = document.querySelectorAll('.tblRight td,.tblLeft td');

        for (let i = 0; i < tbls.length; i++) {
            const tbl = tbls[i];
            tbl.addEventListener('dragover', event => event.preventDefault());
            tbl.addEventListener('drop', this.drop);
        }
        

    },
  
    moveMiddle(circle,ariach) {
        let flg3 = 1;
        const childs = circle.children;
        for (let i = 0; i < childs.length; i++) {
            if (ariach.alt === childs[i].alt)
                flg3 = 0;
         

        }
        if (flg3 === 1) {
            const middle = document.getElementById('ariach-1');
            const count = circle.children.length;
           
            for (let i = 0; i < count; i++) {
                middle.append(circle.children[0]);
               
           
            }
            if (this.turn === 1)
                this.turn = 2;
            else
                this.turn = 1;
        }
        this.turns();
    },
    //בסיום סבב ממלא את לוחות המשחק של השחקנים וקורא לפונקציה שמחשבת נקודות
    fillBoard() {
        let ariach;
      
        const tbl1 = document.getElementById('left1');
        for (let i = 0; i < 5; i++) {
            let flag = 1;
            for (let j = 0; j <=i; j++) {

                 ariach = tbl1.tBodies[0].rows[i].cells[j].firstChild;
                if (!tbl1.tBodies[0].rows[i].cells[j].hasChildNodes())
                        flag = 0;
            }
                if (flag === 1) {
                    const tbl2 = document.getElementById('left2');
                    for (let k = 0; k < 5; k++) {
                        if (game.colorMat[i][k] == ariach.alt) {
                            const x = tbl2.tBodies[0].rows[i].cells[k];
                            x.classList.add('tdWithAr');
                            ariach.classList.add('border');
                                x.append(ariach);

                            
                            this.fullMat1[i][k]++;
                            this.points(i, k, 1);
                        }

                    }
                    const t = tbl1.tBodies[0].rows[i];
                    for (let g = 0; g < (t.cells.length) - 1; g++) {
                        t.cells[g].firstChild.remove();
                    }
                }

        }
        const tbl3 = document.getElementById('right1');
        for (let i = 0; i < 5; i++) {
            let flag = 1;
            for (let j = 0; j <= i; j++) {
                ariach = tbl3.tBodies[0].rows[i].cells[j].firstChild;
                if (!tbl3.tBodies[0].rows[i].cells[j].hasChildNodes())
                    flag = 0;
            }
            if (flag === 1) {
                const tbl4 = document.getElementById('right2');
                for (let k = 0; k < 5; k++) {
                    if (game.colorMat[i][k] == ariach.alt) {
                        const y = tbl4.tBodies[0].rows[i].cells[k];
                        y.classList.add('tdWithAr');
                        ariach.classList.add('border');
                        y.append(ariach);
                        this.fullMat2[i][k]++;
                        this.points(i, k, 2);
                    }

                }
                const t = tbl3.tBodies[0].rows[i];
                for (let g = 0; g < (t.cells.length) - 1; g++) {
                    t.cells[g].firstChild.remove();
                }
            }

        }
        const y = document.querySelectorAll('.minus');
        for (let j = 0; j < 7; j++) {
            if (y[0].rows[0].cells[j].hasChildNodes()) {
                this.points1 -= this.minus[j];
                y[0].rows[0].cells[j].firstChild.remove();
            }

        }
       /* const x = document.querySelector('.minus');*/
        for (let j = 0; j < 7; j++) {
            if (y[1].rows[0].cells[j].hasChildNodes()) {
                this.points2 -= this.minus[j];
                y[1].rows[0].cells[j].firstChild.remove();
            }
        }
   
    

        //let t1 = document.getElementById('player1').children[0];
        //let t2 = document.getElementById('player2').children[0];
        //if (this.points1 > this.points2) {
        //    t1.textContent = 'מסכן אל תתיאש';
        //    t2.textContent = 'אלוף!!!!!!!! ';
        //}
        //else {
        //    if (this.points1 === this.points2) {
        //        t2.textContent = 'וואו תיקו';
        //        t1.textContent = 'וואו תיקו';
        //    }
        //    else {
        //        t2.textContent = 'מסכן אל תתיאש';
        //        t1.textContent = 'אלוף!!!!!!!! ';
        //    }
        //}
        let player = document.getElementById('player1').children[1];
        player.textContent = `ניקוד  ${this.points2}`;
         player = document.getElementById('player2').children[1];
        player.textContent = `ניקוד  ${this.points1}`;
        /*setTimeout(() => { }, 3000);*/
      /*  await sleep(150);*/
        this.checkFinish();
       
        if (this.finish === false)
            this.round();
        else {
            this.finishScore();
        }
     
    },
    //עידכון של הנקודות של כל שחקן בסיום סבב משחק
    points(i, k, x) {
        let point1 = 0;
        let point2 = 0;
        if (x === 1) {
        /*    this.points1++;*/
            for (let j = k+1; j < 5; j++) {
                if (this.fullMat1[i][j] === 1)
                    point1++;
                else
                    break;
            }
            for (let j = k; j >= 0; j--) {
                if (this.fullMat1[i][j] === 1)
                    point1++
                else
                    break;
            }
            for (let j = i+1; j < 5; j++) {
                if (this.fullMat1[j][k] === 1)
                    point2++;
                else
                    break;
            }
            for (let j = i; j >= 0; j--) {
                if (this.fullMat1[j][k] === 1)
                    point2++;
                else
                    break;
            }
            if (point1 > 1 && point2 > 1) {
                this.points1 = point1 + point2 + this.points1;
            }
            else
                if (point1 > 1 || point2 > 1)
                    this.points1 += point1 > point2 ? point1 : point2;
                else
                    this.points1 += 1;
            const player = document.getElementById('player2').children[1];
            player.textContent = `ניקוד ${this.points1}`;


        }
        else {
           
            for (let j = k+1; j < 5; j++) {
                if (this.fullMat2[i][j] === 1)
                    point1++;
                else
                    break;
            }
            for (let j = k; j >= 0; j--) {
                if (this.fullMat2[i][j] === 1)
                    point1++;
                else
                    break;
            }
            for (let j = i+1; j < 5; j++) {
                if (this.fullMat2[j][k] === 1)
                    point2++;
                else
                    break;
            }
            for (let j = i; j >= 0; j--) {
                if (this.fullMat2[j][k] === 1)
                    point2++;
                else
                    break;
            }

            if (point1 > 1 && point2 > 1) {
                this.points2 = point1 + point2 + this.points2;
            }
            else
                if (point1 > 1 || point2 > 1)
                    this.points2 += point1 > point2 ? point1 : point2;
                else
                    this.points2 += 1;
            const player = document.getElementById('player1').children[1];
            player.textContent = `ניקוד ${this.points2}`;
        }
        
        
    },
    round() {
        this.counter = 0;
        this.randomAriach();
        this.dragDrop();
        
        
    },
    //בודק אם אחד השחקנים השלים שורה אם כן נגמר המשחק
    //מעלה 2 נקודות על שורה מלאה
    checkFinish() {
        for (let i = 0; i < 5; i++) {
            let flg1 = 1;
            let flg2 = 1;
            for (let j = 0; j < 5; j++) {
                if (this.fullMat1[i][j] === 0) {
                    flg1 = 0;
                }
                if (this.fullMat2[i][j] === 0) {
                    flg2 = 0;
                }
            }
            if (flg1 === 1||flg2===1) {
                this.finish = true;
                
            }
            if (flg1 === 1) {
                this.points1 += 2;
            }
            if (flg2 === 1) {
                this.points2 += 2;
            }
        }
    },
    //בסיום המשחק מעדכן ניקוד סופי
    finishScore() {
        let monim1 = new Array(5).fill(0);
        let monim2 = new Array(5).fill(0);

        for (let i = 0; i < 5; i++) {
            let column1 = 1, column2 = 1;
            for (let j = 0; j < 5; j++) {
                if (this.fullMat1[j][i] === 0)
                    column1 = 0;

                if (this.fullMat1[j][i] === 1) {
                    monim1[this.colorMat[j][i]-1]++;
                }
                if (this.fullMat2[j][i] === 0)
                    column2 = 0;

                if (this.fullMat2[j][i] === 1) {
                    monim2[this.colorMat[j][i]-1]++;
                }
            }
            if (column1 === 1) {
                this.points1 += 7;
            }
            if (column2 === 1) {
                this.points2 += 7;
            }
        }
            for (let i = 0; i < 5; i++) {
                if (monim1[i] === 5) {
                    this.points1 += 10;
                }
                if (monim2[i] === 5) {
                    this.points2 += 10;
                }
        }
        const player2 = document.getElementById('player2').children[1];
        player2.textContent = `ניקוד ${this.points1}`;
        const player1 = document.getElementById('player1').children[1];
        player1.textContent = `ניקוד ${this.points2}`;
        game.winner();
    },
    winner() {
        let under = document.getElementById('undr');
        under.classList.add('under');
        
        let x = document.getElementsByTagName('h2');
        x[0].id = 'winner1';
        x[1].id = 'winner2';
        const p = localStorage.getItem('peak');
        if (p === 'undefined') {
            if (this.points1 > this.points2) {
                x[0].textContent = `ניצחת ${localStorage.getItem('username2')} כל הכבוד `;
                x[1].textContent = ` שברת את השיא יש לך ${this.points1} נקודות`;
                localStorage.setItem('peak', this.points1);
            }
            else {
                if (this.points1 === this.points2) {
                    x[0].textContent = `  ${localStorage.getItem('username2')} & ${localStorage.getItem('username1')}  תיקו `;
                    x[1].textContent = `שברתם את השיא יש לכם ${this.points1} נקודות`;
                }
                else {
                    x[0].textContent = `ניצחת ${localStorage.getItem('username1')} כל הכבוד `;
                    x[1].textContent =` שברת את השיא יש לך ${this.points2} נקודות`;
                    localStorage.setItem('peak', this.points2);
                }


            }
        }
        else {
            if (this.points1 > this.points2) {
                x[0].textContent = `ניצחת ${localStorage.getItem('username2')} כל הכבוד`;
                    x[1].textContent =` יש לך ${this.points1} נקודות`;
                if (localStorage.getItem('peak') < this.points1) {
                    x[0].textContent = `ניצחת ${localStorage.getItem('username2')}  כל הכבוד `;
                     x[1].textContent = `יש לך ${this.points1} נקודות שברת את השיא`;
                  
                    localStorage.setItem('peak', this.points1);
                }


            }
            else {
                if (this.points1 === this.points2) {
                    x[0].textContent = `  ${localStorage.getItem('username2')}  &  ${localStorage.getItem('username1')}  תיקו `;
                         x[1].textContent+= ` יש לכם ${this.points1} נקודות `;
                    if (localStorage.getItem('peak') < this.points1) {
                        x[0].textContent = `  ${localStorage.getItem('username2')} & ${localStorage.getItem('username1')}  תיקו  `;
                          x[1].textContent =  `  יש לכם ${this.points1} נקודות שברתם את השיא`;
                        localStorage.setItem('peak', this.points1);
                    }
                }
                else {
                    x[0].textContent = `ניצחת ${localStorage.getItem('username1')}  כל הכבוד `;
                    x[1].textContent = `יש לך ${this.points2} נקודות`;

                    if (localStorage.getItem('peak') < this.points2) {
                        x[0].textContent = `ניצחת ${localStorage.getItem('username1')} כל הכבוד יש לך ${this.points2}  נקודות `;
                              x[1].textContent = ` שברת את השיא`;
                        
                        localStorage.setItem('peak', this.points2);
                    }


                }




            }


        }
        let btns = document.getElementById('btns');
        let btn1 = document.createElement('button');
        btn1.id = 'button1';
        btn1.textContent = 'משחק חדש';
        btns.append(btn1);
        let btn2 = document.createElement('button');
        btn2.id = 'button2';
        btn2.textContent = 'שחק שוב';
        btns.append(btn2);
        btn1.addEventListener('click', function () {
            open('enter.html');

        });
        btn2.addEventListener('click', function () {
            open('index.html');

        });
            
    },

}
onload = () => {
   
    game.fillMat();
    game.fillcolorMat();

     game.round();
   
    
}
addEventListener('load', function () {
    
    const user1 = localStorage.getItem('username1');
    const user2 = localStorage.getItem('username2');

 
});




 




