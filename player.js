window.addEventListener('load',function(){
	//video-container
	video=document.getElementById('video');
	pauseScreen=document.getElementById('screen');
	screenButton=document.getElementById('screen-button');
	//buttons-container
	playButton=document.getElementById('play-button');
	soundButton=document.getElementById('sound-button');
	fullScreenButton=document.getElementById('fullscreen-button');

	//progress bar container
	pbarContainer=document.getElementById('pbar-container');
	pbar=document.getElementById('pbar');
	sbarContainer=document.getElementById('sbar-container');
	sbar=document.getElementById('sbar');
	timeField=document.getElementById('time-field');
	video.load();
	video.addEventListener('canplay',function (){
		playButton.addEventListener('click',playOrPause,false);
		pbarContainer.addEventListener('click',skip,false);
		updatePlayer();
		soundButton.addEventListener('click',muteOrUnmute,false);
		sbarContainer.addEventListener('click',changeVolume,false);
		fullScreenButton.addEventListener('click',fullScreen,false);
		screenButton.addEventListener('click',playOrPause,false);
	},false);
},false);
function skip(ev){
	var mouseX=ev.pageX- pbarContainer.offsetLeft;
	var width=window.getComputedStyle(pbarContainer).getPropertyValue('width');
	width=parseFloat(width.substr(0,width.length - 2));
	video.currentTime=(mouseX/width)*video.duration;
	updatePlayer();
}
function playOrPause(){
	if(video.paused){
		video.play();
		var playButton=document.getElementById('play-button');
		playButton.src='images/pause.png';
		update=setInterval(updatePlayer,30);
		pauseScreen.style.display='none';
		screenButton.src='images/play.png';
	}
	else{
		video.pause();
		var playButton=document.getElementById('play-button');
		playButton.src='images/play.png';
		window.clearInterval(update);
		pauseScreen.style.display='block';
		screenButton.src='images/play.png';
	}
}
function updatePlayer(){
	var percentage=(video.currentTime/video.duration)*100;
	var pbar=document.getElementById('pbar');
	pbar.style.width=percentage+'%';
	timeField.innerHTML=getFormattedTime();
	if(video.ended){
		var playButton=document.getElementById('play-button');
		playButton.src='images/replay.png';
		window.clearInterval(update);
		pauseScreen.style.display='block';
		screenButton.src='images/replay.png';	
	}
	else if(video.paused){
		var playButton=document.getElementById('play-button');
		screenButton.src='images/play.png';
		playButton.src='images/play.png';
	}
}
function getFormattedTime(){
	var seconds=Math.round(video.currentTime);
	var minutes=Math.floor(seconds/60);
	if(minutes>0){
		seconds-=minutes*60;		
	}
	if(seconds.toString().length===1){
		seconds='0'+seconds;
	}
	var totalSeconds=Math.round(video.duration);
	var totalMinutes=Math.floor(totalSeconds/60);
	if(totalMinutes>0){
		totalSeconds-=totalMinutes*60;
	}
	if(totalSeconds.toString().length===1){
		totalSeconds='0'+totalSeconds;
	}

	return minutes+":"+seconds+"/"+totalMinutes+":"+totalSeconds;

}
function muteOrUnmute(){
	if(!video.muted){
		video.muted=true;
		soundButton.src='images/mute.png';
		sbar.style.display='none';
	}
	else{
		video.muted=false;
		soundButton.src='images/sound.png';
		sbar.style.display='block';
	}
}
function changeVolume(ev){
	var mouseX=ev.pageX - sbarContainer.offsetLeft;
	var width=window.getComputedStyle(sbarContainer).getPropertyValue('width');
	width=parseFloat(width.substr(0,width.length - 2));

	video.volume=(mouseX/width);
	sbar.style.width=(mouseX/width)*100 +'%';
	video.muted=false;
	soundButton.src='images/sound.png';
	sbar.style.display='block';
}
function fullScreen(){
	if(video.requestFullScreen){
		video.requestFullScreen();
	}
	else if(video.webkitRequestFullScreen){
		video.webkitRequestFullScreen();
	}
	else if(video.mozRequestFullScreen){
		video.mozRequestFullScreen();
	}
	else if(video.msRequestFullScreen){
		video.msRequestFullScreen();
	}
}