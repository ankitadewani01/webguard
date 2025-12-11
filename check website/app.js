import express from 'express';
import https from 'https';
import whois from 'whois-json';
import fetch from 'node-fetch';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static('public'));
app.use(express.json());

app.post('/check', async (req, res) => {
    const { url } = req.body;
    const isHttps = url.startsWith('https://');

    try {
        const domain = url.replace(/^https?:\/\//, '');
        const domainInfo = await whois(domain, { timeout: 5000 });  // Added timeout for whois query
        const certInfo = {};

        if (isHttps) {
            https.get(url, (response) => {
                const cert = response.socket.getPeerCertificate();
                if (cert) {
                    certInfo.validFrom = cert.valid_from;
                    certInfo.validTo = cert.valid_to;
                    certInfo.issuer = cert.issuer.CN;
                }
                res.json({
                    isHttps,
                    domainValid: !!domainInfo.domainName,
                    certInfo,
                    success: true
                });
            }).on('error', (error) => {
                console.error('SSL check error:', error);
                res.status(500).json({ error: 'Internal Server Error' });
            }).setTimeout(5000, () => {  // Added timeout for SSL check
                res.status(500).json({ error: 'Request timed out' });
            });
        } else {
            res.json({
                isHttps,
                domainValid: !!domainInfo.domainName,
                certInfo: 'N/A',
                success: true
            });
        }
    } catch (error) {
        console.error('Domain info error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
