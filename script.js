// Sample data (replace this with dynamic data as needed)
const data = {
    seller: {
        name: "ABC Pvt Ltd",
        address: "123 Business St",
        city: "New Delhi",
        state: "Delhi",
        pincode: "110001",
        pan: "AAAPL1234C",
        gst: "07AAAPL1234C1Z7"
    },
    buyer: {
        name: "XYZ Enterprises",
        address: "789 Commercial St",
        city: "Mumbai",
        state: "Maharashtra",
        pincode: "400001"
    },
    place_of_supply: "Delhi",
    place_of_delivery: "Delhi",
    items: [
        {
            description: "Product 1",
            unit_price: 100,
            quantity: 2,
            discount: 10
        },
        {
            description: "Product 2",
            unit_price: 200,
            quantity: 1,
            discount: 20
        }
    ]
};

// Function to generate the invoice
function generateInvoice() {
    // Populate seller and buyer details
    document.getElementById("sellerName").textContent = data.seller.name;
    document.getElementById("sellerAddress").textContent = `${data.seller.address}, ${data.seller.city}, ${data.seller.state}, ${data.seller.pincode}`;
    document.getElementById("sellerPan").textContent = data.seller.pan;
    document.getElementById("sellerGst").textContent = data.seller.gst;

    document.getElementById("buyerName").textContent = data.buyer.name;
    document.getElementById("buyerAddress").textContent = `${data.buyer.address}, ${data.buyer.city}, ${data.buyer.state}, ${data.buyer.pincode}`;

    // Generate item table
    let total = 0;
    const itemTable = document.getElementById("itemTable");
    itemTable.innerHTML = ""; // Clear existing rows

    data.items.forEach(item => {
        const netAmount = (item.unit_price * item.quantity) - item.discount;
        total += netAmount;

        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${item.description}</td>
            <td>${item.unit_price}</td>
            <td>${item.quantity}</td>
            <td>${item.discount}</td>
            <td>${netAmount}</td>
        `;
        itemTable.appendChild(row);
    });

    // Calculate tax
    let taxType, taxRate;
    if (data.place_of_supply === data.place_of_delivery) {
        taxType = "CGST & SGST";
        taxRate = 9;
    } else {
        taxType = "IGST";
        taxRate = 18;
    }

    const taxAmount = total * (taxRate / 100);
    const grandTotal = total + taxAmount;

    document.getElementById("totalAmount").textContent = total.toFixed(2);
    document.getElementById("taxLabel").textContent = `${taxType} (${taxRate}%): $${taxAmount.toFixed(2)}`;
    document.getElementById("grandTotal").textContent = grandTotal.toFixed(2);
    document.getElementById("amountInWords").textContent = convertNumberToWords(grandTotal);
}

// Function to convert numbers to words (simple implementation)
function convertNumberToWords(amount) {
    const words = [
        "", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine", "Ten",
        "Eleven", "Twelve", "Thirteen", "Fourteen", "Fifteen", "Sixteen", "Seventeen", "Eighteen", "Nineteen", "Twenty",
        "Thirty", "Forty", "Fifty", "Sixty", "Seventy", "Eighty", "Ninety"
    ];
    if (amount < 20) return words[amount];
    if (amount < 100) return words[20 + Math.floor(amount / 10)] + (amount % 10 !== 0 ? " " + words[amount % 10] : "");
    return "Amount too large!";
}
