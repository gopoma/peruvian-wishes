document.addEventListener("DOMContentLoaded", function() {
    document.querySelectorAll(".message").forEach(message => {
        message.onclick = function() {
            message.parentNode.parentNode.removeChild(message.parentNode);
        }
    });
});