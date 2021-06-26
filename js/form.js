let serverURL = 'https://script.google.com/macros/s/AKfycbwsEtfV34Z7F4FbNjV88w-Wra8jomZfYSwib2lrenLxVBdjI8viwT-jH82Od-HtD-nwYQ/exec';
let articleNum = 1;
let event_ary = ['input[type=text]', 'textarea'];


$(document).ready(function() {
  initBtnFunc();
  setProgress();
  showAni();
});

for(let i=0;i<event_ary.length;i++){
  $(event_ary[i]).focusout(function(event) {
    if($(this).val() == ''){
      setTip($(this));
    }
  });
  $(event_ary[i]).keyup(function(event) {
    if($(this).val() != ''){
      removeTip($(this));
    }
  });
}

$('select').change(function(event) {
  removeTip($(this));
});

function initBtnFunc(){
  $('.btn-next').click(function(event) {
    checkField();
  });
  $('.btn-prev').click(function(event) {
    switchArticle('prev');
  });
  $('.btn-send').click(function(event) {
    sendToServer();
  });
  $('.btn-prev').hide();
  $('.btn-send').hide();
}

function checkField(){
  switch(articleNum){
    case 1:
     //NAME_HERE
      if($('input[name=NAME_HERE]').val() == ''){
        setTip($('input[name=NAME_HERE]'));
        return false;
      }
      switchArticle('next');  
      break;

    case 2:
     //NUMBER_HERE
      if($('input[name=NUMBER_HERE]').val() == ''){
        setTip($('input[name=NUMBER_HERE]'));
        return false;
      }
      switchArticle('next');  
      break;

    case 3:
    //LETTER_HERE
      if($('input[name=LETTER_HERE]').val() == ''){
        setTip($('input[name=LETTER_HERE]'));
        return false;
      }
      switchArticle('next');  
      break;

    default:
      switchArticle('next');          
  }
}

function setTip(dom){
  let template = $('#tipTemplate01');
  let node = $('#tipTemplate01').html();
  if(dom.closest('.main-group').find('.tip').length == 0){
    dom.closest('.main-group').append(node);
    dom.closest('.main-group').addClass('bdr');
  }
}

function removeTip(dom){
  dom.closest('.main-group').find('.tip').remove();
  dom.closest('.main-group').removeClass('bdr'); 
}


function switchArticle(situation){
  switch(situation){
    case 'next':
      if(articleNum < 4){
        $('nav').hide();
        gsap.to('#article'+articleNum,{
          duration: 1, //秒
          x: $('.container').width()*-1,
          onComplete: backToCenter,
          onCompleteParams: [articleNum, situation]
        });
        $('.img'+articleNum).hide();
        $('.img'+articleNum).remove('newPosi');
        articleNum++;
        $('#article'+articleNum).show();
        gsap.to('#article'+articleNum, {duration: 0, x: $('.container').width()});
        gsap.to('#article'+articleNum, {duration: 1, x: 0});
        setProgress();

      }
      break;

    case 'prev':
      if(articleNum > 1){
        $('nav').hide();
        gsap.to('#article'+articleNum,{
          duration: 1, //秒
          x: $('.container').width(),
          onComplete: backToCenter,
          onCompleteParams: [articleNum, situation]
        });
        $('.img'+articleNum).hide();
        $('.img'+articleNum).remove('newPosi');
        articleNum--;
        $('#article'+articleNum).show();
        gsap.to('#article'+articleNum, {duration: 0, x: $('.container').width()*-1});
        gsap.to('#article'+articleNum, {duration: 1, x: 0});
        setProgress();
      }    
      break;
  }
}

function backToCenter(oldNum, situation){
  $('#article'+oldNum).hide();
  gsap.to('#article'+oldNum, {duration: 0, x: 0});
  $('nav').show();
  showAni();
  switch(situation){
    case 'next':
      $('nav').show();
      $('.btn-next').show();
      $('.btn-prev').show();  
      if(articleNum == 3){
        $('.btn-next').hide();
        $('.btn-send').show(); 
      }else if(articleNum == 4){
        $('nav').hide();
      }        
      break;
    case 'prev':
      $('nav').show();
      $('.btn-next').show();
      $('.btn-prev').show();
      if(articleNum == 1){
        $('btn-prev').hide();
      }
      break;
  }
}

function showAni(){
  $('.img'+articleNum).show();
  setTimeout(function(){
  $('.img'+articleNum).addClass('newPosi');
  },100);
}

function setProgress(){
  let w= Math.floor((articleNum/4)*100);
  $('.progress-bar').css('width',w+'%');
}

function sendToServer(){
  let parameter = {};
  parameter.NAME_HERE = $('input[name=NAME_HERE]').val();
  parameter.NUMBER_HERE = $('input[name=NUMBER_HERE]').val();
  parameter.LETTER_HERE = $('input[name=LETTER_HERE]').val();

  parameter.method = "write1";

  console.log(parameter);

  $('.cover').css('display','grid');
  $.post(serverURL,parameter,function(data){
    console.log(data);
    if(data.result = 'sus'){
      // alert('送出成功');
      switchArticle('next');
      $('.cover').css('display','none');
    }else{
      $('.cover').css('display','none');
      alert('送出失敗，請檢查再試試');
    }
  }).fail(function(data){
      alert('送出失敗');
      console.log(data);
  });
}