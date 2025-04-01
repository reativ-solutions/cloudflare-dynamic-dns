import { fetchDnsRecords, updateDnsRecord } from "./cloudflare.js";
import { notify } from "./mailersend.js";

async function getPublicIp() {
    const response = await fetch('https://api.ipify.org?format=json');
    const json = await response.json();

    return json.ip;
}

async function fetchRecords() {
    console.log('🎫 Loading DNS records...');
    const records = await fetchDnsRecords();

    return records;
}

async function updateRecord(dns, ip) {
    console.log('📨 Updating DNS record...');
    const data = await updateDnsRecord(dns, ip);
    console.log('📨 DNS record updated:', data.result.name, ' to ', data.result.content);

    return data;
}

async function sendNotification() {
    const subject = 'DNS Record Updated';
    const text = `The DNS record ${data.result.name} was updated to ${data.result.content}`;

    await notify(subject, text);
    console.log('📧 Email sent');
    console.log('[Subject]', subject);
    console.log('[Text]', text);
}

async function update(ip) {
    const records = await fetchRecords();
    
    console.log(`🔄 Updating ${records.length} DNS records...`)
    let index = 0;

    for await (const dns of records) {
        if (dns.content === ip) {
            console.log('🔒 IP is the same, skipping...');
            return;
        }
        
        console.log(index++, ':\t', dns.name, '\t=>\t', dns.content)
        const data = await updateRecord(dns, ip);

        await sendNotification();
        
        console.log(`✅ The DNS record ${data.result.name} was updated to ${data.result.content}`)
    }
}

export async function execute() {
    try {
        const date = new Date();
        console.log(`🕒 Running at ${date.toLocaleString()}`);
        console.log('🚀 Starting DNS updater...');
        const publicIp = await getPublicIp();
        console.log('🌎 IP: ', publicIp);
    
        await update(publicIp);
        
        console.log('🎉 DNS records updated!')
    } catch(e) {
        console.error('❌ Error updating DNS records:', e);
    }
}