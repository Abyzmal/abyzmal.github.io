document.body.style.margin   = 0
document.body.style.overflow = `hidden`
document.body.bgColor        = `tomato`

// the onclick property takes a function
// and passes that function a Mouse Event
document.onclick = click_handler

const audio_context = new AudioContext ()
audio_context.suspend ()

// declare mutable variable
// for the audio buffer
let vibraphone_buffer

// this is an asynchronous function
// that will load the audio data
// into the buffer declared above
// from the audio file
get_vibraphone ()

// we are name the argument mouse_event
// so we can refer to the mouse event
// the .onclick method passes in
function click_handler (mouse_event) { 
    if (audio_context.state == 'suspended') {
        audio_context.resume ()
        document.body.bgColor = `forestgreen`
    } else {
        // mouse_event has the coordinates
        // of the mouse position stored in it
        // as .clientX and .clientY properties
        const x_pos = mouse_event.clientX

        // divide the position by the width
        // to get a ratio between 0 - 1
        const x_ratio = x_pos / window.innerWidth

        // pass in 2 to the power of the ratio
        // this value will become the playback rate
        play_vibraphone (2 ** x_ratio)
    }
}

// the keyword async specifies that the function we
// are declaring here is asynchronous.  Which means
// it will wait until the data loads at each step 
// before moving on to the next.   
async function get_vibraphone () {

    // we are storing in the global variable
    // the result of a three step process
    // the first part fetches the file
    vibraphone_buffer = await fetch ("oofroblox.mp3")

        // the second step formats the binary data
        // in an array
        .then (response => response.arrayBuffer ())

        // the third step encodes the binary data
        // as an audio buffer, which is returned
        // and stored in the global variable above
        .then (buffer => audio_context.decodeAudioData (buffer))
}

// this is the function that makes the sound
function play_vibraphone (rate) {

    // create a buffer source node
    const buf_node = audio_context.createBufferSource ()

    // wire it up to the audio output device
    buf_node.connect (audio_context.destination)

    // point the node's buffer to the audio 
    // buffer stored in vibraphone_buffer
    buf_node.buffer = vibraphone_buffer

    // use the argument passed into the function
    // as the playback rate
    buf_node.playbackRate.value = rate

    // node to start playing the audio buffer
    buf_node.start (audio_context.currentTime)
}

// assign the click handler function 
// to the .onclick property of the document
document.onclick = click_handler

// -----------------------------------------


// get rid of the default padding
// document.body.style.margin   = 0
// document.body.style.overflow = `hidden`

// create an html canvas element
// > <canvas></canvas>
// const cnv  = document.createElement ('canvas')

//adjusting the wdth and height
// cnv.width  = window.innerWidth
// cnv.height = window.innerHeight

//incoporate into the DOM 
// document.body.appendChild (cnv)

//
// const ctx = cnv.getContext ('2d')

// console.log ('hello css')

// Set line width
// ctx.lineWidth = 10;

// Wall
// ctx.strokeRect(75, 140, 150, 110);

// Door
// ctx.fillRect(130, 190, 40, 60);

// Roof
//ctx.beginPath();
// ctx.moveTo(50, 140);
// ctx.lineTo(150, 60);
// ctx.lineTo(250, 140);
// ctx.closePath();
// ctx.stroke();