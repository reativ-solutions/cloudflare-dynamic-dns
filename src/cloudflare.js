export async function fetchDnsRecords() {
    const response = await fetch(`https://api.cloudflare.com/client/v4/zones/${process.env.CLOUDFLARE_ZONE_ID}/dns_records`, {
        headers: {
            'x-auth-email': process.env.CLOUDFLARE_USERNAME,
            'x-auth-key': process.env.CLOUDFLARE_API_KEY
        }
    });
    const data = await response.json();

    return data.result.filter(dns => dns.name.includes(process.env.SUBDOMAIN));
}

export async function updateDnsRecord(dns, ip) {
    const response = await fetch(`https://api.cloudflare.com/client/v4/zones/${process.env.CLOUDFLARE_ZONE_ID}/dns_records/${dns.id}`, {
            method: 'PUT',
            headers: {
                'x-auth-email': process.env.CLOUDFLARE_USERNAME,
                'x-auth-key': process.env.CLOUDFLARE_API_KEY
            },
            body: JSON.stringify({
                ...dns,
                content: ip
            })
    });
    const data = await response.json(); 
    
    return data;
}