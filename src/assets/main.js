let answer = document.getElementById('answer');
let attempt = 0;
let generatedNumber = setHiddenFields();

function guess() {
    let input = document.getElementById('user-guess');
    if(validateInput(input.value)){
    	attempt ++;
    	getResult(input.value);
    	if(attempt < 10){
    		didPlayerWin(input.value, generatedNumber.toString());
    	}else{
    		playerLost();
    	}
    }else{
    	return false;
    }
}
function getAnswer(){
	let answer = document.getElementById('answer');
	return answer;
}
function setHiddenFields(){
	let generatedNumber = Math.random()*10000;
	let answer = Math.floor(generatedNumber);
	if(!doesNumberHaveFourDigits(answer)){
		answer = makeNumberHasFourDigits(answer);
	}
	console.log(answer);
	return answer;	
}
function doesNumberHaveFourDigits(number){
	let digits = number.toString();
	if(digits.length === 4) {

		return true;
	}
	else{
		return false;
	}
}
function makeNumberHasFourDigits(number){
	let digits = number.toString();
	while(digits.length < 4){
		digits = '0' + digits;
	}
	return digits;
}
function setMessage(message){
	let messagePlace = document.getElementById('message');
	messagePlace.textContent = message;
}
function validateInput(input){
	if(doesNumberHaveFourDigits(input)){
		return true;
	}else{
		setMessage("You must give a 4 digits number!");
		return false;
	}
}

function getResult(result){
	resultsList = document.getElementById("results");
	resultsList.innerHTML += '<div class="row"> <strong class="col-md-6">' + result + '</strong> <strong class="col-md-6">'+ analyzeResult(result) + '</strong> </div>';

}
function analyzeResult(result){
	let resultDigits = generatedNumber.toString().split('');
	let answerDigits = result.split('');
	let isInRightPlace = false;
	let isInNumber = false;
	let key = '';
	for(let i = 0; i < resultDigits.length; i++){
		for(let j = 0; j < answerDigits.length; j++){
			if(resultDigits[j] === answerDigits[i]){
				isInNumber = true;
				if(i === j){
					isInRightPlace = true;
				}
			}
		}
		if(isInNumber && isInRightPlace){
			key += '<span class="glyphicon glyphicon-ok"> </span>'
		}else if (isInNumber && !isInRightPlace) {
			key += '<span class="glyphicon glyphicon-transfer"> </span>'
		}else {
			key += '<span class="glyphicon glyphicon-remove"> </span>'
		}
		isInRightPlace = false;
		isInNumber = false;
	}
	return key;
}
function didPlayerWin(userAnswer, correctAnswer){
	if(userAnswer === correctAnswer){
		playerWon();
	}else{
		setMessage("Incorrect, try again!");
	}
}
function playerWon(){
	showAnswer('w');
	showReplay();
	setMessage("You won! :)");

}
function playerLost(){
	showAnswer('l');
	showReplay();
	setMessage("You lost! :(");	
}
function showAnswer(gameStatus){
	let code = document.getElementById("code")
	code.innerHTML = "<strong>" + generatedNumber + "</strong>";
	if(gameStatus = 'w'){
		code.classList.add('success');
	}else{
		code.classList.add('failure');
	}
}
function showReplay(){
	let guessingDiv = document.getElementById("guessing-div");
	guessingDiv.style.display = 'none';
	let replayDiv = document.getElementById("replay-div");
	replayDiv.style.display = 'block';
}