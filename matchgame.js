const img = document.querySelectorAll('.imgg');
const card = document.querySelectorAll('.flip-card-inner');
const model = document.querySelector('.model');
const text = document.querySelector('.text')
const hightext = document.querySelector('.hightext');
const para = document.querySelector('.loseorwin');
const btn = document.querySelector('button');

let origArry = [1,1,2,2,3,3,4,4,5,5];
let count = 0;
let endpoint = 0;
let active = true;
let current = '';
let srcc ;
let highscore = 0;
let currentscore = 15;

random();

play();

btn.addEventListener('click',reload);

function play(){
    card.forEach(val=>{
        val.addEventListener('click',function(){
            if(!val.classList.contains('match') && active && (current !== val.lastElementChild.lastElementChild.getAttribute('alt'))){                         
                active = false;
                current = val.lastElementChild.lastElementChild.getAttribute('alt');
                val.style.transform = 'rotateY(180deg)';
                    if(count < 1 && !val.classList.contains('match')){
                        count += 1;
                        srcc = val;
                        active = true; 
                    }else if(count === 1 && !val.classList.contains('match')){
                        count = 0;
                        currentscore -= 1;
                        setTimeout(match,300);
                        function match(){
                            if(val.lastElementChild.lastElementChild.src === srcc.lastElementChild.lastElementChild.src){
                                val.style.transform = 'rotateY(180deg)';
                                srcc.style.transform = 'rotateY(180deg)';
                                val.classList.add('match')
                                srcc.classList.add('match')
                                srcc ="";
                                active = true;
                                current = '';
                                endpoint += 1;
                                if(endpoint === 5){
                                    para.innerText = "You Win";
                                    text.textContent = `${currentscore}`;
                                    if(currentscore > highscore){
                                        highscore = currentscore;
                                        hightext.textContent = `${highscore}`;
                                    }
                                    model.classList.remove('hidden');
                                }                               
                            }else if(val.lastElementChild.lastElementChild.src !== srcc.lastElementChild.lastElementChild.src){
                                val.style.transform = 'rotateY(0deg)';
                                srcc.style.transform = 'rotateY(0deg)';
                                srcc ="";
                                active =true;
                                current = '';
                                if(currentscore === 0){
                                    para.innerText = "You Lose";
                                    text.textContent = `${currentscore}`;
                                    hightext.textContent = `${highscore}`;
                                    model.classList.remove('hidden');
                                }
                            }
                        }
                    }
                }
            }
        )
    }
)};

function random(){
    for(let i = 0; i <img.length;i++){
        let value = Math.floor(Math.random()*(origArry.length));
        let arridx = origArry[value];
        origArry.splice(value,1);
        img[i].src = `./img/ig-${arridx}.png`;
    }
}

function reload(){
    origArry = [1,1,2,2,3,3,4,4,5,5];
    count = 0;
    endpoint = 0;
    active = true;
    current = '';
    srcc ;
    currentscore = 15;

    for(let i =0; i<card.length;i++){
        card[i].style.transform = "rotateY(0deg)";
        card[i].classList.remove('match');
    }

    random();
    model.classList.add('hidden');
    play();
}


