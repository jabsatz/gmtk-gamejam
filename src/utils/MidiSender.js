import WebMidi from 'webmidi/webmidi.min'

class MidiSender {

    constructor(BPM, enabled) {
        this.BPM = BPM
        this.output = {}
        this.enabled = process.env.NODE_ENV === "development" && enabled
        
    }

    init() {
        if(this.enabled) {
            WebMidi.enable((err) => {
                if (err) return console.log("WebMidi could not be enabled.", err);
                this.output =  WebMidi.outputs[0];
                console.log('MIDI OUTPUT IS', this.output)
            })
        }
    }

    onHit() {
        if(this.enabled) {
            this.output.playNote("C3");
        }
    }

    onEnd() {
        if(this.enabled) {
            
        }
    }

}

export default MidiSender


