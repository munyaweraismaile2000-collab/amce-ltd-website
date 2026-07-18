document.getElementById("loginBtn").addEventListener("click", async () => {

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const message = document.getElementById("message");

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password
  });

  if (error) {
    message.style.color = "red";
    message.textContent = error.message;
    return;
  }

  message.style.color = "green";
  message.textContent = "Login successful";

  window.location.href = "dashboard.html";

});