const API_BASE_URL = "http://localhost:5000/api";

// Helper function to show alerts
function showAlert(message, type = "success") {
  alert(`${type.toUpperCase()}: ${message}`);
}

// Registration Form Submission
document.getElementById("register-form").addEventListener("submit", async function (e) {
  e.preventDefault();
  const email = document.getElementById("email").value;
  const fullName = document.getElementById("name").value;
  const dob = document.getElementById("dob").value;
  const password = document.getElementById("password").value;
  const bioID = document.getElementById("bioid").value;

  try {
    const response = await fetch(`${API_BASE_URL}/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, fullName, dob, password, bioID }),
    });

    const result = await response.json();
    if (response.ok) {
      showAlert(result.message);
      window.location.href = "dashboard.html";
    } else {
      showAlert(result.error, "error");
    }
  } catch (error) {
    showAlert("Failed to register. Please try again later.", "error");
  }
});

// Login Form Submission
document.getElementById("login-form").addEventListener("submit", async function (e) {
  e.preventDefault();
  const email = document.getElementById("login-email").value;
  const password = document.getElementById("login-password").value;

  try {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const result = await response.json();
    if (response.ok) {
      localStorage.setItem("token", result.token);
      showAlert("Login successful!");
      window.location.href = "dashboard.html";
    } else {
      showAlert(result.error, "error");
    }
  } catch (error) {
    showAlert("Failed to log in. Please try again later.", "error");
  }
});

// Fetch and Display Petitions
async function loadPetitions() {
  const response = await fetch(`${API_BASE_URL}/petitions`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

  const data = await response.json();
  const tableBody = document.getElementById("petition-table");
  tableBody.innerHTML = data
    .map(
      (petition) => `
      <tr>
        <td>${petition._id}</td>
        <td>${petition.title}</td>
        <td>${petition.status}</td>
        <td>${petition.signatures.length}</td>
        <td>
          ${
            petition.status === "open"
              ? `<button onclick="signPetition('${petition._id}')">Sign</button>`
              : "Closed"
          }
        </td>
      </tr>
    `
    )
    .join("");
}

// Create Petition
document.getElementById("create-petition-form")?.addEventListener("submit", async function (e) {
  e.preventDefault();
  const title = document.getElementById("petition-title").value;
  const content = document.getElementById("petition-content").value;

  try {
    const response = await fetch(`${API_BASE_URL}/petitions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({ title, content }),
    });

    const result = await response.json();
    if (response.ok) {
      showAlert("Petition created successfully!");
      window.location.reload();
    } else {
      showAlert(result.error, "error");
    }
  } catch (error) {
    showAlert("Failed to create a petition. Please try again later.", "error");
  }
});

// Load Petitions for Dashboard
async function loadPetitions() {
  try {
    const response = await fetch(`${API_BASE_URL}/petitions`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    const petitions = await response.json();
    const petitionTable = document.getElementById("petition-table");

    if (petitionTable) {
      petitionTable.innerHTML = petitions
        .map(
          (petition) => `
        <tr>
          <td>${petition._id}</td>
          <td>${petition.title}</td>
          <td>${petition.petitioner.email}</td>
          <td>${petition.status}</td>
          <td>${petition.signatures.length}</td>
          <td>
            ${
              petition.status === "open"
                ? `<button class="btn btn-success btn-sm" onclick="signPetition('${petition._id}')">Sign</button>`
                : "--"
            }
          </td>
        </tr>
      `
        )
        .join("");
    }
  } catch (error) {
    showAlert("Failed to load petitions.", "error");
  }
}

// Sign Petition
async function signPetition(petitionId) {
  try {
    const response = await fetch(`${API_BASE_URL}/petitions/sign/${petitionId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    const result = await response.json();
    if (response.ok) {
      showAlert("Petition signed successfully!");
      window.location.reload();
    } else {
      showAlert(result.error, "error");
    }
  } catch (error) {
    showAlert("Failed to sign petition.", "error");
  }
}

// Automatically load petitions if the page is the dashboard
if (window.location.pathname.includes("dashboard.html")) {
  loadPetitions();
}
