!function(){"use strict";window.SpeechSynthesisUtterance||window.speechSynthesis||(window.SpeechSynthesisUtterance=function(a){return{lang:"en",volume:1,onend:function(){},onstart:function(){},text:a}},window.speechSynthesis={speak:function(a){var b="http://www.corsproxy.com/translate.google.com/translate_tts?&q="+escape(a.text)+"&tl="+a.lang,c=new Audio(b);c.volume=a.volume,c.play(),c.addEventListener("ended",a.onend),c.addEventListener("play",a.onstart)}})}();
//# sourceMappingURL=polyfill-speechsynthesis.min.map