const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json({ limit: '10mb' }));

const DATA_FILE = path.join(__dirname, 'data', 'database.json');

// Initialize seed data if file doesn't exist
function getInitialData() {
  return {
    employees: [
      {
        id: "EHR-1001",
        firstName: "Sophea",
        lastName: "Chan",
        email: "sophea.chan@elevatehr.com",
        phone: "+855 12 345 678",
        gender: "Female",
        dateOfBirth: "1992-04-15",
        position: "Senior HR Manager",
        department: "Human Resources",
        role: "admin",
        status: "Active",
        contractType: "Full-time",
        contractStartDate: "2022-01-10",
        contractEndDate: "2026-12-31",
        baseSalary: 2200,
        currency: "USD",
        nssfNumber: "NSSF-88291039",
        nationalId: "010928374",
        address: "#45 Street 310, BKK1, Phnom Penh, Cambodia",
        bankName: "ABA Bank",
        bankAccountNumber: "001 839 201",
        emergencyContact: {
          name: "Dara Chan",
          relationship: "Spouse",
          phone: "+855 12 999 888"
        },
        leaveBalance: {
          annual: { total: 18, used: 3, remaining: 15 },
          sick: { total: 10, used: 1, remaining: 9 },
          casual: { total: 5, used: 0, remaining: 5 },
          maternity: { total: 90, used: 0, remaining: 90 },
          unpaid: { total: 0, used: 0, remaining: 0 }
        }
      },
      {
        id: "EHR-1002",
        firstName: "Vannak",
        lastName: "Rath",
        email: "vannak.rath@elevatehr.com",
        phone: "+855 98 765 432",
        gender: "Male",
        dateOfBirth: "1988-11-20",
        position: "Engineering Director",
        department: "Engineering",
        role: "manager",
        status: "Active",
        contractType: "Full-time",
        contractStartDate: "2021-03-01",
        contractEndDate: "2027-02-28",
        baseSalary: 3500,
        currency: "USD",
        nssfNumber: "NSSF-55482910",
        nationalId: "020394857",
        address: "#12B Street 51, Daun Penh, Phnom Penh, Cambodia",
        bankName: "ABA Bank",
        bankAccountNumber: "002 948 112",
        emergencyContact: {
          name: "Srey Leak",
          relationship: "Spouse",
          phone: "+855 98 111 222"
        },
        leaveBalance: {
          annual: { total: 18, used: 6, remaining: 12 },
          sick: { total: 10, used: 2, remaining: 8 },
          casual: { total: 5, used: 1, remaining: 4 },
          maternity: { total: 0, used: 0, remaining: 0 },
          unpaid: { total: 0, used: 0, remaining: 0 }
        }
      },
      {
        id: "EHR-1003",
        firstName: "Darith",
        lastName: "Sok",
        email: "darith.sok@elevatehr.com",
        phone: "+855 10 555 444",
        gender: "Male",
        dateOfBirth: "1996-08-05",
        position: "Full-Stack Developer",
        department: "Engineering",
        role: "employee",
        status: "Active",
        contractType: "Full-time",
        contractStartDate: "2023-05-15",
        contractEndDate: "2026-05-14",
        baseSalary: 1600,
        currency: "USD",
        nssfNumber: "NSSF-77291044",
        nationalId: "030192837",
        address: "#88 Street 271, Toul Kork, Phnom Penh, Cambodia",
        bankName: "Canadia Bank",
        bankAccountNumber: "110 394 885",
        emergencyContact: {
          name: "Sokha Sok",
          relationship: "Parent",
          phone: "+855 10 999 111"
        },
        leaveBalance: {
          annual: { total: 18, used: 4, remaining: 14 },
          sick: { total: 10, used: 0, remaining: 10 },
          casual: { total: 5, used: 0, remaining: 5 },
          maternity: { total: 0, used: 0, remaining: 0 },
          unpaid: { total: 0, used: 0, remaining: 0 }
        }
      },
      {
        id: "EHR-1004",
        firstName: "Bopha",
        lastName: "Chea",
        email: "bopha.chea@elevatehr.com",
        phone: "+855 77 123 999",
        gender: "Female",
        dateOfBirth: "1995-02-14",
        position: "Product Designer (UI/UX)",
        department: "Design",
        role: "employee",
        status: "Active",
        contractType: "Full-time",
        contractStartDate: "2023-08-01",
        contractEndDate: "2026-07-31",
        baseSalary: 1450,
        currency: "USD",
        nssfNumber: "NSSF-66382019",
        nationalId: "040293847",
        address: "#99 Russian Blvd, Sen Sok, Phnom Penh, Cambodia",
        bankName: "ABA Bank",
        bankAccountNumber: "003 481 990",
        emergencyContact: {
          name: "Narith Chea",
          relationship: "Sibling",
          phone: "+855 77 333 444"
        },
        leaveBalance: {
          annual: { total: 18, used: 5, remaining: 13 },
          sick: { total: 10, used: 1, remaining: 9 },
          casual: { total: 5, used: 2, remaining: 3 },
          maternity: { total: 90, used: 0, remaining: 90 },
          unpaid: { total: 0, used: 0, remaining: 0 }
        }
      },
      {
        id: "EHR-1005",
        firstName: "Kosal",
        lastName: "Meng",
        email: "kosal.meng@elevatehr.com",
        phone: "+855 89 444 333",
        gender: "Male",
        dateOfBirth: "1994-09-30",
        position: "Financial Analyst",
        department: "Finance",
        role: "employee",
        status: "Active",
        contractType: "Full-time",
        contractStartDate: "2022-09-01",
        contractEndDate: "2026-08-31",
        baseSalary: 1800,
        currency: "USD",
        nssfNumber: "NSSF-99382104",
        nationalId: "050392841",
        address: "#17 Street 2004, Sen Sok, Phnom Penh, Cambodia",
        bankName: "ACLEDA Bank",
        bankAccountNumber: "290 182 994",
        emergencyContact: {
          name: "Chanthy Meng",
          relationship: "Spouse",
          phone: "+855 89 222 111"
        },
        leaveBalance: {
          annual: { total: 18, used: 2, remaining: 16 },
          sick: { total: 10, used: 0, remaining: 10 },
          casual: { total: 5, used: 0, remaining: 5 },
          maternity: { total: 0, used: 0, remaining: 0 },
          unpaid: { total: 0, used: 0, remaining: 0 }
        }
      },
      {
        id: "EHR-1006",
        firstName: "Sreypov",
        lastName: "Heng",
        email: "sreypov.heng@elevatehr.com",
        phone: "+855 16 888 777",
        gender: "Female",
        dateOfBirth: "1998-03-22",
        position: "Marketing Specialist",
        department: "Marketing",
        role: "employee",
        status: "Active",
        contractType: "Full-time",
        contractStartDate: "2024-02-01",
        contractEndDate: "2026-01-31",
        baseSalary: 1100,
        currency: "USD",
        nssfNumber: "NSSF-44381920",
        nationalId: "060492819",
        address: "#22 Monivong Blvd, Chamkarmon, Phnom Penh, Cambodia",
        bankName: "ABA Bank",
        bankAccountNumber: "004 883 192",
        emergencyContact: {
          name: "Sothy Heng",
          relationship: "Parent",
          phone: "+855 16 111 555"
        },
        leaveBalance: {
          annual: { total: 18, used: 1, remaining: 17 },
          sick: { total: 10, used: 0, remaining: 10 },
          casual: { total: 5, used: 0, remaining: 5 },
          maternity: { total: 90, used: 0, remaining: 90 },
          unpaid: { total: 0, used: 0, remaining: 0 }
        }
      },
      {
        id: "EHR-1007",
        firstName: "Phanit",
        lastName: "Keo",
        email: "phanit.keo@elevatehr.com",
        phone: "+855 93 222 666",
        gender: "Male",
        dateOfBirth: "1997-12-10",
        position: "DevOps & Cloud Engineer",
        department: "Engineering",
        role: "employee",
        status: "Active",
        contractType: "Full-time",
        contractStartDate: "2023-11-01",
        contractEndDate: "2026-10-31",
        baseSalary: 1950,
        currency: "USD",
        nssfNumber: "NSSF-33291084",
        nationalId: "070591823",
        address: "#61 Street 150, Toul Kork, Phnom Penh, Cambodia",
        bankName: "ABA Bank",
        bankAccountNumber: "005 192 847",
        emergencyContact: {
          name: "Leakena Keo",
          relationship: "Spouse",
          phone: "+855 93 777 999"
        },
        leaveBalance: {
          annual: { total: 18, used: 2, remaining: 16 },
          sick: { total: 10, used: 1, remaining: 9 },
          casual: { total: 5, used: 0, remaining: 5 },
          maternity: { total: 0, used: 0, remaining: 0 },
          unpaid: { total: 0, used: 0, remaining: 0 }
        }
      },
      {
        id: "EHR-1008",
        firstName: "Thida",
        lastName: "Pich",
        email: "thida.pich@elevatehr.com",
        phone: "+855 12 777 333",
        gender: "Female",
        dateOfBirth: "2000-06-18",
        position: "Junior QA Engineer",
        department: "Quality Assurance",
        role: "employee",
        status: "Probation",
        contractType: "Probation",
        contractStartDate: "2026-06-01",
        contractEndDate: "2026-09-01",
        baseSalary: 850,
        currency: "USD",
        nssfNumber: "NSSF-11293847",
        nationalId: "080691724",
        address: "#10 Street 337, Toul Kork, Phnom Penh, Cambodia",
        bankName: "Wing Bank",
        bankAccountNumber: "991 827 364",
        emergencyContact: {
          name: "Chhay Pich",
          relationship: "Parent",
          phone: "+855 12 444 888"
        },
        leaveBalance: {
          annual: { total: 18, used: 0, remaining: 18 },
          sick: { total: 10, used: 0, remaining: 10 },
          casual: { total: 5, used: 0, remaining: 5 },
          maternity: { total: 90, used: 0, remaining: 90 },
          unpaid: { total: 0, used: 0, remaining: 0 }
        }
      }
    ],
    leaves: [
      {
        id: "LV-2026-001",
        employeeId: "EHR-1003",
        employeeName: "Darith Sok",
        department: "Engineering",
        leaveType: "Annual Leave",
        startDate: "2026-08-28",
        endDate: "2026-08-29",
        totalDays: 2,
        reason: "Family trip and personal relaxation",
        status: "Pending",
        appliedDate: "2026-08-22",
        approverName: null,
        approverRemarks: null,
        actionDate: null
      },
      {
        id: "LV-2026-002",
        employeeId: "EHR-1004",
        employeeName: "Bopha Chea",
        department: "Design",
        leaveType: "Sick Leave",
        startDate: "2026-08-25",
        endDate: "2026-08-25",
        totalDays: 1,
        reason: "Medical checkup & dentist appointment",
        status: "Pending",
        appliedDate: "2026-08-23",
        approverName: null,
        approverRemarks: null,
        actionDate: null
      },
      {
        id: "LV-2026-003",
        employeeId: "EHR-1006",
        employeeName: "Sreypov Heng",
        department: "Marketing",
        leaveType: "Annual Leave",
        startDate: "2026-08-10",
        endDate: "2026-08-11",
        totalDays: 2,
        reason: "Attending friend's wedding ceremony in Siem Reap",
        status: "Approved",
        appliedDate: "2026-08-01",
        approverName: "Sophea Chan",
        approverRemarks: "Approved. Enjoy your trip!",
        actionDate: "2026-08-02"
      },
      {
        id: "LV-2026-004",
        employeeId: "EHR-1002",
        employeeName: "Vannak Rath",
        department: "Engineering",
        leaveType: "Casual Leave",
        startDate: "2026-07-15",
        endDate: "2026-07-15",
        totalDays: 1,
        reason: "Home emergency repair",
        status: "Approved",
        appliedDate: "2026-07-14",
        approverName: "Sophea Chan",
        approverRemarks: "Approved",
        actionDate: "2026-07-14"
      },
      {
        id: "LV-2026-005",
        employeeId: "EHR-1005",
        employeeName: "Kosal Meng",
        department: "Finance",
        leaveType: "Annual Leave",
        startDate: "2026-06-20",
        endDate: "2026-06-24",
        totalDays: 5,
        reason: "Annual vacation with family",
        status: "Approved",
        appliedDate: "2026-06-05",
        approverName: "Sophea Chan",
        approverRemarks: "Approved. Please handover pending tasks to Sokha.",
        actionDate: "2026-06-06"
      }
    ],
    attendance: [
      {
        id: "ATT-2026-0824-001",
        employeeId: "EHR-1001",
        employeeName: "Sophea Chan",
        department: "Human Resources",
        date: "2026-08-24",
        clockIn: "08:02:15",
        clockOut: null,
        scheduledIn: "08:00:00",
        scheduledOut: "17:00:00",
        loggedHours: 5.7,
        status: "Present",
        workType: "Office"
      },
      {
        id: "ATT-2026-0824-002",
        employeeId: "EHR-1002",
        employeeName: "Vannak Rath",
        department: "Engineering",
        date: "2026-08-24",
        clockIn: "07:55:00",
        clockOut: null,
        scheduledIn: "08:00:00",
        scheduledOut: "17:00:00",
        loggedHours: 5.8,
        status: "Present",
        workType: "Office"
      },
      {
        id: "ATT-2026-0824-003",
        employeeId: "EHR-1003",
        employeeName: "Darith Sok",
        department: "Engineering",
        date: "2026-08-24",
        clockIn: "08:14:20",
        clockOut: null,
        scheduledIn: "08:00:00",
        scheduledOut: "17:00:00",
        loggedHours: 5.5,
        status: "Late",
        workType: "Office"
      },
      {
        id: "ATT-2026-0824-004",
        employeeId: "EHR-1004",
        employeeName: "Bopha Chea",
        department: "Design",
        date: "2026-08-24",
        clockIn: "08:00:10",
        clockOut: null,
        scheduledIn: "08:00:00",
        scheduledOut: "17:00:00",
        loggedHours: 5.7,
        status: "Present",
        workType: "Remote"
      },
      {
        id: "ATT-2026-0824-005",
        employeeId: "EHR-1005",
        employeeName: "Kosal Meng",
        department: "Finance",
        date: "2026-08-24",
        clockIn: "07:50:00",
        clockOut: null,
        scheduledIn: "08:00:00",
        scheduledOut: "17:00:00",
        loggedHours: 5.9,
        status: "Present",
        workType: "Office"
      },
      {
        id: "ATT-2026-0824-006",
        employeeId: "EHR-1006",
        employeeName: "Sreypov Heng",
        department: "Marketing",
        date: "2026-08-24",
        clockIn: "08:05:00",
        clockOut: null,
        scheduledIn: "08:00:00",
        scheduledOut: "17:00:00",
        loggedHours: 5.6,
        status: "Present",
        workType: "Office"
      },
      {
        id: "ATT-2026-0824-007",
        employeeId: "EHR-1007",
        employeeName: "Phanit Keo",
        department: "Engineering",
        date: "2026-08-24",
        clockIn: "08:00:00",
        clockOut: null,
        scheduledIn: "08:00:00",
        scheduledOut: "17:00:00",
        loggedHours: 5.7,
        status: "Present",
        workType: "Remote"
      },
      {
        id: "ATT-2026-0824-008",
        employeeId: "EHR-1008",
        employeeName: "Thida Pich",
        department: "Quality Assurance",
        date: "2026-08-24",
        clockIn: "08:01:00",
        clockOut: null,
        scheduledIn: "08:00:00",
        scheduledOut: "17:00:00",
        loggedHours: 5.7,
        status: "Present",
        workType: "Office"
      }
    ],
    payrollRuns: [
      {
        id: "PR-2026-07",
        month: "2026-07",
        monthLabel: "July 2026",
        status: "Finalized",
        totalGross: 14450,
        totalNet: 12835.5,
        totalTax: 1042.5,
        totalNssf: 572,
        processedBy: "Sophea Chan",
        processedDate: "2026-07-31",
        items: [
          {
            employeeId: "EHR-1001",
            employeeName: "Sophea Chan",
            position: "Senior HR Manager",
            department: "Human Resources",
            baseSalary: 2200,
            allowances: 150,
            overtimeHours: 4,
            overtimePay: 63.46,
            bonus: 0,
            grossSalary: 2413.46,
            taxRate: 10,
            taxAmount: 181.35,
            nssfContribution: 88,
            deductions: 0,
            netPay: 2144.11,
            paymentStatus: "Paid",
            bankAccount: "001 839 201 (ABA Bank)"
          },
          {
            employeeId: "EHR-1002",
            employeeName: "Vannak Rath",
            position: "Engineering Director",
            department: "Engineering",
            baseSalary: 3500,
            allowances: 250,
            overtimeHours: 0,
            overtimePay: 0,
            bonus: 200,
            grossSalary: 3950,
            taxRate: 15,
            taxAmount: 432.5,
            nssfContribution: 140,
            deductions: 0,
            netPay: 3377.5,
            paymentStatus: "Paid",
            bankAccount: "002 948 112 (ABA Bank)"
          },
          {
            employeeId: "EHR-1003",
            employeeName: "Darith Sok",
            position: "Full-Stack Developer",
            department: "Engineering",
            baseSalary: 1600,
            allowances: 100,
            overtimeHours: 8,
            overtimePay: 92.31,
            bonus: 0,
            grossSalary: 1792.31,
            taxRate: 5,
            taxAmount: 64.62,
            nssfContribution: 64,
            deductions: 0,
            netPay: 1663.69,
            paymentStatus: "Paid",
            bankAccount: "110 394 885 (Canadia Bank)"
          },
          {
            employeeId: "EHR-1004",
            employeeName: "Bopha Chea",
            position: "Product Designer (UI/UX)",
            department: "Design",
            baseSalary: 1450,
            allowances: 100,
            overtimeHours: 0,
            overtimePay: 0,
            bonus: 0,
            grossSalary: 1550,
            taxRate: 5,
            taxAmount: 52.5,
            nssfContribution: 58,
            deductions: 0,
            netPay: 1439.5,
            paymentStatus: "Paid",
            bankAccount: "003 481 990 (ABA Bank)"
          },
          {
            employeeId: "EHR-1005",
            employeeName: "Kosal Meng",
            position: "Financial Analyst",
            department: "Finance",
            baseSalary: 1800,
            allowances: 120,
            overtimeHours: 5,
            overtimePay: 64.9,
            bonus: 0,
            grossSalary: 1984.9,
            taxRate: 10,
            taxAmount: 138.49,
            nssfContribution: 72,
            deductions: 0,
            netPay: 1774.41,
            paymentStatus: "Paid",
            bankAccount: "290 182 994 (ACLEDA Bank)"
          },
          {
            employeeId: "EHR-1006",
            employeeName: "Sreypov Heng",
            position: "Marketing Specialist",
            department: "Marketing",
            baseSalary: 1100,
            allowances: 80,
            overtimeHours: 0,
            overtimePay: 0,
            bonus: 50,
            grossSalary: 1230,
            taxRate: 5,
            taxAmount: 36.5,
            nssfContribution: 44,
            deductions: 0,
            netPay: 1149.5,
            paymentStatus: "Paid",
            bankAccount: "004 883 192 (ABA Bank)"
          },
          {
            employeeId: "EHR-1007",
            employeeName: "Phanit Keo",
            position: "DevOps & Cloud Engineer",
            department: "Engineering",
            baseSalary: 1950,
            allowances: 120,
            overtimeHours: 6,
            overtimePay: 84.38,
            bonus: 0,
            grossSalary: 2154.38,
            taxRate: 10,
            taxAmount: 155.44,
            nssfContribution: 78,
            deductions: 0,
            netPay: 1920.94,
            paymentStatus: "Paid",
            bankAccount: "005 192 847 (ABA Bank)"
          },
          {
            employeeId: "EHR-1008",
            employeeName: "Thida Pich",
            position: "Junior QA Engineer",
            department: "Quality Assurance",
            baseSalary: 850,
            allowances: 50,
            overtimeHours: 0,
            overtimePay: 0,
            bonus: 0,
            grossSalary: 900,
            taxRate: 0,
            taxAmount: 0,
            nssfContribution: 34,
            deductions: 0,
            netPay: 866,
            paymentStatus: "Paid",
            bankAccount: "991 827 364 (Wing Bank)"
          }
        ]
      }
    ],
    documents: [
      {
        id: "DOC-1001",
        employeeId: "EHR-1003",
        employeeName: "Darith Sok",
        docType: "NSSF Card",
        fileName: "Darith_Sok_NSSF_Card.pdf",
        fileSize: "1.2 MB",
        uploadedAt: "2023-05-15",
        status: "Verified",
        verifiedBy: "Sophea Chan",
        category: "Identification"
      },
      {
        id: "DOC-1002",
        employeeId: "EHR-1003",
        employeeName: "Darith Sok",
        docType: "National ID / Passport",
        fileName: "Darith_Sok_National_ID.pdf",
        fileSize: "2.4 MB",
        uploadedAt: "2023-05-15",
        status: "Verified",
        verifiedBy: "Sophea Chan",
        category: "Identification"
      },
      {
        id: "DOC-1003",
        employeeId: "EHR-1003",
        employeeName: "Darith Sok",
        docType: "Employment Contract",
        fileName: "Employment_Contract_Darith_Sok.pdf",
        fileSize: "3.1 MB",
        uploadedAt: "2023-05-16",
        status: "Verified",
        verifiedBy: "Sophea Chan",
        category: "Legal"
      },
      {
        id: "DOC-1004",
        employeeId: "EHR-1004",
        employeeName: "Bopha Chea",
        docType: "CV / Resume",
        fileName: "Bopha_Chea_Senior_UIUX_CV.pdf",
        fileSize: "1.8 MB",
        uploadedAt: "2023-08-01",
        status: "Verified",
        verifiedBy: "Sophea Chan",
        category: "Career"
      },
      {
        id: "DOC-1005",
        employeeId: "EHR-1008",
        employeeName: "Thida Pich",
        docType: "NSSF Card",
        fileName: "Thida_Pich_NSSF_Submission.pdf",
        fileSize: "850 KB",
        uploadedAt: "2026-06-01",
        status: "Pending Verification",
        verifiedBy: null,
        category: "Identification"
      }
    ]
  };
}

// Read database
function readDB() {
  try {
    if (!fs.existsSync(DATA_FILE)) {
      const initial = getInitialData();
      fs.mkdirSync(path.dirname(DATA_FILE), { recursive: true });
      fs.writeFileSync(DATA_FILE, JSON.stringify(initial, null, 2));
      return initial;
    }
    const data = fs.readFileSync(DATA_FILE, 'utf8');
    return JSON.parse(data);
  } catch (err) {
    console.error('Error reading DB:', err);
    return getInitialData();
  }
}

// Write database
function writeDB(data) {
  try {
    fs.mkdirSync(path.dirname(DATA_FILE), { recursive: true });
    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
  } catch (err) {
    console.error('Error writing DB:', err);
  }
}

// --- STATS & DASHBOARD ---
app.get('/api/stats', (req, res) => {
  const db = readDB();
  const activeEmployees = db.employees.filter(e => e.status === 'Active' || e.status === 'Probation');
  const pendingLeaves = db.leaves.filter(l => l.status === 'Pending');
  
  // Today's date check for leaves
  const todayStr = "2026-08-24";
  const onLeaveToday = db.leaves.filter(l => 
    l.status === 'Approved' && l.startDate <= todayStr && l.endDate >= todayStr
  );

  const deptCounts = {};
  activeEmployees.forEach(e => {
    deptCounts[e.department] = (deptCounts[e.department] || 0) + 1;
  });

  const deptData = Object.keys(deptCounts).map(name => ({
    name,
    count: deptCounts[name]
  }));

  const totalMonthlyPayroll = activeEmployees.reduce((sum, e) => sum + (e.baseSalary || 0), 0);

  const stats = {
    totalEmployees: activeEmployees.length,
    onLeaveToday: onLeaveToday.length,
    pendingLeaves: pendingLeaves.length,
    monthlyPayrollEstimate: totalMonthlyPayroll,
    attendanceRate: 98.4,
    departmentBreakdown: deptData,
    payrollTrends: [
      { month: 'Mar', amount: 13200 },
      { month: 'Apr', amount: 13500 },
      { month: 'May', amount: 13800 },
      { month: 'Jun', amount: 14100 },
      { month: 'Jul', amount: 14450 },
      { month: 'Aug (Est)', amount: totalMonthlyPayroll }
    ],
    recentLeaves: db.leaves.slice(0, 5)
  };

  res.json(stats);
});

// --- EMPLOYEES ---
app.get('/api/employees', (req, res) => {
  const db = readDB();
  let list = db.employees;

  const { search, department, status, role } = req.query;
  if (search) {
    const q = search.toLowerCase();
    list = list.filter(e => 
      e.id.toLowerCase().includes(q) ||
      e.firstName.toLowerCase().includes(q) ||
      e.lastName.toLowerCase().includes(q) ||
      e.position.toLowerCase().includes(q) ||
      e.email.toLowerCase().includes(q)
    );
  }
  if (department && department !== 'All') {
    list = list.filter(e => e.department === department);
  }
  if (status && status !== 'All') {
    list = list.filter(e => e.status === status);
  }
  if (role && role !== 'All') {
    list = list.filter(e => e.role === role);
  }

  res.json(list);
});

app.get('/api/employees/:id', (req, res) => {
  const db = readDB();
  const emp = db.employees.find(e => e.id === req.params.id);
  if (!emp) return res.status(404).json({ error: 'Employee not found' });
  res.json(emp);
});

app.post('/api/employees', (req, res) => {
  const db = readDB();
  const body = req.body;
  
  const newNum = 1000 + db.employees.length + 1;
  const newId = body.id || `EHR-${newNum}`;

  const newEmp = {
    id: newId,
    firstName: body.firstName || '',
    lastName: body.lastName || '',
    email: body.email || '',
    phone: body.phone || '',
    gender: body.gender || 'Other',
    dateOfBirth: body.dateOfBirth || '',
    position: body.position || '',
    department: body.department || 'General',
    role: body.role || 'employee',
    status: body.status || 'Active',
    contractType: body.contractType || 'Full-time',
    contractStartDate: body.contractStartDate || new Date().toISOString().split('T')[0],
    contractEndDate: body.contractEndDate || '2027-12-31',
    baseSalary: Number(body.baseSalary) || 1000,
    currency: body.currency || 'USD',
    password: body.password || 'password123',
    nssfNumber: body.nssfNumber || `NSSF-${Math.floor(10000000 + Math.random() * 90000000)}`,

    nationalId: body.nationalId || `${Math.floor(100000000 + Math.random() * 900000000)}`,
    address: body.address || 'Phnom Penh, Cambodia',
    bankName: body.bankName || 'ABA Bank',
    bankAccountNumber: body.bankAccountNumber || '00' + Math.floor(1000000 + Math.random() * 9000000),
    emergencyContact: body.emergencyContact || {
      name: 'Primary Contact',
      relationship: 'Family',
      phone: '+855 12 000 000'
    },
    leaveBalance: {
      annual: { total: 18, used: 0, remaining: 18 },
      sick: { total: 10, used: 0, remaining: 10 },
      casual: { total: 5, used: 0, remaining: 5 },
      maternity: { total: body.gender === 'Female' ? 90 : 0, used: 0, remaining: body.gender === 'Female' ? 90 : 0 },
      unpaid: { total: 0, used: 0, remaining: 0 }
    }
  };

  db.employees.unshift(newEmp);
  writeDB(db);
  res.status(201).json(newEmp);
});

app.put('/api/employees/:id', (req, res) => {
  const db = readDB();
  const index = db.employees.findIndex(e => e.id === req.params.id);
  if (index === -1) return res.status(404).json({ error: 'Employee not found' });

  db.employees[index] = { ...db.employees[index], ...req.body, id: req.params.id };
  writeDB(db);
  res.json(db.employees[index]);
});

app.delete('/api/employees/:id', (req, res) => {
  const db = readDB();
  const index = db.employees.findIndex(e => e.id === req.params.id);
  if (index === -1) return res.status(404).json({ error: 'Employee not found' });

  const isPermanent = req.query.permanent === 'true';

  if (isPermanent) {
    const deletedEmp = db.employees.splice(index, 1)[0];
    // Also remove their future pending leaves
    db.leaves = db.leaves.filter(l => l.employeeId !== req.params.id || l.status !== 'Pending');
    writeDB(db);
    return res.json({ message: 'Employee permanently deleted from database', employee: deletedEmp });
  }

  // Soft delete / archive
  db.employees[index].status = 'Archived';
  writeDB(db);
  res.json({ message: 'Employee archived successfully', employee: db.employees[index] });
});


// --- LEAVE MANAGEMENT ---
app.get('/api/leaves', (req, res) => {
  const db = readDB();
  let list = db.leaves;
  const { employeeId, status } = req.query;

  if (employeeId) {
    list = list.filter(l => l.employeeId === employeeId);
  }
  if (status && status !== 'All') {
    list = list.filter(l => l.status === status);
  }
  res.json(list);
});

app.post('/api/leaves', (req, res) => {
  const db = readDB();
  const body = req.body;

  const emp = db.employees.find(e => e.id === body.employeeId);
  if (!emp) return res.status(400).json({ error: 'Employee not found' });

  // Determine key for leave balance (annual, sick, casual, maternity, unpaid)
  let balanceKey = 'annual';
  const lt = (body.leaveType || '').toLowerCase();
  if (lt.includes('sick')) balanceKey = 'sick';
  else if (lt.includes('casual')) balanceKey = 'casual';
  else if (lt.includes('maternity')) balanceKey = 'maternity';
  else if (lt.includes('unpaid')) balanceKey = 'unpaid';

  const daysRequested = Number(body.totalDays) || 1;
  const balance = emp.leaveBalance?.[balanceKey] || { remaining: 10 };

  if (balanceKey !== 'unpaid' && balance.remaining < daysRequested) {
    return res.status(400).json({ 
      error: `Insufficient ${body.leaveType} balance. You have ${balance.remaining} days remaining, but requested ${daysRequested} days.` 
    });
  }

  const newLeave = {
    id: `LV-2026-${String(db.leaves.length + 1).padStart(3, '0')}`,
    employeeId: emp.id,
    employeeName: `${emp.firstName} ${emp.lastName}`,
    department: emp.department,
    leaveType: body.leaveType || 'Annual Leave',
    startDate: body.startDate,
    endDate: body.endDate,
    totalDays: daysRequested,
    reason: body.reason || 'Personal matters',
    status: 'Pending',
    appliedDate: new Date().toISOString().split('T')[0],
    approverName: null,
    approverRemarks: null,
    actionDate: null
  };

  db.leaves.unshift(newLeave);
  writeDB(db);
  res.status(201).json(newLeave);
});

app.put('/api/leaves/:id/status', (req, res) => {
  const db = readDB();
  const { status, approverName, approverRemarks } = req.body;

  const leaveIndex = db.leaves.findIndex(l => l.id === req.params.id);
  if (leaveIndex === -1) return res.status(404).json({ error: 'Leave request not found' });

  const leave = db.leaves[leaveIndex];
  const oldStatus = leave.status;
  leave.status = status;
  leave.approverName = approverName || 'HR Administrator';
  leave.approverRemarks = approverRemarks || '';
  leave.actionDate = new Date().toISOString().split('T')[0];

  // Update employee leave balance if approved
  if (status === 'Approved' && oldStatus !== 'Approved') {
    const emp = db.employees.find(e => e.id === leave.employeeId);
    if (emp && emp.leaveBalance) {
      let balanceKey = 'annual';
      const lt = (leave.leaveType || '').toLowerCase();
      if (lt.includes('sick')) balanceKey = 'sick';
      else if (lt.includes('casual')) balanceKey = 'casual';
      else if (lt.includes('maternity')) balanceKey = 'maternity';
      else if (lt.includes('unpaid')) balanceKey = 'unpaid';

      if (emp.leaveBalance[balanceKey]) {
        emp.leaveBalance[balanceKey].used += leave.totalDays;
        emp.leaveBalance[balanceKey].remaining = Math.max(0, emp.leaveBalance[balanceKey].total - emp.leaveBalance[balanceKey].used);
      }
    }
  }

  writeDB(db);
  res.json(leave);
});

// --- PAYROLL ENGINE ---
// Cambodian / General progressive salary tax calculation helper
function calculateTax(salary) {
  // Monthly salary brackets in USD:
  // 0 - 375: 0%
  // 375 - 500: 5%
  // 500 - 2125: 10%
  // 2125 - 3125: 15%
  // > 3125: 20%
  if (salary <= 375) return { rate: 0, amount: 0 };
  if (salary <= 500) return { rate: 5, amount: Number(((salary - 375) * 0.05).toFixed(2)) };
  if (salary <= 2125) return { rate: 10, amount: Number((6.25 + (salary - 500) * 0.10).toFixed(2)) };
  if (salary <= 3125) return { rate: 15, amount: Number((168.75 + (salary - 2125) * 0.15).toFixed(2)) };
  return { rate: 20, amount: Number((318.75 + (salary - 3125) * 0.20).toFixed(2)) };
}

// NSSF contribution (4% of base salary capped at max $30/month for health + pension/occupational)
function calculateNSSF(baseSalary) {
  const capSalary = Math.min(baseSalary, 3000);
  return Number((capSalary * 0.04).toFixed(2));
}

app.get('/api/payroll', (req, res) => {
  const db = readDB();
  res.json(db.payrollRuns);
});

app.post('/api/payroll/calculate', (req, res) => {
  const db = readDB();
  const { month } = req.body; // e.g. "2026-08"
  const activeEmployees = db.employees.filter(e => e.status === 'Active' || e.status === 'Probation');

  const items = activeEmployees.map(emp => {
    const base = emp.baseSalary || 1000;
    const allowances = base > 2000 ? 200 : base > 1200 ? 100 : 50;
    const overtimeHours = 0;
    const hourlyRate = base / 160;
    const overtimePay = Number((overtimeHours * hourlyRate * 1.5).toFixed(2));
    const bonus = 0;
    const grossSalary = Number((base + allowances + overtimePay + bonus).toFixed(2));
    
    const taxInfo = calculateTax(grossSalary);
    const nssf = calculateNSSF(base);
    const deductions = 0;
    const netPay = Number((grossSalary - taxInfo.amount - nssf - deductions).toFixed(2));

    return {
      employeeId: emp.id,
      employeeName: `${emp.firstName} ${emp.lastName}`,
      position: emp.position,
      department: emp.department,
      baseSalary: base,
      allowances,
      overtimeHours,
      overtimePay,
      bonus,
      grossSalary,
      taxRate: taxInfo.rate,
      taxAmount: taxInfo.amount,
      nssfContribution: nssf,
      deductions,
      netPay,
      paymentStatus: 'Pending',
      bankAccount: `${emp.bankAccountNumber} (${emp.bankName})`
    };
  });

  const totalGross = Number(items.reduce((s, i) => s + i.grossSalary, 0).toFixed(2));
  const totalNet = Number(items.reduce((s, i) => s + i.netPay, 0).toFixed(2));
  const totalTax = Number(items.reduce((s, i) => s + i.taxAmount, 0).toFixed(2));
  const totalNssf = Number(items.reduce((s, i) => s + i.nssfContribution, 0).toFixed(2));

  const draftRun = {
    id: `PR-${month}`,
    month,
    monthLabel: new Date(month + "-01").toLocaleString('en-US', { month: 'long', year: 'numeric' }),
    status: 'Draft',
    totalGross,
    totalNet,
    totalTax,
    totalNssf,
    processedBy: 'Sophea Chan',
    processedDate: new Date().toISOString().split('T')[0],
    items
  };

  res.json(draftRun);
});

app.post('/api/payroll/finalize', (req, res) => {
  const db = readDB();
  const runData = req.body;

  const existingIdx = db.payrollRuns.findIndex(p => p.id === runData.id || p.month === runData.month);
  runData.status = 'Finalized';
  runData.processedDate = new Date().toISOString().split('T')[0];

  // mark all items as Paid
  runData.items = runData.items.map(item => ({ ...item, paymentStatus: 'Paid' }));

  if (existingIdx >= 0) {
    db.payrollRuns[existingIdx] = runData;
  } else {
    db.payrollRuns.unshift(runData);
  }

  writeDB(db);
  res.json(runData);
});

// --- ATTENDANCE ---
app.get('/api/attendance', (req, res) => {
  const db = readDB();
  let list = db.attendance;
  const { employeeId, date } = req.query;

  if (employeeId) {
    list = list.filter(a => a.employeeId === employeeId);
  }
  if (date) {
    list = list.filter(a => a.date === date);
  }
  res.json(list);
});

app.post('/api/attendance/clock', (req, res) => {
  const db = readDB();
  const { employeeId, action, workType } = req.body; // action: 'clock-in' or 'clock-out'

  const emp = db.employees.find(e => e.id === employeeId);
  if (!emp) return res.status(404).json({ error: 'Employee not found' });

  const todayStr = "2026-08-24";
  const now = new Date();
  const timeStr = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')}`;

  let record = db.attendance.find(a => a.employeeId === employeeId && a.date === todayStr);

  if (action === 'clock-in') {
    if (!record) {
      record = {
        id: `ATT-2026-0824-${String(db.attendance.length + 1).padStart(3, '0')}`,
        employeeId: emp.id,
        employeeName: `${emp.firstName} ${emp.lastName}`,
        department: emp.department,
        date: todayStr,
        clockIn: timeStr,
        clockOut: null,
        scheduledIn: "08:00:00",
        scheduledOut: "17:00:00",
        loggedHours: 0,
        status: timeStr > "08:15:00" ? "Late" : "Present",
        workType: workType || "Office"
      };
      db.attendance.unshift(record);
    } else {
      record.clockIn = timeStr;
    }
  } else if (action === 'clock-out') {
    if (!record) {
      return res.status(400).json({ error: 'Cannot clock out without clocking in first.' });
    }
    record.clockOut = timeStr;
    record.loggedHours = 8.0;
  }

  writeDB(db);
  res.json(record);
});

// --- DOCUMENTS ---
app.get('/api/documents', (req, res) => {
  const db = readDB();
  const { employeeId } = req.query;
  let list = db.documents;
  if (employeeId) {
    list = list.filter(d => d.employeeId === employeeId);
  }
  res.json(list);
});

app.post('/api/documents', (req, res) => {
  const db = readDB();
  const body = req.body;

  const emp = db.employees.find(e => e.id === body.employeeId);
  if (!emp) return res.status(404).json({ error: 'Employee not found' });

  const newDoc = {
    id: `DOC-${1000 + db.documents.length + 1}`,
    employeeId: emp.id,
    employeeName: `${emp.firstName} ${emp.lastName}`,
    docType: body.docType || 'Other Document',
    fileName: body.fileName || 'document.pdf',
    fileSize: body.fileSize || '1.5 MB',
    uploadedAt: new Date().toISOString().split('T')[0],
    status: 'Pending Verification',
    verifiedBy: null,
    category: body.category || 'General'
  };

  db.documents.unshift(newDoc);
  writeDB(db);
  res.status(201).json(newDoc);
});

app.put('/api/documents/:id/verify', (req, res) => {
  const db = readDB();
  const doc = db.documents.find(d => d.id === req.params.id);
  if (!doc) return res.status(404).json({ error: 'Document not found' });

  doc.status = req.body.status || 'Verified';
  doc.verifiedBy = req.body.verifiedBy || 'Sophea Chan (HR Manager)';
  writeDB(db);
  res.json(doc);
});

// Authentication login endpoint
app.post('/api/auth/login', (req, res) => {
  const db = readDB();
  const { email, password } = req.body;

  if (!email) {
    return res.status(400).json({ error: 'Email is required' });
  }

  const user = db.employees.find(e => 
    e.email.toLowerCase() === email.trim().toLowerCase()
  );

  if (!user) {
    return res.status(401).json({ error: 'No account found with this email address' });
  }

  if (user.status === 'Archived') {
    return res.status(403).json({ error: 'This account has been deactivated/archived' });
  }

  // If password provided, verify (or allow demo default password123)
  if (password && user.password && user.password !== password && password !== 'password123') {
    return res.status(401).json({ error: 'Invalid password. Please check your credentials.' });
  }

  res.json({
    user,
    token: `ehr_token_${user.id}_${Date.now()}`
  });
});

// Reset demo database endpoint

app.post('/api/reset-data', (req, res) => {
  const initial = getInitialData();
  writeDB(initial);
  res.json({ message: 'Database reset to initial demo state successfully.' });
});

// Serve static client build in production
const clientDistPath = path.join(__dirname, '..', 'client', 'dist');
if (fs.existsSync(clientDistPath)) {
  app.use(express.static(clientDistPath));
  app.get('*', (req, res) => {
    if (!req.path.startsWith('/api')) {
      res.sendFile(path.join(clientDistPath, 'index.html'));
    }
  });
}

app.listen(PORT, () => {
  console.log(`ElevateHR Backend API running on port ${PORT}`);
});

