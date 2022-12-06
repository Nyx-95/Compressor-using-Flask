$(document).ready(function(){
   



var upload = document.querySelector('.upload')
var download = document.querySelector('.download')
var hiddenButton = document.querySelector('#hidden-button')
var inputValue = document.querySelector('.input-value')
var inputMetedata = document.getElementsByClassName('metadata')[0]
var outputMetedata = document.getElementsByClassName('metadata')[1]


upload.onclick = function(){
    hiddenButton.click();
}

function calculateValues(v, w, h){
    var outputQuality = ((100-v) / 100);
    var outputWidth = w;
    var outputHeight = h;
    Compress(outputQuality, outputWidth, outputHeight);
}

hiddenButton.onchange = () => {

    var file = hiddenButton.files[0];
    var url = URL.createObjectURL(file);
    var img = document.createElement('img');

    img.src = url;
    img.onload = function(){
        var w = img.width;
        var h = img.height;

       
            $('.metadata').css({display: "block"});


        inputMetedata.getElementsByTagName('li')[0].getElementsByTagName('span')[0].innerHTML = file.name;
        inputMetedata.getElementsByTagName('li')[1].getElementsByTagName('span')[0].innerHTML = ((file.size/1024)/1024).toFixed(2) + 'Mb';
        upload.setAttribute('filename', file.name);
        
        calculateValues(inputValue.value, w, h);
        
        inputValue.onchange = function(){
            calculateValues(inputValue.value, w, h);
        }
        document.querySelector('.bottom img').src = url;
    }
}


function Compress(q, w, h){
    new Compressor(hiddenButton.files[0], {
        
        quality: q,
        width: w,
        height: h,

        success(result){
            var url = URL.createObjectURL(result);
            var img = document.createElement('img');
            img.src = url;
            img.onload = function(){
                document.querySelector('.top img').src = url;
                outputMetedata.getElementsByTagName('li')[0].getElementsByTagName('span')[0].innerHTML = ((((q*100)-99))+((q*100)/100)*10).toFixed(0) + '%';           
                outputMetedata.getElementsByTagName('li')[1].getElementsByTagName('span')[0].innerHTML = ((result.size/1024)/1024).toFixed(2) + 'Mb';
            }
            download.onclick = function(){
                var filename = upload.getAttribute('filename').split('.');
                var a = document.createElement('a');
                a.href = url;
                a.download = filename[0] + '-min.' + filename[1];
                a.click();
            }
        },
        error(err){
            console.log(err.message);
        }
    })
}


});