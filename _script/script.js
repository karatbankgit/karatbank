
// Polyfill for padding numbers

// https://github.com/uxitten/polyfill/blob/master/string.polyfill.js
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/padStart
if (!String.prototype.padStart) {
	String.prototype.padStart = function padStart(targetLength,padString) {
		targetLength = targetLength>>0; //truncate if number or convert non-number to 0;
		padString = String((typeof padString !== 'undefined' ? padString : ' '));
		if (this.length > targetLength) {
			return String(this);
		}
		else {
			targetLength = targetLength-this.length;
			if (targetLength > padString.length) {
				padString += padString.repeat(targetLength/padString.length); //append to original to ensure we are longer than needed
			}
			return padString.slice(0,targetLength) + String(this);
		}
	};
}


// Allow hamburger menu on mobile to open slidemenu

document.querySelector('.navigation-burger').addEventListener('click', e => {
	let nav = document.querySelector('.navigation')
	if(nav.classList.contains('navigation-open'))
		nav.classList.remove('navigation-open')
	else
		nav.classList.add('navigation-open')
})



// Toggle language EN / DE
let langselector = $('.navigation-languages select')
langselector.on('change', e => {
	let selectedlang = $(e.target).val()
	let currentlang = localStorage.getItem('lang')
	console.log(e.target, $(e.target).val())
	if(selectedlang == currentlang) return;
	localStorage.setItem('lang', selectedlang)
	document.location.reload()
})
if(localStorage.getItem('lang')) langselector.val( localStorage.getItem('lang') )
else langselector.val('en')



// Countdown

let timerSeconds = $('.hero-countdown-seconds, .coupon-countdown-seconds')
let timerMinutes = $('.hero-countdown-minutes, .coupon-countdown-minutes')
let timerHours = $('.hero-countdown-hours, .coupon-countdown-hours')
let timerDays = $('.hero-countdown-days, .coupon-countdown-days')

let timetable = [
	'2018-02-15 00:00:00',
	'2018-02-15 14:00:00',
	'2018-03-01 00:00:00',
	'2018-03-08 00:00:00',
	'2018-03-15 00:00:00',
	'2018-03-22 00:00:00',
	'2018-03-29 00:00:00',
	'2018-04-05 00:00:00',
	'2018-04-12 00:00:00',
	'2018-04-19 00:00:00'
]


// Get Server Time / fallback
$.get("_php/servertime.php")
.done(function( servertime ) {

	if(servertime == '' || isNaN(Date.parse(servertime)) ) {
		console.log("Local datetime taken, servertime not accessible:", servertime)
		servertime = moment( Date.now() ).format('YYYY-MM-DD HH:mm:ss')
	} else {
		console.log('Successful servertime:', servertime)
	}

	startCountdown(servertime)

})
.fail(function() {
	console.log('Error: Failed to get servertime')
	startCountdown( Date.now() )
});



function startCountdown(servertime){

	let timenow = moment(servertime, 'YYYY-MM-DD HH:mm:ss')
	let currentstage = 0
	let timedifference;
	for(let i = 0; i < timetable.length; i++) {
		let deadline = timetable[i]
		timedifference = moment.duration( moment(deadline).diff(timenow) )
		if(timedifference.asSeconds() < 0) continue

		currentstage = (--i)
		break
	}

	console.log('ICO stage:', currentstage)

	setInterval(() => {
		
		timedifference.subtract(200, 'ms')

		// if(timedifference.asSeconds() < 0) window.location.reload()

		let diffseconds = (timedifference.seconds() + '').padStart(2, '0')
		let diffminutes = (timedifference.minutes() + '').padStart(2, '0')
		let diffhours = (timedifference.hours() + '').padStart(2, '0')
		let diffdays = (timedifference.days() + '').padStart(2, '0')

		timerSeconds.text(diffseconds)
		timerMinutes.text(diffminutes)
		timerHours.text(diffhours)
		timerDays.text(diffdays)
		// console.log(diffdays, diffhours, diffminutes, diffseconds)
		
	}, 200)

}


// Team member about

tippy('.team-member-about', {delay: [0, 1000]})
$('.team-member-about').on('click', e => e.preventDefault() )



window.addEventListener('load', fitVideos)
window.addEventListener('resize', fitVideos)
function fitVideos(){
	let videocontainers = $('.video')
	videocontainers.each(function(index){
		let contwidth = this.clientWidth
		let vidwidth = $(this).children('iframe').get(0).clientWidth
		$(this).children('iframe').get(0).width = contwidth
		$(this).children('iframe').get(0).height = contwidth * 0.5625
	})
}



// Particle.js

particlesJS.load('hero', '_script/particlesjs-config.json', function() {
	console.log('callback - particles.js config loaded');
});



function commafy( num ) {
	var str = num.toString().split('.');
	if (str[0].length >= 5) {
		str[0] = str[0].replace(/(\d)(?=(\d{3})+$)/g, '$1,');
	}
	return str.join('.');
}

document.querySelector('.hero-funding-token').textContent = commafy(document.querySelector('.hero-funding-token').textContent)
document.querySelector('.hero-funding-dollar').textContent = commafy(document.querySelector('.hero-funding-dollar').textContent)

