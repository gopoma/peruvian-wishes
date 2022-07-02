document.addEventListener("DOMContentLoaded", function() {
    document.querySelectorAll(".message__closer").forEach(message => {
        message.onclick = function() {
            message.parentNode.parentNode.removeChild(message.parentNode);
        }
    });
});