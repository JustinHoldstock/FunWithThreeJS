function Main(){};

Main.Renderer = null;
Main.DeltaTime = 0.0;

//setup for a basic camera and scene with a camera
Main.init = function(){
	Main.Renderer = new THREE.WebGLRenderer({ antialias : true });
	Main.Renderer.setSize(ThreeHelper.WIDTH, ThreeHelper.HEIGHT);
	Main.Renderer.setClearColor(0xEEEEEE, 1.0);
	Main.Renderer.clear();
	
	document.body.appendChild(Main.Renderer.domElement);
};

Main.requestAnimation = function() {
	
	var prevTime = Date.now();
	
	Main.update(Main.DeltaTime);
	Main.draw(Main.DeltaTime);
	
    Main.DeltaTime = (Date.now() - prevTime) / 1000;
	
	window.requestAnimationFrame(Main.requestAnimation, Main.Renderer.domElement);
};

Main.update = function(_dt){
	
};

Main.draw = function(_dt){
	
};
