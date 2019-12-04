// To Do 
// End Game Screen
// Practice Round
// X Editable Points
// X Alternate the starting team
// X Fix Text Size

var template = '';

var currentRound = 0;
var currentQuestion = 0;
var currentTeam = 0;

var points = [0,0];
var wrongAnswers = [0,0];

var teamNames = ['Team 1', 'Team 2'];

var priorQuestions = [0];

$(function() {

		template = $('#game-container').html();
		initialize();
		
});

function initialize() {
		wrongAnswers = [0,0];

		$('#game-container').html(template);
		
		initializePoints();
		initializeLabels();

		createQuestionIndex();
		
		// Initialize answers and bind actions for when they are revealed
		currentAnswers = getCurrentAnswers();
		$('.answer').one('click', function() {
				var answerNumber = $(this).index();
				if(currentAnswers[answerNumber]) {
						showAnswer(answerNumber, currentAnswers[answerNumber]);
						if(wrongAnswers[currentTeam] < 3) {
								increasePoints(currentTeam);
						}
				}
		});

		// Give Penalty for Wrong Answer
		$('#wrong-answer-button').click(function() {
				wrongAnswer(currentTeam);
		});

		// Trigger Next Question
		$('#next-round-button').click(function() {
				if(!nextQuestion()) {
						endGame();
						return;
				}
				initialize();
		});

		// Save Team Names
		$('.team-name').blur(function() {
				saveTeamNames($(this));
		});

		// Editable Points
		$('.score-value').blur(function() {
				saveEditedPoints($(this));
		});
}

function createQuestionIndex() {
		// Number of questions in previous round
		answers.forEach(function(element, index) {
				priorQuestions[index+1] = priorQuestions[index] + element.questions.length;
		});
}

function saveEditedPoints(scoreObject) {
		points[$('.score-value').index(scoreObject)] = scoreObject.text();
}

function saveTeamNames(teamNameObject) {
		teamNames[$('.team-name').index(teamNameObject)] = teamNameObject.text();
}

function endGame() {
		$('#round, #question .label').hide();
		$('#question').text('Game Over').css('text-align', 'center');
		
		var message = '';
		if(points[0] > points [1]) {
				message = teamNames[0] + ' Wins!';
		} else if(points[0] < points[1]) {
				message = teamNames[1] + ' Wins!';
		} else {
				message = 'Tie Game!';
		}
		$('#feud-answers').html('<h1 id="game-over">'+message+'</h1>');
}

function initializeLabels() {

		roundLabel = answers[currentRound].roundSubject;
		questionLabel = answers[currentRound].questions[currentQuestion].question;

		$('#team-0 .team-name').text(teamNames[0]);
		$('#team-1 .team-name').text(teamNames[1]);
		
		$('#round-number').text(currentRound + 1);
		$('#round-value').text(roundLabel);
		
		$('#question-number').text(currentQuestion + 1);
		$('#question-value').text(questionLabel);		
		
}

function getCurrentAnswers() {
		return answers[currentRound].questions[currentQuestion].answers;
}
		
function initializePoints() {
		$('#team-0 .score-value').text(points[0]);
		$('#team-1 .score-value').text(points[1]);
}

function nextQuestion() {
		if(answers[currentRound].questions[currentQuestion+1]) {
				currentQuestion++;
		} else if(answers[currentRound+1]) {
				currentRound++;
				currentQuestion = 0;
		} else {
				return false;
		}
		// Set the correct team to start
		currentTeam = ((priorQuestions[currentRound] + currentQuestion) % 2);
		return true;
}
		
function wrongAnswer(teamNumber) {
		wrongAnswers[teamNumber]++;
		if(wrongAnswers[teamNumber] <= 3) {
				$('#team-'+teamNumber+' .wrong-answers').append('✖');
		}
		if(wrongAnswers[teamNumber] >= 3) {
				changeTeams(teamNumber);
		}
}

function changeTeams(teamNumber) {
		if(teamNumber == 0) {
				currentTeam = 1;
		} else {
				currentTeam = 0;
		}
}

function increasePoints(teamNumber) {
		$('#team-'+teamNumber+' .score-value').text(++points[teamNumber]);
}

function showAnswer(answerNumber, answer) {
		$('.answer:nth-child('+(answerNumber+1)+')').text(answer);
}
