export async function notify(subject, text) {
    await fetch('https://api.mailersend.com/v1/email', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-Requested-With': 'XMLHttpRequest',
            'Authorization': `Bearer ${process.env.MAILERSEND_API_KEY}`
        },
        body: JSON.stringify({
            from: {
                name: 'Cloudflare Updater',
                email: process.env.NOTIFICATION_EMAIL
            },
            to: [
                {
                    email: process.env.NOTIFICATION_TO
                }
            ],
            subject,
            text
        })
    });

    console.log('📧 Email sent');
    console.log('[Subject]', subject);
    console.log('[Text]', text);
}