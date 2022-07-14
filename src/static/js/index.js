document.addEventListener("DOMContentLoaded", function() {
  document.querySelectorAll(".message__closer").forEach(message => {
    message.onclick = function() {
      message.parentNode.parentNode.removeChild(message.parentNode);
    };
  });

  const adminSiteDropdown = document.querySelector("#adminSiteDropdown");
  if(adminSiteDropdown) {
    adminSiteDropdown.onclick = function() {
      document.querySelector("#btnAdminSiteUsers").classList.toggle("hidden");
    };
  }

  const ordersDropdown = document.querySelector("#ordersDropdown");
  if(ordersDropdown) {
    ordersDropdown.onclick = function() {
      document.querySelector("#ordersLinks").classList.toggle("hidden");
    };
  }

  const profileDropdown = document.querySelector("#profileDropdown");
  if(profileDropdown) {
    profileDropdown.onclick = function() {
      document.querySelector("#btnLogout").classList.toggle("hidden");
    };
  }
});

document.onclick = function(evt) {
  if(evt.target.id !== "adminSiteDropdown") {
    document.querySelector("#btnAdminSiteUsers")?.classList.add("hidden");
  }
  if(evt.target.id !== "ordersDropdown") {
    document.querySelector("#ordersLinks")?.classList.add("hidden");
  }
  if(evt.target.id !== "profileDropdown") {
    document.querySelector("#btnLogout")?.classList.add("hidden");
  }
};