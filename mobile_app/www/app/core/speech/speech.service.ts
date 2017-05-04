function Speech() {
    function sayIt(text, config) {
        
        TTS.speak({
            text: text,
            locale: 'en-US',
            rate: 1.5
        }, 
        function () {}, 
        function (reason) {});
    }

    return {
        sayText: sayIt
    };
}