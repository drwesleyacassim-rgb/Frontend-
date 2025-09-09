document.getElementById('certificateForm').addEventListener('submit', async function(event) {
    event.preventDefault();

    const { jsPDF } = window.jspdf;

    const name = document.getElementById('name').value;
    const idNumber = document.getElementById('idNumber').value;
    const issueDate = document.getElementById('issueDate').value;
    const expiryDate = document.getElementById('expiryDate').value;

    const doc = new jsPDF();
    doc.setFontSize(20);
    doc.text(`Department of Home Affairs`, 20, 20);
    doc.text(`Republic of South Africa`, 20, 30);
    doc.setFontSize(16);
    doc.text(`Official Permit/Certificate`, 20, 40);

    doc.setFontSize(12);
    doc.text(`Name: ${name}`, 20, 60);
    doc.text(`ID Number: ${idNumber}`, 20, 70);
    doc.text(`Issue Date: ${issueDate}`, 20, 80);
    doc.text(`Expiry Date: ${expiryDate}`, 20, 90);

    // Add a watermark
    doc.setFontSize(50);
    doc.setTextColor(200, 200, 200);
    doc.text('OFFICIAL', 75, 150, null, null, 'center');

    // Add a table for additional security information
    doc.autoTable({
        startY: 100,
        head: [['Security Feature', 'Description']],
        body: [
            ['Digital Signature', 'This document is digitally signed for authenticity.'],
            ['Watermark', 'Official watermark for anti-fraud measures.'],
            ['Unique ID', `Unique ID: ${await generateUniqueId()}`]
        ],
        theme: 'grid'
    });

    // Add a digital signature (simulated)
    doc.setFontSize(10);
    doc.text(`Digital Signature: ${await generateDigitalSignature()}`, 20, 200);

    // Add a border around the content
    doc.setLineWidth(0.5);
    doc.rect(10, 10, 190, 280);

    doc.save('dha_certificate.pdf');
});

async function generateUniqueId() {
    const response = await fetch('https://dha-backend.herokuapp.com/generate-id');
    const data = await response.json();
    return data.uniqueId;
}

async function generateDigitalSignature() {
    const response = await fetch('https://dha-backend.herokuapp.com/generate-signature');
    const data = await response.json();
    return data.digitalSignature;
}
