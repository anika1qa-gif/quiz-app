
(function(){
  const questions = window.quizQuestions || [];
  const core = window.quizCore;

  const totalEl = document.getElementById('total');
  const currentEl = document.getElementById('current');
  const questionEl = document.getElementById('question');
  const optionsForm = document.getElementById('options');
  const nextBtn = document.getElementById('nextBtn');
  const restartBtn = document.getElementById('restartBtn');
  const feedbackEl = document.getElementById('feedback');
  const resultEl = document.getElementById('result');

  let currentIndex = 0;
  let answers = [];

  function renderQuestion(index){
    feedbackEl.textContent = '';
    resultEl.textContent = '';
    const q = questions[index];
    if(!q){
      showResult();
      return;
    }
    questionEl.textContent = q.text;
    optionsForm.innerHTML = '';
    optionsForm.setAttribute('aria-labelledby', 'question');

    q.options.forEach((opt, i)=>{
      const id = `opt-${index}-${i}`;
      const label = document.createElement('label');
      label.className = 'option';

      const input = document.createElement('input');
      input.type = 'radio';
      input.name = 'option';
      input.value = String(i);
      input.id = id;

      const span = document.createElement('span');
      span.textContent = opt;

      label.appendChild(input);
      label.appendChild(span);
      optionsForm.appendChild(label);
    });

    currentEl.textContent = String(index + 1);
    totalEl.textContent = String(questions.length);

    // Keyboard support: Enter to go next if selected
    optionsForm.addEventListener('keydown', (e)=>{
      if(e.key === 'Enter'){
        e.preventDefault();
        nextBtn.click();
      }
    }, { once: true });
  }

  function getSelectedIndex(){
    const checked = optionsForm.querySelector('input[name="option"]:checked');
    if(!checked) return null;
    return parseInt(checked.value, 10);
  }

  function showResult(){
    const score = core.computeScore(answers, questions);
    resultEl.textContent = `Your score: ${score} / ${questions.length}`;
    nextBtn.hidden = true;
    restartBtn.hidden = false;
  }

  nextBtn.addEventListener('click', ()=>{
    const selected = getSelectedIndex();
    const q = questions[currentIndex];
    if(selected === null){
      feedbackEl.textContent = 'Please select an answer to continue.';
      return;
    }
    const isValid = core.validateAnswerIndex(selected, q);
    if(!isValid){
      feedbackEl.textContent = 'Invalid selection.';
      return;
    }

    answers[currentIndex] = selected;
    if(selected === q.answerIndex){
      feedbackEl.textContent = '✅ Correct!';
    } else {
      feedbackEl.textContent = `❌ Incorrect. Correct answer: ${q.options[q.answerIndex]}`;
    }

    // Move to next after a short pause
    setTimeout(()=>{
      currentIndex += 1;
      if(currentIndex >= questions.length){
        showResult();
      } else {
        renderQuestion(currentIndex);
      }
    }, 600);
  });

  restartBtn.addEventListener('click', ()=>{
    currentIndex = 0;
    answers = [];
    nextBtn.hidden = false;
    restartBtn.hidden = true;
    renderQuestion(currentIndex);
  });

  // Initialize
  renderQuestion(currentIndex);
})();
