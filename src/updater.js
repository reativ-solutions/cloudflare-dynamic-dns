import { fetchDnsRecords, updateDnsRecord } from "./cloudflare.js";

export function executeDnsUpdate() {
    let publicIp = null;

    fetch('https://api.ipify.org?format=json')
        .then(response => response.json()) 
        .then(({ ip }) => {
            publicIp = ip;
            console.log('🌎 IP: ', publicIp);
            return fetchDnsRecords();
        })
        .then(records => Promise.all(records.map(dns => updateDnsRecord(dns, publicIp))))
        .then(() => console.log('🎉 DNS records updated!'))
        .catch(console.error);
}