import { EventEmitter } from "@angular/core";

interface ICodeToolHostComponent {
    
}

interface ICodeEventTimeline {
    
}

interface ICodeButtonPanel {

}

interface IButtonConfiguration {
    $key?: string;
    identifier?: string;  // obsolete
    eventType: string;
    color: string;
    leadSeconds: number;
    lagSeconds: number;
}

// model type
interface ICodingEvent {
    eventType: string;
    color: string;
    time: number;
    leadSeconds: number;
    lagSeconds: number;
}

interface MediaLoadedEvent {
    duration: number;
}

interface IMediaPlayer {
    /**
     * Starts media playback.
     *
     *     player.play();
     */
    play(): void;
    
    /**
     * Pauses the video playback.
     *
     *     player.pause();
     */
    pause(): void;

    /**
     * Resets the state of the video player.
     *
     *     player.reset();
     */
    reset();

    /**
     * Get whether or not the player is in the "paused" state.
     *
     *     var isPaused = player.paused();
     *
     * @return True if the player is in the paused state, false if not.
     */
    paused(): boolean;

    /**
     * Get the duration of the current media item.  
     * 
     * @return A number representing the duration in seconds.  Returns zero if the media is empty. 
     */
    duration(): number;

    /**
     * Sets or returns the current playback position in the audio/video (in seconds)
     *
     * ##### Example of setting:
     *     player.currentTime(120); // 2 minutes into the video
     *
     * ##### Example of getting:
     *     let currentTime = player.currentTime();
     *
     * @param  seconds Time to seek to, in seconds.
     */
    currentTime(seconds: number): void;
    currentTime(): number;



    /**
     * Sets or gets the current media for the player
     * ##### Example of setting:
     *     player.media('http://mediaservices.com/move.mpg');
     *
     * ##### Example of getting:
     *     let currentMedia = player.media()
     * 
     * @param  url The url of the media item to load.
     */
    media(url: string, type: string): void;
    media(): string;
}

interface IMediaPlayerControls {
    onplay: EventEmitter<any>;
    onpause: EventEmitter<any>;
    onreset: EventEmitter<any>;
}