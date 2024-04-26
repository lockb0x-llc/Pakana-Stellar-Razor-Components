<script>
    document.getElementById('decryptionForm').addEventListener('submit', function (event) {
        event.preventDefault();

    const encryptedSecretKeyTextarea = document.getElementById('encryptedSecretKey');
    const saltInput = document.getElementById('salt');

    if (!encryptedSecretKeyTextarea || !saltInput) {
        displayError('Required elements not found.');
    return;
            }

    const encryptedSecretKey = encryptedSecretKeyTextarea.value.trim();
    const salt = saltInput.value.trim();

    // Generate key for decryption using the provided salt
    const key = sjcl.misc.pbkdf2(salt, salt, 1000, 256);

    try {
                // Decrypt the encrypted secret key with the generated key
                const decryptedSecretKey = sjcl.decrypt(key, encryptedSecretKey);

    // Display the decrypted secret key
    const decryptedSecretKeyHtml = `
    <p><strong>Decrypted Secret Key:</strong> ${decryptedSecretKey}</p>
    `;
    document.getElementById('decryptedSecretKey').innerHTML = decryptedSecretKeyHtml;

    // Show the copy button
    document.getElementById('copyButton').style.display = 'inline';
            } catch (error) {
        displayError(`Decryption Error: ${error.message}`);
            }
        });

    // Function to copy the decrypted secret key to clipboard
    document.getElementById('copyButton').addEventListener('click', function () {
            const decryptedSecretKeyText = document.getElementById('decryptedSecretKey').textContent;
    const textarea = document.createElement('textarea');
    textarea.value = decryptedSecretKeyText;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
    alert('Decrypted Secret Key copied to clipboard!');
        });

    function displayError(message) {
            const errorHtml = `<p><strong>Error:</strong> ${message}</p>`;
    document.getElementById('decryptedSecretKey').innerHTML = errorHtml;
        }
</script>