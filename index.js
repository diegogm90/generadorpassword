document.addEventListener("DOMContentLoaded", function() {
    // Event listener para generar la contraseña
    document.getElementById("generate-btn").addEventListener("click", generatePassword);


});

function generatePassword() {
    const length = parseInt(document.getElementById('password-length').value, 10);
    const includeNumbers = document.getElementById('include-numbers').checked;
    const includeSymbols = document.getElementById('include-symbols').checked;

    const charsetLetters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const charsetNumbers = includeNumbers ? "0123456789" : "";
    const charsetSymbols = includeSymbols ? "!@#$%^&*()-_+=<>?/[]{}" : "";

    let password = "";

    while (!isValidPassword(password, includeNumbers, includeSymbols)) {
        password = "";
        const charset = charsetLetters + charsetNumbers + charsetSymbols;
        for (let i = 0; i < length; i++) {
            const randomIndex = Math.floor(Math.random() * charset.length);
            password += charset[randomIndex];
        }
    }

    document.getElementById('generated-password').value = password;
}

function isValidPassword(password, includeNumbers, includeSymbols) {
    if (includeNumbers && !/\d/.test(password)) {
        return false;
    }

    if (includeSymbols && !/[!@#$%^&*()-_+=<>?/[\]{}]/.test(password)) {
        return false;
    }

    return true;
}

// Event listener para copiar la contraseña al portapapeles
document.getElementById("copy-btn").addEventListener("click", async function() {
    try {
        const passwordField = document.getElementById("generated-password");
        await navigator.clipboard.writeText(passwordField.value);
        alert("Contraseña copiada al portapapeles!");
    } catch (err) {
        console.error("Error al copiar la contraseña", err);
        alert("Error al copiar la contraseña. Por favor, intenta de nuevo.");
    }
});