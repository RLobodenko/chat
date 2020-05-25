var video = document.querySelector("#vid"),
       canvas = document.querySelector('#canvas'),
       ctx = canvas.getContext('2d'),
       localMediaStream = null,
       onCameraFail = function (e) {
            console.log('Camera did not work.', e); // Исключение на случай, если камера не работает
        };
       navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;
        window.URL = window.URL || window.webkitURL;
        navigator.getUserMedia({video: true}, function(stream) {
            video.src = window.URL.createObjectURL(stream);
            localMediaStream = stream;
        }, onCameraFail);


        cameraInterval = setInterval(function(){ snapshot();}, 1);
function snapshot(){
       if(localMediaStream){
              ctx.drawImage(video, 0, 0);
        }
}

var last_message_id = 0, 
	load_in_process = false; 
function Load() {
    if(!load_in_process)
    {
	    load_in_process = true;
    	$.post("/", 
    	{
      	    p: "ajax", 
      	    last: last_message_id,
			version: version
    	},
   	    function (result) {
		    eval(result);
		    load_in_process = false; 
    	});
    }
}
var loadInterval = setInterval(Load, 1);




//////////////////////////////////////////////////////////////////////////

navigator.getUserMedia(
    // Настройки
    {
        video: true
    },
    // Колбэк для успешной операции
    function(stream){

        // Создаём объект для видео потока и
        // запускаем его в HTLM элементе video.
        video.src = window.URL.createObjectURL(stream);

        // Воспроизводим видео.
        video.play();

    },
    // Колбэк для не успешной операции
    function(err){

        // Наиболее частые ошибки — PermissionDenied и DevicesNotFound.
        console.error(err);

    }
);




function takeSnapshot(){

    var hidden_canvas = document.querySelector('canvas'),
        video = document.querySelector('video.camera_stream'),
        image = document.querySelector('img.photo'),

        // Получаем размер видео элемента.
        width = video.videoWidth,
        height = video.videoHeight,

        // Объект для работы с canvas.
        context = hidden_canvas.getContext('2d');


    // Установка размеров canvas идентичных с video.
    hidden_canvas.width = width;
    hidden_canvas.height = height;

    // Отрисовка текущего кадра с video в canvas.
    context.drawImage(video, 0, 0, width, height);

    // Преобразование кадра в изображение dataURL.
    var imageDataURL = hidden_canvas.toDataURL('image/png');

    // Помещение изображения в элемент img.
    image.setAttribute('src', imageDataURL);

}




