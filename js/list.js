let serverURL = 'https://script.google.com/macros/s/AKfycbwsEtfV34Z7F4FbNjV88w-Wra8jomZfYSwib2lrenLxVBdjI8viwT-jH82Od-HtD-nwYQ/exec';
let articleNum = 1;

//執行頁面
$(document).ready(function() {
  readFromServer();
});

//載入資料用途
function  readFromServer(){
  let parameter = {};
  parameter.method = 'read1';//傳入的值
  $.post(serverURL, parameter, function(data){
    setTable(data);
    console.log(data); //檢查值是否被讀取
  }).fail(function(data){
    alert('error');
  });
}
//組表格樣板用途
function setTable(sData){
  //在setTable會找到tr01的樣板
  let node = $('#tr01').html();
  for(let i=1;i<sData.length;i++){
    let content = node.replace('LIST_HERE', i);
    content = content.replace('NAME_HERE', sData[i][1]);
    content = content.replace('NUMBER_HERE', sData[i][2]);
    content = content.replace('LETTER_HERE', sData[i][3]);
    $('tbody').append(content);
  }
}

//aplayer
$(".Song").on('click',function(e){
    var dataSwitchId = $(this).attr('data-switch');
    console.log(dataSwitchId);
    ap.list.switch(dataSwitchId);
    ap.play();
    $("#aplayer").addClass('shoewPlayer');
});

const ap = new APlayer({
    container: document.getElementById('aplayer'),
    listFolded: true,
    audio: [
    {
      name: 'Content',
      artist: 'Bo Burnham',
      url: 'mp3/Content.mp3',
      cover: 'img/Inside.jpg'
    },
    {
      name: 'Comedy',
      artist: 'Bo Burnham',
      url: 'mp3/Comedy.mp3',
      cover: 'img/Inside.jpg'
    },
    {
      name: 'FaceTime with my Mom(Tonight)',
      artist: 'Bo Burnham',
      url: 'mp3/FaceTime with my Mom (Tonight).mp3',
      cover: 'img/Inside.jpg'
    },
    {
      name: 'How the World Works',
      artist: 'Bo Burnham',
      url: 'mp3/How the World Works.mp3',
      cover: 'img/Inside.jpg'
    },
    {
      name: 'Problematic',
      artist: 'Bo Burnham',
      url: 'mp3/Problematic.mp3',
      cover: 'img/Inside.jpg'
    },
    {
      name: 'White Womans Instagram',
      artist: 'Bo Burnham',
      url: 'mp3/White Womans Instagram.mp3',
      cover: 'img/Inside.jpg'
    },
    {
      name: 'Unpaid Intern',
      artist: 'Bo Burnham',
      url: 'mp3/Unpaid Intern.mp3',
      cover: 'img/Inside.jpg'
    },
    {
      name: 'Sexting',
      artist: 'Bo Burnham',
      url: 'mp3/Sexting.mp3',
      cover: 'img/Inside.jpg'
    },
    {
      name: '30',
      artist: 'Bo Burnham',
      url: 'mp3/30.mp3',
      cover: 'img/Inside.jpg'
    },
    {
      name: 'Welcome to the Internet',
      artist: 'Bo Burnham',
      url: 'mp3/Welcome to the Internet.mp3',
      cover: 'img/Inside.jpg'
    },

    ]
});