function ThreeTest(){};
//default window heights
ThreeTest.WINDOW_WIDTH = 400;
ThreeTest.WINDOW_HEIGHT = 300;

ThreeTest.initCubes = function() {
	var width = 400;
	var height = 300;
	
	var renderer = new THREE.WebGLRenderer({ antialias : true });
	renderer.setSize(width, height);

	document.body.appendChild(renderer.domElement);
	
	renderer.setClearColor(0xEEEEEE, 1.0);
	renderer.clear();
	
	//add the camera
	var camera = new THREE.PerspectiveCamera(45, width/height, 1, 10000);
	camera.position.z = 300;
	
	//make a scene
	var scene = new THREE.Scene();
	var cube = new THREE.Mesh(new THREE.CubeGeometry(50,50,50), new THREE.MeshBasicMaterial({color : 0x000000}) );
	scene.add(cube);
	
	renderer.render(scene, camera);
	
	//add light
	var light = new THREE.SpotLight();
	light.position.set(170, 330, -160);
	scene.add(light);
	
	//add a lit cube
	var litCube = new THREE.Mesh(new THREE.CubeGeometry(50,50,50), new THREE.MeshLambertMaterial( {color : 0xFFFFFF} ));
	litCube.position.y = 50;
	scene.add(litCube);
	
	//ohhhhhh snap, shadows
	//enable shadows in the renderer
	renderer.shadowMapEnabled = true;
	//enabled them for the spotlight
	light.castShadow = true;
	//then enable them for the geometry
	litCube.castShadow = true;
	litCube.recieveShadow = true;
	
	//add a ground plane to test those shadows out
	var planeGeo = new THREE.PlaneGeometry(400, 200, 10, 10);
	var planeMat = new THREE.MeshLambertMaterial({color : 0xFFFFFF});
	var plane = new THREE.Mesh(planeGeo, planeMat);
	plane.rotation.x = -Math.PI/2;
	plane.position.y = -25;
	plane.recieveShadow = true;
	scene.add(plane);
	
	function animate(_t) {
		camera.position.x = Math.sin(_t/1000) * 300;
		camera.position.y = 150;
		camera.position.z = Math.cos(_t/3000) * 300;
		
		litCube.position.x = Math.cos(_t/600) * 85;
		litCube.position.y = 60 - Math.sin(_t/900) * 25;
		litCube.position.z = Math.sin(_t/600) * 85;
		litCube.rotation.x = _t/500;
		litCube.rotation.y = _t/800;


		camera.lookAt(scene.position);
		
		renderer.render(scene, camera);
		
		window.requestAnimationFrame(animate, renderer.domElement);
	};
	
	animate(new Date().getTime());
};

ThreeTest.initTestScene = function() {
	var WIDTH = 400,
		HEIGHT = 300;
		
	var VIEW_ANGLE = 45.0,
		ASPECT 	= WIDTH/HEIGHT,
		NEAR 	= 0.1,
		FAR 	= 10000;
		
	var body = document.body;
	
	var renderer = new THREE.WebGLRenderer({ antialias : true });
	renderer.setSize(WIDTH, HEIGHT);
	renderer.setClearColor(0xEEEEEE, 1.0);
	renderer.clear();
	
	var camera = new THREE.PerspectiveCamera(VIEW_ANGLE, ASPECT, NEAR, FAR);
	camera.position.z = 300;
	
	var scene = new THREE.Scene();
	
	scene.add(camera);
	
	body.appendChild(renderer.domElement);
	
	var radius = 50,
		segments = 16,
		rings = 16;
	
	var sphereMat = new THREE.MeshLambertMaterial({ color : 0xCC0000 });
	var sphere = Primitives.createSphere(radius, segments, rings, sphereMat);
	scene.add(sphere);
	
	var pointLight = new THREE.PointLight(0xFFFFFF);
	pointLight.position.x = 10;
	pointLight.position.y = 50;
	pointLight.position.z = 130;
	scene.add(pointLight);

	renderer.render(scene, camera);
};

ThreeTest.initParticles = function() {
	var FOV = 45.0,
		ASPECT = ThreeTest.WINDOW_WIDTH/ThreeTest.WINDOW_HEIGHT,
		NEAR = 0.1,
		FAR = 10000;
		
	var renderer = new THREE.WebGLRenderer( { antialias : true } );
	renderer.setSize(ThreeTest.WINDOW_WIDTH, ThreeTest.WINDOW_HEIGHT);
	renderer.setClearColor(0x000000, 1.0);
	renderer.clear();
	document.body.appendChild(renderer.domElement);
	
	var camera = new THREE.PerspectiveCamera(FOV, ASPECT, NEAR, FAR);
	camera.position.z = 300;
	
	var scene = new THREE.Scene();
	
	scene.add(camera);
	
	var particleCount = 1000,
		particles = new THREE.Geometry(),
		pMat = new THREE.ParticleBasicMaterial({
			color    : 0xFFFFFF,
			size     : 20,
			map      : THREE.ImageUtils.loadTexture("Assets/particle.png"),
			blending : THREE.AdditiveBlending,
			transparent : true
		});
		
	//create individual particles
	for(var i = 0; i < particleCount; i++) {
		//create particle with random position values
		var px = Math.random() * 500 - 250,
			py = Math.random() * 500 - 250,
			pz = Math.random() * 500 - 250,
			particle = new THREE.Vector3(px, py, pz);
			
		particle.velocity = new THREE.Vector3(0, -Math.random(), 0);
			
		particles.vertices.push(particle);
	}
	
	var particleSystem = new THREE.ParticleSystem(particles, pMat);
	particleSystem.sortParticles = true;
	
	scene.add(particleSystem);
	
	function update(_t) {
		
		particleSystem.rotation.y += 0.01;
		
		var pCount = particleCount;
		
		while(pCount--) {
			var particle = particles.vertices[pCount];
			
			//check for reset
			if(particle.y < -200) {
				particle.y = 200;
				particle.velocity.y = 0;
			}
			
			//update velocity with random shiiiizzz
			particle.velocity.y -= Math.random() * 0.1;
			
			particle.add(particle.velocity);
		}
		
		particleSystem.geometry.__dirtyVertices = true;
		
		renderer.render(scene, camera);
		window.requestAnimationFrame(update, renderer.domElement);
	};
	
	update(new Date().getTime());
};