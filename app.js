//single state object

var state = {
  questions: [{
      question: 'Which of the following describes a physical location around the world where AWS clusters data centers?',
      answers: ['Endpoint', 'Collection', 'Fleet', 'Region'],
      answerCorrect: 3
    },
    {
      question: 'Each AWS region is composed of two or more locations that offer organizations the ability to operate production systems that are more highly available, fault tolerant, and scalable than would be possible using a single data center. What are these locations called?',
      answers: ['Availability Zones', 'Replication areas', 'Geographic districts', 'Compute centers'],
      answerCorrect: 0
    },
    {
      question: 'What is the deployment term for an environment that extends an existing on-premises infrastructure into the cloud to connect cloud resources to internal systems?',
      answers: ['All-in deployment', 'Hybrid deployment', 'On-premises deployment', 'Scatter deployment'],
      answerCorrect: 1
    },
    {
      question: 'Which AWS Cloud service allows organizations to gain system-wide visibility into resource utilization, application performance, and operational health?',
      answers: ['AWS Identity and Access Management (IAM)', 'Amazon Simple Notification Service (Amazon SNS)', 'Amazon CloudWatch', 'AWS CloudFormation'],
      answerCorrect: 2
    },
    {
      question: 'Which of the following AWS Cloud services is a fully managed NoSQL database service?',
      answers: ['Amazon Simple Queue Service (Amazon SQS)', 'Amazon DynamoDB', 'Amazon ElastiCache', 'Amazon Relational Database Service (Amazon RDS)'],
      answerCorrect: 1
    },
    {
      question: 'Your company experiences fluctations in traffic patterns to their e-commerce website based on flash sales. What service can help your company dynamically match the required compute capacity to the spike in traffic during flash sales?',
      answers: ['Auto Scaling', 'Amazon Glacier', 'Amazon Simple Notification Service (Amazon SNS)', 'Amazon Virtual Private Cloud (Amazon VPC)'],
      answerCorrect: 0
    },
    {
      question: 'Your company provides an online photo sharing service. The development team is looking for ways to deliver image files with the lowest latency to end users so the website content is delivered with the best possible performance. What service can help speed up distribution of these image files to end users around the world?',
      answers: ['Amazon Elastic Compute Cloud (Amazon EC2)', 'Amazon Route 53', 'AWS Storage Gateway', 'Amazon CloudFront'],
      answerCorrect: 3
    },
    {
      question: 'Your company runs an Amazon EC2 instance periodically to perform a batch processing job on a large and growing filesystem. At the end of the batch job, you shut down the Amazon EC2 instance to save money but need to persist the filesystem on the Amazon EC2 instance from the previous batch runs. What AWS Cloud service can you leverage to meet these requirements?',
      answers: ['Amazon EBS', 'Amazon DynamoDB', 'Amazon Glacier', 'AWS CloudFormation'],
      answerCorrect: 0
    },
    {
      question: 'What AWS Cloud service provides a logically isolated section of the AWS Cloud where organizations can launch AWS resources in a virtual network that they define?',
      answers: ['Amazon Simple Workflow Service (Amazon SWF)', 'Amazon Route 53', 'Amazon Virtual Private Cloud (Amazon VPC)', 'AWS CloudFormation'],
      answerCorrect: 2
    },
    {
      question: 'Your company provides a mobile voting application for a popular TV show, and 5 to 25 million viewers all vote in a 15-second timespan. What mechanism can you use to decouple the voting application from your back-end services that tally the votes?',
      answers: ['AWS CloudTrail', 'Amazon Simple Queue Service (Amazon SQS)', 'Amazon Redshift', 'Amazon Simple Notification Service (Amazon SNS)'],
      answerCorrect: 1
    }
  ],

  currentQuestion: 0,
  userScore: 0
}

//register when start button is clicked and removes div with heading
//and start button
function clickStart() {
  $('.js-startPage').on('click', 'button', function(event) {

    $('.js-startPage').remove();
    $('#question-container').removeClass('hidden');
  })
};

//register when an answer/button has been clicked/chosen by the user
function clickAnswer(chosenElement, state) {

  var chosenAnswer = $(chosenElement).val();

  //if the chosen answer is correct, then tell the user "correct", otherwise "wrong :("
  if (chosenAnswer == state.questions[state.currentQuestion].answerCorrect) {

    state.userScore += 1;
    $('.response1').text('Correct!');
  } else {
    $('.response1').text('Wrong :(');

    //add class "wrong answer" so that the button that was clicked can be
    //marked with a red colour
    $(chosenElement).addClass('wrong-answer');
  }

  //add class to the correct answer so that this can be highlighted in green
  $('.button' + state.questions[state.currentQuestion].answerCorrect).addClass('button-correct');

  //remove hover class from button so the highlighted answers will still stay red and green
  //when you hover over them
  $('button').removeClass('hover');

  //show result
  $('.result').removeClass('hidden');
  //show continue button
  $('.js-continue').removeClass('hidden');
  //disable the answer buttons so user cannot continue clicking them
  $('.js-answer').attr('disabled', true);

  return state;
}


function clickContinue(state) {
  //increment which question user is on by one when continue is clicked
  state.currentQuestion += 1;
  //hide continue button and result again, remove questions and answer
  $('.js-continue').addClass('hidden');
  $('.result').addClass('hidden');
  $('section').remove();

  //if quiz is done insert "you're done" and user's score
  //remove count and score from bottom of page
  if (state.currentQuestion > 9) {
    $('body').append('<h1 class="end">You\'re done!</h1><p class ="endScore">You scored ' + state.userScore + " out of " + state.currentQuestion);
    $('.js-count').remove();
    $('.js-score').remove();

  } else {
    //if quiz is not done insert new question and answers and update user score and question count
    $('#question-container').append("<section class = 'question-container col-8'>" +
      "<p class='question'>" + state.questions[state.currentQuestion].question + "</p><br>" +
      "<button class='button0 js-answer hover' value = '0'>" + state.questions[state.currentQuestion].answers[0] + "</button><br>" +
      "<button class='button1 js-answer hover' value = '1'>" + state.questions[state.currentQuestion].answers[1] + "</button><br>" +
      "<button class='button2 js-answer hover' value = '2'>" + state.questions[state.currentQuestion].answers[2] + "</button><br>" +
      "<button class='button3 js-answer hover' value = '3'>" + state.questions[state.currentQuestion].answers[3] + "</button>" +
      "</section>");

    $('.js-count').text("Question: " + (state.currentQuestion + 1) + "/" + state.questions.length);
    $('.js-score').text("Correct: " + state.userScore + "/" + state.currentQuestion);
  }

}

$(function() {
  clickStart();
  $('#question-container').on('click', 'button', function(event) {

    clickAnswer($(this), state);
  });

  $('.js-continue').click(function(event) {

    clickContinue(state);
  });

});
