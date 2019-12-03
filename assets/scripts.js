var template = '';

var roundNumber = 0;
var questionNumber = 0;
var currentTeam = 0;

var points = [0,0];
var wrongAnswers = [0,0];


$(function() {

		template = $('#game-container').html();
		initialize();
		
});

function initialize() {
		wrongAnswers = [0,0];

		$('#game-container').html(template);
		
		initializePoints();
		// Add Round Number
		// Add Round Label
		// Add Question Number
		// Add Question Label
		
		$('.answer').one('click', function() {
				var answerNumber = $(this).index();
				if(answers[answerNumber]) {
						showAnswer(answerNumber, answers[answerNumber]);
						if(wrongAnswers[currentTeam] < 3) {
								increasePoints(currentTeam);
						}
				}
		});

		$('#wrong-answer-button').click(function() {
				wrongAnswer(currentTeam);
		});

		$('#next-round-button').click(function() {
				initialize();
		});
}

function initializePoints() {
		$('#team-0 .score-value').text(points[0]);
		$('#team-1 .score-value').text(points[1]);
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
