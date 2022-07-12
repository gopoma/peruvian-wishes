document.addEventListener("DOMContentLoaded", function() {
  document.querySelectorAll(".message__closer").forEach(message => {
    message.onclick = function() {
      message.parentNode.parentNode.removeChild(message.parentNode);
    };
  });

  const profileDropdown = document.querySelector("#profileDropdown");
  if(profileDropdown) {
    profileDropdown.onclick = function() {
      document.querySelector("#btnLogout").classList.toggle("hidden");
    };
  }
});

document.onclick = function(evt) {
  if(evt.target.id !== "profileDropdown") {
    document.querySelector("#btnLogout")?.classList.add("hidden");
  }
};