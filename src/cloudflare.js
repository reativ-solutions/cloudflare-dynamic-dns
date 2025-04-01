import { notify } from "./notification.js";

export async function fetchDnsRecords() {
    console.log('🎫 Loading DNS records...');
    const response = await fetch(`https://api.cloudflare.com/client/v4/zones/${process.env.ZONE_ID}/dns_records`, {
        headers: {
            'x-auth-email': process.env.USERNAME,
            'x-auth-key': process.env.API_KEY
        }
    });
    const data = await response.json();

    return data.result.filter(dns => dns.name.includes(process.env.SUBDOMAIN));
}

export async function updateDnsRecord(dns, ip) {
    console.log(dns.name, '\t=>\t', dns.content)

    if (dns.content === ip) {
        console.log('🔒 IP is the same, skipping...');
        return;
    }

    console.log('📨 Updating DNS record...');
    const response = await fetch(`https://api.cloudflare.com/client/v4/zones/${process.env.ZONE_ID}/dns_records/${dns.id}`, {
            method: 'PUT',
            headers: {
                'x-auth-email': process.env.USERNAME,
                'x-auth-key': process.env.API_KEY
            },
            body: JSON.stringify({
                ...dns,
                content: ip
            })
    });
    const data = await response.json(); 
    console.log('📨 DNS record updated:', data.result.name, ' to ', data.result.content);

    await notify('DNS Record Updated', `The DNS record ${data.result.name} was updated to ${data.result.content}`);

    return data;
}