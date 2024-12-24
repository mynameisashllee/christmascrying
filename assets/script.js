// Hashing function using SHA-256
async function sha256(message) {
    const encoder = new TextEncoder();
    const data = encoder.encode(message);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(byte => byte.toString(16).padStart(2, '0')).join('');
    return hashHex;
}

// Intern password check
async function checkInternPassword() {
    const internPassword = document.getElementById('internPassword').value;
    const hashedPassword = await sha256(internPassword);

    const correctHash = 'd951ba4838301581f57387313447ea02e620b1a52237d75ace23c3039cf039b9';
    
    if (hashedPassword === correctHash) {
        window.location.href = 'guestbook.html';
    } else {
        document.getElementById('error-message').textContent = 'Wrong password!';
    }
}

// Mentor password check
async function checkMentorPassword() {
    const mentorPassword = document.getElementById('mentorPassword').value;
    const hashedPassword = await sha256(mentorPassword);

    const correctHash = '558c2e1473fb38bf2f11ba2d28d3989f1cc9260785a75984041caad298681af3';
    
    if (hashedPassword === correctHash) {
        const mentorName = document.getElementById('mentorName').value;
        window.location.href = `guestbook.html?mentor=${mentorName}`;
    } else {
        document.getElementById('error-message').textContent = 'Wrong password!';
    }
}

// Display mentor name and load guestbook
window.onload = () => {
    const urlParams = new URLSearchParams(window.location.search);
    const mentorName = urlParams.get('mentor');
    if (mentorName) {
        document.getElementById('mentor-name').textContent = mentorName;
    }
};

// Submit message to guestbook
function submitMessage() {
    const message = document.getElementById('newMessage').value;
    if (!message) {
        alert("Please enter a message.");
        return;
    }

    const messageDiv = document.createElement('div');
    messageDiv.classList.add('message');
    messageDiv.textContent = message;

    document.getElementById('messages').appendChild(messageDiv);
    document.getElementById('newMessage').value = ''; // clear the input
}
