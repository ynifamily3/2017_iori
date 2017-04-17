       var canvas;
        var ctx;
        var audio;
        var context;
        var analyser;
        var source;
        var fbc_array;
        var bars = 200;
        var intensity = 0;
        var rot = 0;
        var react_x = 0;
        var react_y = 0;
        var rads = 0;
        var bar_x;
        var bar_y;
        var center_x;
        var center_y;
        var bar_height;
        var bar_x_term;
        var bar_y_term;
        var radius = 0;
        var deltarad = 0;
        var shockwave = 0;
        var bar_width;
        /*global Image*/
	    var imageObj = new Image();
	    imageObj.src = 'assets/logo.png';
        
        window.onload = function () {
            canvas = document.getElementById("iori_render");
            ctx = canvas.getContext("2d");
            imageObj.onload = () => ctx.drawImage(imageObj, 69, 50);
            resize_canvas();
            audio = new Audio("assets/Sentimental_Venus.mp3");
            audio.controls = true;
            audio.loop = false;
            audio.autoplay = true;
            /*global AudioContext*/
	        context = new AudioContext();
	        analyser = context.createAnalyser();
	        // route audio playback
	        source = context.createMediaElementSource(audio);
	        source.connect(analyser);
	        analyser.connect(context.destination);
	        fbc_array = new Uint8Array(analyser.frequencyBinCount);
	        draw();
        };
        function resize_canvas() {
            canvas.width  = window.innerWidth;
		    canvas.height = window.innerHeight;
        }
        function draw() {
            resize_canvas();

            var grd = ctx.createLinearGradient(0, 0, 0, canvas.height);
        	grd.addColorStop(0, "rgba(255, 206, 250, 1)");
	        grd.addColorStop(1, "rgba(204, 155, 199, 1)");
	        ctx.fillStyle = grd;
	        ctx.fillRect(0, 0, canvas.width, canvas.height);
            
            ctx.fillStyle = "rgba(255, 255, 255, " + (intensity * 0.0000125 - 0.4) + ")";
	        ctx.fillRect(0, 0, canvas.width, canvas.height);
	        
	       // rot = rot + intensity * 0.0000001;
	        react_x = 0;
	        react_y = 0;
	        intensity = 0;
	        analyser.getByteFrequencyData(fbc_array);
	        for (var i = 0; i < bars; i++) {
	            rads = Math.PI * 2 / bars;
	            
	            bar_x = center_x;
	            bar_y = center_y;
	            
	            bar_height = Math.min(99999, Math.max((fbc_array[i] * 2.5 - 200), 0));
		bar_width = bar_height * 0.02;
						
		bar_x_term = center_x + Math.cos(rads * i + rot) * (radius + bar_height);
		bar_y_term = center_y + Math.sin(rads * i + rot) * (radius + bar_height);
						
	//	ctx.save();
					
		var lineColor = "rgb(" + (fbc_array[i]).toString() + ", " + 255 + ", " + 255 + ")";
						
		ctx.strokeStyle = lineColor;
		ctx.lineWidth = bar_width;
		ctx.beginPath();
		ctx.moveTo(bar_x, bar_y);
		ctx.lineTo(bar_x_term, bar_y_term);
		ctx.stroke();
					
		react_x += Math.cos(rads * i + rot) * (radius + bar_height);
		react_y += Math.sin(rads * i + rot) * (radius + bar_height);
					
		intensity += bar_height;
	        }
	        
	        center_x = canvas.width / 2;// - (react_x * 0.007);
	        center_y = canvas.height / 2;// - (react_y * 0.007);
	        
	       
            
            if(imageObj)
                ctx.drawImage(imageObj, 69, 50); //load 안됐을땐?
            window.requestAnimationFrame(draw);
        }