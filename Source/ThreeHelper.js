function ThreeHelper(){};

ThreeHelper.HEIGHT = 768;
ThreeHelper.WIDTH = 1024;
ThreeHelper.NEAR = 0.1;
ThreeHelper.FAR = 10000;

ThreeHelper.Primitives = function(){};

ThreeHelper.Primitives.createSphere = function(_radius, _segments, _rings, _material) {
	return new THREE.Mesh(new THREE.SphereGeometry(_radius, _segments, _rings), _material);
};

ThreeHelper.Primitives.createCube = function(_width, _height, _depth, _material) {
	
	return new THREE.Mesh( new THREE.CubeGeometry(_width, _height, _depth), _material );
};

ThreeHelper.Primitives.createPlane = function(_width, _height, _wSegments, _hSegments, _material){
	
	return new THREE.Mesh(new THREE.PlaneGeometry(_width, _height, _wSegments, _hSegments), _material);
};
