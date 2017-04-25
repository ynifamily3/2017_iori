!function(window, canvas, audio, a, s) {
    if(!window || !canvas) return;
    
    var ready = false;
    var fbc_array, analyser, context, source;
    var ctx = canvas.getContext("2d"); //854 480
    var imageObj = new window.Image();
	imageObj.src = 'assets/iori.jpg';
	var drawflag = false;
    var intensity;
    window.onload = function() {
        
        imageObj.onload = function() { drawflag = true; }
        
        audio_setting();
        draw();
    }
    
    function draw() {
        resize_canvas();
        setBG();
        analyser.getByteFrequencyData(fbc_array); //current FreQ Data (max 1024)
        drawBar();
        window.requestAnimationFrame(draw); //enterFrame
    }
    
    function drawBar() {
        var startX = 50;
        var startY = canvas.height / 2 - 50;
        for (var i = 0; i < fbc_array.length; i++) {
            var bar = {x:startX + 25*i, y:startY-fbc_array[i]/20, height:fbc_array[i]};
            ctx.fillStyle = 'rgba(255, 158, 199, 1)';
            ctx.shadowBlur = 20;
            ctx.shadowColor = "rgb(0, 0, 0)";
            ctx.fillRect(bar.x, bar.y, 5, bar.height/10);
        }
    }
    
    function setBG() {
        var grd = ctx.createLinearGradient(0, 0, 0, canvas.height);
        grd.addColorStop(0, "rgb(239, 245, 255)");
	    grd.addColorStop(1, "rgb(164, 197, 252)");
	    ctx.fillStyle = grd;
	    ctx.fillRect(0, 0, canvas.width, canvas.height);
        //ctx.fillStyle = "rgba(255, 255, 255, " + (intensity * 0.0000125 - 0.4) + ")";
	    ctx.fillRect(0, 0, canvas.width, canvas.height);
	    ctx.drawImage(imageObj, 0, 0);
    }
    
    function audio_setting() {
        audio = new Audio("assets/Sentimental_Venus.mp3");
        audio.controls = true;
        audio.loop = false;
        audio.autoplay = true;
        context = new (window.AudioContext || window.webkitAudioContext)();
        analyser = context.createAnalyser();
        analyser.fftSize = 64; //32
        source = context.createMediaElementSource(audio);
        source.connect(analyser);
        analyser.connect(context.destination);
        fbc_array = new Uint8Array(analyser.frequencyBinCount);
    }

    
    function resize_canvas() {
        canvas.width = 854;
        canvas.height = 480;
    }
}(window, document.getElementById("iori_render"));