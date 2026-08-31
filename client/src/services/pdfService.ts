import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import { PayrollItem, PayrollRun, Employee, LeaveRequest } from '../types';

export const pdfService = {
  // Generate a professional individual payslip PDF
  generatePayslipPDF(item: PayrollItem, monthLabel: string) {
    const doc = new jsPDF();

    // Header with Dark Navy Background
    doc.setFillColor(15, 23, 42); // #0f172a (navy-900)
    doc.rect(0, 0, 210, 42, 'F');

    // Company Brand & Title
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(22);
    doc.setFont('helvetica', 'bold');
    doc.text('ElevateHR', 14, 20);

    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(148, 163, 184); // slate-400
    doc.text('Cloud-Based HR & Payroll Operations System', 14, 27);
    doc.text('Official Confidential Payslip', 14, 34);

    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(255, 255, 255);
    doc.text(`PAY PERIOD: ${monthLabel.toUpperCase()}`, 200, 24, { align: 'right' });

    // Employee & Company Details Box
    doc.setFillColor(248, 250, 252); // slate-50
    doc.roundedRect(14, 48, 182, 38, 3, 3, 'F');
    doc.setDrawColor(226, 232, 240);
    doc.roundedRect(14, 48, 182, 38, 3, 3, 'S');

    doc.setTextColor(15, 23, 42);
    doc.setFontSize(10);
    doc.setFont('helvetica', 'bold');
    doc.text('EMPLOYEE DETAILS', 20, 56);
    doc.text('PAYMENT DETAILS', 115, 56);

    doc.setFont('helvetica', 'normal');
    doc.setTextColor(71, 85, 105);
    doc.setFontSize(9);
    
    // Left column
    doc.text(`Employee Name: ${item.employeeName}`, 20, 64);
    doc.text(`Employee ID: ${item.employeeId}`, 20, 71);
    doc.text(`Department: ${item.department} | ${item.position}`, 20, 78);

    // Right column
    doc.text(`Bank Account: ${item.bankAccount}`, 115, 64);
    doc.text(`Payment Status: ${item.paymentStatus}`, 115, 71);
    doc.text(`Issued Date: 2026-08-24`, 115, 78);

    // Earnings & Deductions Tables
    const earningsData = [
      ['Base Monthly Salary', `$${item.baseSalary.toFixed(2)}`],
      ['Fixed Allowances', `$${item.allowances.toFixed(2)}`],
      [`Overtime Pay (${item.overtimeHours} hrs @ 1.5x)`, `$${item.overtimePay.toFixed(2)}`],
      ['Performance Bonus', `$${item.bonus.toFixed(2)}`],
      ['Gross Earnings Total', `$${item.grossSalary.toFixed(2)}`]
    ];

    const deductionsData = [
      [`Salary Tax (${item.taxRate}%)`, `$${item.taxAmount.toFixed(2)}`],
      ['NSSF Contribution (4%)', `$${item.nssfContribution.toFixed(2)}`],
      ['Other Deductions / Unpaid Leave', `$${item.deductions.toFixed(2)}`],
      ['Total Deductions', `$${(item.taxAmount + item.nssfContribution + item.deductions).toFixed(2)}`]
    ];

    autoTable(doc, {
      startY: 94,
      head: [['Earnings Category', 'Amount (USD)']],
      body: earningsData,
      theme: 'grid',
      headStyles: { fillColor: [22, 163, 74], textColor: 255, fontStyle: 'bold' },
      styles: { fontSize: 9, cellPadding: 4 },
      columnStyles: {
        0: { cellWidth: 120 },
        1: { cellWidth: 62, halign: 'right' }
      }
    });

    const finalY1 = (doc as any).lastAutoTable.finalY || 140;

    autoTable(doc, {
      startY: finalY1 + 8,
      head: [['Tax & Statutory Deductions', 'Amount (USD)']],
      body: deductionsData,
      theme: 'grid',
      headStyles: { fillColor: [225, 29, 72], textColor: 255, fontStyle: 'bold' },
      styles: { fontSize: 9, cellPadding: 4 },
      columnStyles: {
        0: { cellWidth: 120 },
        1: { cellWidth: 62, halign: 'right' }
      }
    });

    const finalY2 = (doc as any).lastAutoTable.finalY || 200;

    // Net Take-Home Pay Highlight Box
    doc.setFillColor(240, 253, 244); // brand-50
    doc.setDrawColor(34, 197, 94); // brand-500
    doc.roundedRect(14, finalY2 + 10, 182, 28, 3, 3, 'FD');

    doc.setTextColor(21, 128, 61);
    doc.setFontSize(11);
    doc.setFont('helvetica', 'bold');
    doc.text('NET TAKE-HOME PAY', 20, finalY2 + 22);

    doc.setFontSize(18);
    doc.setTextColor(22, 101, 52);
    doc.text(`$${item.netPay.toFixed(2)} USD`, 190, finalY2 + 27, { align: 'right' });

    // Footer & Signatures
    const sigY = finalY2 + 55;
    doc.setTextColor(100, 116, 139);
    doc.setFontSize(9);
    doc.setFont('helvetica', 'normal');

    doc.line(20, sigY, 80, sigY);
    doc.text('Authorized HR Signatory', 30, sigY + 6);

    doc.line(130, sigY, 190, sigY);
    doc.text('Employee Signature & Date', 138, sigY + 6);

    doc.setFontSize(8);
    doc.setTextColor(148, 163, 184);
    doc.text('Generated electronically via ElevateHR Cloud Platform • AES-256 Encrypted & Compliant with Labor Regulations', 105, 285, { align: 'center' });

    doc.save(`Payslip_${item.employeeId}_${monthLabel.replace(/\s+/g, '_')}.pdf`);
  },

  // Generate Master Employee Directory PDF
  generateEmployeeRosterPDF(employees: Employee[]) {
    const doc = new jsPDF('landscape');

    doc.setFillColor(15, 23, 42);
    doc.rect(0, 0, 297, 30, 'F');

    doc.setTextColor(255, 255, 255);
    doc.setFontSize(18);
    doc.setFont('helvetica', 'bold');
    doc.text('ElevateHR - Employee Master Roster', 14, 18);

    doc.setFontSize(9);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(148, 163, 184);
    doc.text(`Generated: ${new Date().toLocaleDateString()} | Total Headcount: ${employees.length}`, 280, 18, { align: 'right' });

    const tableData = employees.map(e => [
      e.id,
      `${e.firstName} ${e.lastName}`,
      e.department,
      e.position,
      e.nationality || 'Cambodian',
      e.isForeignWorker ? (e.workPermitStatus || 'Valid') : 'Local (N/A)',
      `$${e.baseSalary}`,
      e.status,
      e.phone
    ]);

    autoTable(doc, {
      startY: 38,
      head: [['ID', 'Full Name', 'Department', 'Position', 'Nationality', 'Work Permit', 'Base Salary', 'Status', 'Phone']],
      body: tableData,
      theme: 'striped',
      headStyles: { fillColor: [15, 23, 42], textColor: 255 },
      styles: { fontSize: 8, cellPadding: 3 }
    });

    doc.save(`ElevateHR_Employee_Master_Roster_${new Date().toISOString().split('T')[0]}.pdf`);
  },

  // Generate Payroll Run Summary PDF
  generatePayrollSummaryPDF(run: PayrollRun) {
    const doc = new jsPDF('landscape');

    doc.setFillColor(15, 23, 42);
    doc.rect(0, 0, 297, 30, 'F');

    doc.setTextColor(255, 255, 255);
    doc.setFontSize(18);
    doc.setFont('helvetica', 'bold');
    doc.text(`ElevateHR - Payroll Summary Report (${run.monthLabel})`, 14, 18);

    doc.setFontSize(9);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(148, 163, 184);
    doc.text(`Status: ${run.status} | Net Total: $${run.totalNet.toLocaleString()}`, 280, 18, { align: 'right' });

    const tableData = run.items.map(item => [
      item.employeeId,
      item.employeeName,
      item.department,
      `$${item.baseSalary.toFixed(2)}`,
      `$${item.allowances.toFixed(2)}`,
      `$${item.overtimePay.toFixed(2)}`,
      `$${item.grossSalary.toFixed(2)}`,
      `$${item.taxAmount.toFixed(2)} (${item.taxRate}%)`,
      `$${item.nssfContribution.toFixed(2)}`,
      `$${item.netPay.toFixed(2)}`,
      item.paymentStatus
    ]);

    autoTable(doc, {
      startY: 38,
      head: [['ID', 'Employee Name', 'Dept', 'Base', 'Allow.', 'OT Pay', 'Gross', 'Tax', 'NSSF', 'Net Pay', 'Status']],
      body: tableData,
      theme: 'grid',
      headStyles: { fillColor: [22, 163, 74], textColor: 255 },
      styles: { fontSize: 8, cellPadding: 3 },
      foot: [[
        'Total', '', '', '', '', '',
        `$${run.totalGross.toFixed(2)}`,
        `$${run.totalTax.toFixed(2)}`,
        `$${run.totalNssf.toFixed(2)}`,
        `$${run.totalNet.toFixed(2)}`,
        ''
      ]],
      footStyles: { fillColor: [15, 23, 42], textColor: 255, fontStyle: 'bold' }
    });

    doc.save(`Payroll_Summary_${run.month}.pdf`);
  },

  // Generate Leave Report PDF
  generateLeaveReportPDF(leaves: LeaveRequest[]) {
    const doc = new jsPDF();

    doc.setFillColor(15, 23, 42);
    doc.rect(0, 0, 210, 30, 'F');

    doc.setTextColor(255, 255, 255);
    doc.setFontSize(18);
    doc.setFont('helvetica', 'bold');
    doc.text('ElevateHR - Leave & Absence Report', 14, 18);

    doc.setFontSize(9);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(148, 163, 184);
    doc.text(`Records: ${leaves.length}`, 195, 18, { align: 'right' });

    const tableData = leaves.map(l => [
      l.id,
      l.employeeName,
      l.department,
      l.leaveType,
      `${l.startDate} to ${l.endDate}`,
      `${l.totalDays} d`,
      l.status,
      l.approverName || '—'
    ]);

    autoTable(doc, {
      startY: 38,
      head: [['ID', 'Employee', 'Department', 'Leave Type', 'Period', 'Days', 'Status', 'Approver']],
      body: tableData,
      theme: 'striped',
      headStyles: { fillColor: [15, 23, 42], textColor: 255 },
      styles: { fontSize: 8, cellPadding: 3 }
    });

    doc.save(`Leave_Absence_Report_${new Date().toISOString().split('T')[0]}.pdf`);
  }
};
