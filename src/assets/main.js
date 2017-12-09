let answer = document.getElementById('answer');
let attempt = 0;
let generatedNumber = setHiddenFields();
function guess() {
    let input = document.getElementById('user-guess');
    if(validateInput(input.value)){
    	attempt ++;
    	getResult(input.value);
    	if(attempt < 11){
    		didPlayerWin(input.value, generatedNumber.toString());
    	}else{
    		playerLost();
    	}
    }else{
    	return false;
    }
}
function setHiddenFields(){
	attempt.value = 0;
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
	console.log(typeof(digits));
	console.log(digits.length)
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
		return false;
	}
}

function getResult(result){
	resultsList = document.getElementById("results");
	console.log(resultsList);
	resultsList.innerHTML += '<div class="row"><span class="col-md-6">' + result + '</span><div class="col-md-6> <span class="col-md-6">' + analyzeResult(result) + '</span><div class="col-md-6>';

}
function analyzeResult(result){
	let resultDigits = generatedNumber.toString().split('');
	let answerDigits = result.split('');
	console.log( resultDigits + answerDigits)
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
	console.log(userAnswer, correctAnswer);
	if(userAnswer === correctAnswer){
		setMessage("You won!");
		showAnswer();
		showReplay();
	}else{
		setMessage("Incorrect, try again!");
	}
}
function playerLost(){
	showAnswer();
	showReplay();
	setMessage("You lost! :(");	
}
function showAnswer(){
	let code = document.getElementById("code")
	code.innerHTML = "<strong>" + generatedNumber + "</strong>";
}
function showReplay(){
	let guessingDiv = document.getElementById("guessing-div");
	guessingDiv.style.display = 'none';
	let replayDiv = document.getElementById("replay-div");
	replayDiv.style.display = 'block';
}