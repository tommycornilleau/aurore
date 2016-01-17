var scene = require('./scene');
var sound = require('./Sound');

var camControls = require('../actions/camControls');

var groupLoader = require('../creators/groupLoader');

var raf = require('../utils/raf');

function Mission01(){

	this.addObjects = this.addObjects.bind(this);
	this.introFinished = this.introFinished.bind(this);

	this.movementSpeed = 120;

	this.groupName = 'garden';

	this.section = document.getElementById('webGL');


}

Mission01.prototype.init = function() {

	scene.init();

	this.createObjects();

	this.addListeners();

};

Mission01.prototype.createObjects = function() {

	this.groupLoader = new groupLoader(this.groupName);

	this.groupPromise = this.groupLoader.load();

	this.groupPromise.then(this.addObjects, this.error);

};

Mission01.prototype.addObjects = function(geometries) {

	var meshes = null;
	var hitbox = null;


	meshes = this.groupLoader.createMeshes(geometries);

	scene.addMeshes(meshes);

	console.log(scene.scene);

	hitBox = scene.scene.getObjectByName('HouseMin');


	TweenMax.set(this.section, { opacity: 0 } );
	TweenMax.to(this.section, 1, { opacity: 1, display:'block' } );


	camControls.init(scene.camera, scene.gui, hitBox);

	camControls.controls.movementSpeed = 0;


	sound.init('start');

	sound.play();


	raf.start();
};

Mission01.prototype.addListeners = function() {

	sound.player.addEventListener('ended', this.introFinished );

};

Mission01.prototype.introFinished = function() {

	camControls.controls.movementSpeed = this.movementSpeed;

};

Mission01.prototype.walk = function() {

	sound.init('sound__01');

	setTimeout(sound.play, 20000);

};

Mission01.prototype.error = function() {

	console.log('Error.');
	console.log('Not good bro. Not good.');

};

module.exports = new Mission01();