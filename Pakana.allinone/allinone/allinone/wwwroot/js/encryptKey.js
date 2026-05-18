document.getElementById('encryptionForm').addEventListener('submit',
    function (event) {
        event.preventDefault();
        const secretKeyon = document.getElementById('secretKeyon').value.trim();
        const salton = document.getElementById('salton').value.trim();
        // Generate key for encryption using salt
        const key = sjcl.misc.pbkdf2(salton, salton, 1000, 256);
        // Encrypt the secret key with the generated key
        const encryptedSecretKey = sjcl.encrypt(key, secretKeyon);
        // Display the encrypted secret key
        const encryptedSecretKeyHtml = `
 <p><strong>Encrypted Secret Key:</strong>
${encryptedSecretKey}</p>
 `;
        document.getElementById('encryptedSecretKey').innerHTML =
            encryptedSecretKeyHtml;
        // Show the copy button
        document.getElementById('copyButton').style.display = 'inline';
    });
// Function to copy the encrypted secret key to clipboard
document.getElementById('copyButton').addEventListener('click', function () {
    const encryptedSecretKeyText =
        document.getElementById('encryptedSecretKey').textContent;
    const textarea = document.createElement('textarea');
    textarea.value = encryptedSecretKeyText;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
    alert('Encrypted Secret Key copied to clipboard!');
});