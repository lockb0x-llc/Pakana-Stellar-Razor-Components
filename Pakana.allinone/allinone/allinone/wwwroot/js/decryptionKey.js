document.getElementById('decryptionForm').addEventListener('submit',
    function (event) {
        event.preventDefault();
        const encryptedKeyTextarea =
            document.getElementById('encryptedKey');
        const saltInput = document.getElementById('decryptionSalt');
        if (!encryptedKeyTextarea || !saltInput) {
            displayDecryptionError('Required elements not found.');
            return;
        }
        const encryptedKey = encryptedKeyTextarea.value.trim();
        const salt = saltInput.value.trim();
        // Generate key for decryption using the provided salt
        const decryptionKey = sjcl.misc.pbkdf2(salt, salt, 1000, 256);
        try {
            // Decrypt the encrypted key with the generated decryptionKey
            const decryptedKey = sjcl.decrypt(decryptionKey, encryptedKey);
            // Display the decrypted key
            const decryptedKeyHtml = `
     <p><strong>Decrypted Key:</strong>
    ${decryptedKey}</p>
     `;
            document.getElementById('decryptedKey').innerHTML =
                decryptedKeyHtml;
            // Show the copy button
            document.getElementById('copyDecryptedKeyButton').style.display = 'inline';
        } catch (error) {
            displayDecryptionError(`Decryption Error: ${error.message}`);
        }
    });
// Function to copy the decrypted key to clipboard
document.getElementById('copyDecryptedKeyButton').addEventListener('click', function () {
    const decryptedKeyText =
        document.getElementById('decryptedKey').textContent;
    const textarea = document.createElement('textarea');
    textarea.value = decryptedKeyText;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
    alert('Decrypted Key copied to clipboard!');
});
function displayDecryptionError(message) {
    const errorHtml = `<p><strong>Error:</strong> ${message}</p>`;
    document.getElementById('decryptedKey').innerHTML = errorHtml;
}
