(function() {
  var questions = [{
    question: "Nama fauna diatas adalah ?",
    image: "<img src='image/fauna/3.jpg' width=200px>",
    choices: ['Orang Utan', 'Harimau Sumatera', 'Komodo', 'Badak Jawa', 'Gajah Sumatera'],
    correctAnswer: 1
  }, {
    question: "Nama flora diatas adalah ?",
    image: "<img src='image/flora/2.jpg' width=200px>",
    choices: ['Bunga Bangkai', 'Pohon Cendana', 'Pohon Damar', 'Raflesia Arnoldi', 'Pohon Ulin'],
    correctAnswer: 3
  }, {
    question: "Nama Presiden pertama adalah ?",
    image: "<img src='image/presiden/1.jpg' width=200px>",
    choices: ['Soekarno', 'BJ Habibie', 'Susilo Bambang Yudhoyono', 'Megawati Soekarno Putri', 'Soeharto'],
    correctAnswer: 0
  }, {
    question: "Sutomo lahir di ?",
    image: "<img src='image/pahlawan_nasional/2.jpg' width=200px>",
    choices: ['Bandung', 'Semarang', 'Banjarnegara', 'Yogyakarta', 'Surabaya'],
    correctAnswer: 4
  }, {
    question: "Timor Leste lepas dari indonesia pada tahun ?",
    image: "<img src='image/peristiwa/9.jpg' width=200px>",
    choices: ['1997', '1998', '1999', '2000', '2001'],
    correctAnswer: 2
  }, {
    question: "Gambar diatas merupakan pahlawan revolusi yang bernama?",
    image: "<img src='image/pahlawan_revolusi/1.jpg' width=200px>",
    choices: ['Jendral Ahmad Yani', 'Letnan Jendral Suprapto', 'Lentan Jendral Haryono', 'Letnan Jendral Siswondo Parman', 'Mayor Jendral Pandjaitan'],
    correctAnswer: 0
  }, {
    question: "Situs warisan komodo berada di ?",
    image: "<img src='image/situs_warisan/3.jpg' width=200px>",
    choices: ['Nusa Tenggara Timur', 'Nusa Tenggara Barat', 'Bali', 'Jawa Timur', 'Jawa Tengah'],
    correctAnswer: 0
  }, {
    question: "Lagu indonesia pusaka merupakan lagu karya ?",
    image: "<img src='image/logo.png' width=200px>",
    choices: ['Chaken Matulawa', 'Kusbini', 'Alfred Simanjuntak', 'Ismai Marzuki', 'Saridjah Niung Bintang Soedibjo'],
    correctAnswer: 3
  }, {
    question: "Tanah airku indonesia, negeri elok amat kucinta... merupakan salah satu karya R.Maladi yang berjudul ?",
    image: "<img src='image/logo.png' width=200px>",
    choices: ['Nyiur Hijau', 'Indonesia Pusaka', 'Indonesia Raya', 'Rayuan Pulau Kelapa', 'Bangun Pemudi Pemuda'],
    correctAnswer: 3
  }, {
    question: "Baju Adat Provinsi Jawa Tengah adalah ?",
    image: "<img src='image/baju_adat/14.jpg' width=200px>",
    choices: ['Kain Ulos', 'Kain Tapis', "Jawi Jangkep dan Kebaya", 'Baju Adat Melayu Bengkulu', 'Dandanan Care Haji dan Dandanan Care Penganten Chine'],
    correctAnswer: 2
  }, {
    question: "Rumah adat khas Provinsi Sumatera Selatan adalah ?",
    image: "<img src='image/rumah_adat/3.jpg' width=200px>",
    choices: ['Joglo', 'Hanoi', 'Rumah Saloso Jatuh Kembar', 'Dalam Loka Samawa', 'Rumah Limas'],
    correctAnswer: 4
  }, {
    question: "Tarian Khas Provinsi Papua adalah ?",
    image: "<img src='image/baju_adat/33.jpg' width=200px>",
    choices: ['Tari Saman', 'Tari Tandak', 'Tari Bidu Hakdur', 'Tari Sajojo', 'Tari Rii Adia'],
    correctAnswer: 3
  }, {
    question: "Alat Musik Khas Provinsi Aceh adalah ?",
    image: "<img src='image/alat_musik/1.jpg' width=200px>",
    choices: ['Dambus', 'Sampe', "Keso-Keso", 'Lado-Lado', 'Sarune Kalee'],
    correctAnswer: 4
  }, {
    question: "Ibukota Provinsi Sulawesi Tenggara adalah ?",
    image: "<img src='image/logo/31.jpg' width=200px>",
    choices: ['Mataram', 'Kendari', 'Semarang', 'Manado', 'Palu'],
    correctAnswer: 1
  }, {
    question: "Situs warisan dunia Subak berada di ?",
    image: "<img src='image/situs_warisan/2.jpg' width=200px>",
    choices: ['Bali', 'Nusa Tenggara Timur', 'Nusa Tenggara Barat', 'Jawa Tengah', 'Jawa Barat'],
    correctAnswer: 0
  }];
  
  var questionCounter = 0; //Tracks question number
  var selections = []; //Array containing user choices
  var quiz = $('#quiz'); //Quiz div object
  
  // Display initial question
  displayNext();
  
  // Click handler for the 'next' button
  $('#next').on('click', function (e) {
    e.preventDefault();
    
    // Suspend click listener during fade animation
    if(quiz.is(':animated')) {        
      return false;
    }
    choose();
    
    // If no user selection, progress is stopped
    if (isNaN(selections[questionCounter])) {
      alert('Please make a selection!');
    } else {
      questionCounter++;
      displayNext();
    }
  });
  
  // Click handler for the 'prev' button
  $('#prev').on('click', function (e) {
    e.preventDefault();
    
    if(quiz.is(':animated')) {
      return false;
    }
    choose();
    questionCounter--;
    displayNext();
  });
  
  // Click handler for the 'Start Over' button
  $('#start').on('click', function (e) {
    e.preventDefault();
    
    if(quiz.is(':animated')) {
      return false;
    }
    questionCounter = 0;
    selections = [];
    displayNext();
    $('#start').hide();
  });
  
  // Animates buttons on hover
  $('.button').on('mouseenter', function () {
    $(this).addClass('active');
  });
  $('.button').on('mouseleave', function () {
    $(this).removeClass('active');
  });
  
  // Creates and returns the div that contains the questions and 
  // the answer selections
  function createQuestionElement(index) {
    var qElement = $('<div>', {
      id: 'question'
    });
    
    var header = $('<h2>Pertanyaan Nomor ' + (index + 1) + ':</h2>');
    qElement.append(header);
    
    var image = $ ('<div>').append(questions[index].image);
    qElement.append(image);
    var question = $ ('<br/><p>').append(questions[index].question);
    qElement.append(question);
    
    var radioButtons = createRadios(index);
    qElement.append(radioButtons);
    
    return qElement;
  }
  
  // Creates a list of the answer choices as radio inputs
  function createRadios(index) {
    var radioList = $("<table align='left' width='100%'>");
    var item;
    var input = '';
    for (var i = 0; i < questions[index].choices.length; i++) {
      item = $('<tr>');
      input = '<input id="item' + i + '" type="radio" name="answer" value=' + i + ' />';
      input += '<label for="item' + i + '">' + questions[index].choices[i] + '</label>';
      item.append(input);
      radioList.append(item);
    }
    return radioList;
  }
  
  // Reads the user selection and pushes the value to an array
  function choose() {
    selections[questionCounter] = +$('input[name="answer"]:checked').val();
  }
  
  // Displays next requested element
  function displayNext() {
    quiz.fadeOut(function() {
      $('#question').remove();
      
      if(questionCounter < questions.length){
        var nextQuestion = createQuestionElement(questionCounter);
        quiz.append(nextQuestion).fadeIn();
        if (!(isNaN(selections[questionCounter]))) {
          $('input[value='+selections[questionCounter]+']').prop('checked', true);
        }
        
        // Controls display of 'prev' button
        if(questionCounter === 1){
          $('#prev').show();
        } else if(questionCounter === 0){
          
          $('#prev').hide();
          $('#next').show();
        }
      }else {
        var scoreElem = displayScore();
        quiz.append(scoreElem).fadeIn();
        $('#next').hide();
        $('#prev').hide();
        $('#start').show();
      }
    });
  }
  
  // Computes score and returns a paragraph element to be displayed
  function displayScore() {
    var score = $('<p>',{id: 'question'});
    
    var numCorrect = 0;
    for (var i = 0; i < selections.length; i++) {
      if (selections[i] === questions[i].correctAnswer) {
        numCorrect++;
      }
    }
    
    score.append('Kamu Berhasil Menjawab Benar : ' + numCorrect + ' , dari Soal Sejumlah : ' +
                 questions.length + ' soal<br/>Nilai Kamu :' + ((numCorrect/questions.length)*100));
    return score;
  }
})();