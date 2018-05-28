'use strict';

// Put variables in global scope to make them available to the browser console.
var video = document.querySelector('video');
var canvas1=window.canvas=document.querySelector('#canvas1');
var canvas2 = window.canvas = document.querySelector('#canvas2');
var picturespace=document.getElementById("picture_space");
var sendemail=document.getElementById("send_email");

var count=0;
canvas2.width = document.body.clientWidth *2/5;
canvas2.height = document.body.clientWidth *2/5;
//button variable
//1 為拍照 2重拍 3發送 4 好了
var button1 = document.querySelector('#button1');
var button2=document.querySelector('#button2');
var button3=document.querySelector('#button3');
var button4=document.querySelector('#button4');
var inputtext=document.querySelector('#inputtext');

button1.onclick = function() {
  
  //設定圖片為二維,圖片來源為 video 畫圖的範圍 前面為 sourct 後面為 canvas 
  canvas1.getContext('2d').
    drawImage(video,0,0,video.videoHeight,video.videoHeight,0,0,canvas1.width,canvas1.height);
  video.style.display="none";
  canvas1.style.display="block";
};

button2.onclick=function(){
  //hide video 
  canvas1.style.display="none";
  video.style.display="block";

}

button3.onclick=function(){

  //send data to mongodb
  $.ajax({
    type:"POST",
    url:"/Kmessage",
    data:
    {
      picture:canvas2.toDataURL(),
      text:inputtext.value

    },
    success:function(data){
      $("#success1").text(data);

    },
    error:function(){
      $("#success1").text("send error");
    }
    

  });
  //alert(JSON.stringify(canvas.toDataURL()));
  
}
button4.onclick=function(){
  
  
  canvas2.getContext('2d').
    drawImage(canvas1,0,0,canvas1.width,canvas1.height,0,0,canvas2.width,canvas2.height);
  picturespace.style.display="none";
  sendemail.style.display="block";
  //讓圖形置中,由於我們canvas 的大小是在js 檔才設定,所以無法靠css 置中
  canvas2.style.top=($('#Kcontent').height()-canvas2.height)/2;
}
var constraints = {
  audio:false,
  video:{ 
    width:{ideal:4096},
    height:{ideal:2048}
  }
}
function handleSuccess(stream) {
  window.stream = stream; // make stream available to browser console
  video.srcObject = stream;
}

function handleError(error) {
  console.log('navigator.getUserMedia error: ', error);
}
navigator.mediaDevices.getUserMedia(constraints).
then(handleSuccess).catch(handleError);