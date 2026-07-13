import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { Order } from '../types';

export const generateInvoicePDF = (order: Order) => {
  const doc = new jsPDF();
  const primaryColor = [16, 185, 129]; // emerald-500
  const textColor = [55, 65, 81]; // gray-700
  const headerTextColor = [17, 24, 39]; // gray-900

  // Add Company Logo / Name
  doc.setFontSize(24);
  doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
  doc.text('Akash Collection', 14, 22);
  
  doc.setFontSize(10);
  doc.setTextColor(textColor[0], textColor[1], textColor[2]);
  doc.text('Wholesale Clothing', 14, 28);
  doc.text('Abbasi Rd, Near Darbar, Sohan', 14, 34);
  doc.text('Islamabad, 45740, Pakistan', 14, 40);
  doc.text('Phone: 0312-1700872', 14, 46);

  // Invoice Title & Details
  doc.setFontSize(20);
  doc.setTextColor(headerTextColor[0], headerTextColor[1], headerTextColor[2]);
  doc.text('INVOICE', 140, 22);
  
  doc.setFontSize(10);
  doc.setTextColor(textColor[0], textColor[1], textColor[2]);
  doc.text(`Invoice No: ${order.id}`, 140, 30);
  doc.text(`Date: ${new Date(order.date).toLocaleDateString()}`, 140, 36);
  doc.text(`Status: ${order.status}`, 140, 42);
  if (order.trackingNo) {
    doc.text(`Tracking No: ${order.trackingNo}`, 140, 48);
  }

  // Bill To
  doc.setFontSize(12);
  doc.setTextColor(headerTextColor[0], headerTextColor[1], headerTextColor[2]);
  doc.text('Bill To:', 14, 60);
  
  doc.setFontSize(10);
  doc.setTextColor(textColor[0], textColor[1], textColor[2]);
  doc.text(`${order.customer.firstName} ${order.customer.lastName}`, 14, 66);
  doc.text(order.customer.phone, 14, 72);
  doc.text(order.customer.email, 14, 78);
  doc.text(order.customer.address, 14, 84);
  doc.text(`${order.customer.city}, ${order.customer.postalCode}`, 14, 90);

  // Items Table
  const tableColumn = ["Item", "Quantity", "Price", "Total"];
  const tableRows = order.items.map(item => [
    item.product.title,
    item.quantity.toString(),
    `Rs. ${item.product.price.toLocaleString()}`,
    `Rs. ${(item.product.price * item.quantity).toLocaleString()}`
  ]);

  autoTable(doc, {
    startY: 100,
    head: [tableColumn],
    body: tableRows,
    theme: 'striped',
    headStyles: {
      fillColor: primaryColor as [number, number, number],
      textColor: 255,
      halign: 'left'
    },
    styles: {
      fontSize: 10,
      cellPadding: 6,
      textColor: textColor as [number, number, number]
    },
    columnStyles: {
      0: { cellWidth: 'auto' },
      1: { halign: 'center' },
      2: { halign: 'right' },
      3: { halign: 'right' }
    }
  });

  // Totals
  const finalY = (doc as any).lastAutoTable.finalY || 100;
  
  doc.setFontSize(10);
  doc.setTextColor(textColor[0], textColor[1], textColor[2]);
  
  const totalLabelX = 140;
  const totalValueX = 195; // Right aligned
  
  doc.text('Subtotal:', totalLabelX, finalY + 10);
  doc.text(`Rs. ${order.total.toLocaleString()}`, totalValueX, finalY + 10, { align: 'right' });
  
  doc.text('Shipping:', totalLabelX, finalY + 18);
  doc.text('Rs. 0', totalValueX, finalY + 18, { align: 'right' });

  // Add line
  doc.setDrawColor(200, 200, 200);
  doc.line(totalLabelX, finalY + 22, totalValueX, finalY + 22);

  doc.setFontSize(12);
  doc.setTextColor(headerTextColor[0], headerTextColor[1], headerTextColor[2]);
  doc.setFont('helvetica', 'bold');
  doc.text('Total:', totalLabelX, finalY + 30);
  doc.text(`Rs. ${order.total.toLocaleString()}`, totalValueX, finalY + 30, { align: 'right' });

  // Footer
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  doc.setTextColor(156, 163, 175); // gray-400
  doc.text('Thank you for your business!', 14, 280);
  doc.text('For any queries, please contact akashcollection.pk@gmail.com', 14, 286);

  // Save the PDF
  doc.save(`Invoice_${order.id}.pdf`);
};
