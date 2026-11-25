// Show/hide conditional fields
function toggleFields() {
    const choice = document.getElementById("therapyTaken").value;
    const extra = document.getElementById("extraFields");

    extra.style.display = (choice === "yes") ? "block" : "none";
}

// Populate dropdowns
window.onload = () => {

    // AGE (1–100)
    const age = document.getElementById("age");
    for (let i = 1; i <= 100; i++) {
        let opt = document.createElement("option");
        opt.value = i;
        opt.text = i;
        age.appendChild(opt);
    }

    // DURATION
    const duration = document.getElementById("duration");

    for (let i = 1; i <= 364; i++) {
        let opt = document.createElement("option");
        opt.value = i;
        opt.text = i + " days";
        duration.appendChild(opt);
    }

    for (let i = 1; i <= 10; i++) {
        let opt = document.createElement("option");
        opt.value = i * 365;
        opt.text = i + " year";
        duration.appendChild(opt);
    }

    // Hide conditional fields initially
    document.getElementById("extraFields").style.display = "none";
}

// Submit (ready for Flask)
async function submitForm() {

    const data = {
        age: document.getElementById("age").value,
        gender: document.getElementById("gender").value,
        symptom: document.getElementById("symptom").value,
        disease: document.getElementById("disease").value,
        condition: document.getElementById("condition").value,
        severity: document.getElementById("severity")?.value || "",
        duration: document.getElementById("duration")?.value || "",
        previous: document.getElementById("previous")?.value || "",
        response: document.getElementById("response")?.value || "",
        lifestyle: document.getElementById("lifestyle").value
    };

    try {
        const response = await fetch("/predict", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });

        const result = await response.json();

        document.getElementById("result").innerHTML =
            "Therapy: " + result.therapy ;

    } catch (error) {
        document.getElementById("result").innerHTML =
            "Error connecting to server ";
    }
}