const fs = require('fs');
const path = require('path');
const { Document, Packer, Paragraph, TextRun, HeadingLevel, AlignmentType, BorderStyle } = require('docx');

function createEnglishDoc(title, subtitle, filename, sections) {
  const children = [];

  // Document Title
  children.push(
    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { before: 200, after: 120 },
      children: [
        new TextRun({
          text: title,
          bold: true,
          size: 32, // 16pt
          font: 'Calibri'
        })
      ]
    })
  );

  // Subtitle & Meeting Details
  children.push(
    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { after: 300 },
      children: [
        new TextRun({
          text: subtitle,
          italics: true,
          size: 22, // 11pt
          color: '555555',
          font: 'Calibri'
        })
      ]
    })
  );

  // Divider Line
  children.push(
    new Paragraph({
      spacing: { after: 300 },
      border: {
        bottom: {
          color: 'CCCCCC',
          space: 1,
          style: BorderStyle.SINGLE,
          size: 6
        }
      }
    })
  );

  // Content Sections
  for (const sec of sections) {
    if (sec.heading) {
      children.push(
        new Paragraph({
          heading: HeadingLevel.HEADING_2,
          spacing: { before: 320, after: 160 },
          children: [
            new TextRun({
              text: sec.heading,
              bold: true,
              size: 26, // 13pt
              color: '1E3A8A',
              font: 'Calibri'
            })
          ]
        })
      );
    }

    for (const item of sec.items) {
      if (item.speaker) {
        children.push(
          new Paragraph({
            spacing: { before: 160, after: 60 },
            children: [
              new TextRun({
                text: item.speaker + ':',
                bold: true,
                size: 22,
                color: '0F172A',
                font: 'Calibri'
              })
            ]
          })
        );
      }

      if (item.text) {
        children.push(
          new Paragraph({
            spacing: { before: 40, after: 140 },
            children: [
              new TextRun({
                text: item.text,
                size: 22,
                font: 'Calibri'
              })
            ]
          })
        );
      }
    }
  }

  const doc = new Document({
    sections: [
      {
        properties: {
          page: {
            margin: {
              top: 1440,
              right: 1440,
              bottom: 1440,
              left: 1440
            }
          }
        },
        children
      }
    ]
  });

  return Packer.toBuffer(doc).then(buffer => {
    fs.writeFileSync(filename, buffer);
    console.log('Successfully written:', filename);
  });
}

// ------------------------------------------------------------------
// FILE 1: Day 2.1 - EC presentation (English Translation)
// ------------------------------------------------------------------
const sectionsDay2_1_EN = [
  {
    heading: 'Session 1: Presentation on Conflict of Interest and the Role of the Ethics Committee',
    items: [
      {
        speaker: 'Her Excellency (Ethics Committee Speaker)',
        text: '...contracts or the selection of members... using one\'s official position to advance personal interests or the interests of an affiliated institution, in a manner that disadvantages or excludes others. The question we must ask ourselves is: would an outside observer perceive bias or conclude that you or your affiliated entity received an inappropriate advantage compared to other applicants who applied and were fully qualified?'
      },
      {
        speaker: 'Her Excellency (Continued)',
        text: 'Regarding the Ethics Committee and managing conflicts of interest, the Ethics Committee plays a central role in cultivating an open organizational culture and preventing discrimination. This is our defined institutional mandate. In accordance with Global Fund requirements, there must be an ethical oversight mechanism at the country level possessing legitimate authority, coordination capacity, and transparency. In this regard, the role of the Ethics Committee is not punitive; rather, it is to lead in mitigating risk and ensuring all members maintain ethical awareness. Therefore, we must focus on proactive prevention before issues emerge, managing conflicts of interest effectively and constructively. Most importantly, we must ensure that all CCC members receive clear guidance and understand their obligations under the Conflict of Interest Policy. Whenever members have doubts or are uncertain whether a particular situation constitutes a conflict of interest, they can seek guidance or request consultations directly from the Ethics team. Next slide, please.'
      },
      {
        speaker: 'Her Excellency (Continued)',
        text: 'Regarding the stages of declaration, we have three formal phases: First, the initial declaration prior to appointment. Second, the annual compliance declaration. Third, situational declarations made during meetings as specific cases arise. For the initial declaration, members and alternate members must complete and sign the Conflict of Interest form before officially assuming their seats. For the annual compliance declaration, every member must update their personal profile and activities, submitting them to the team each year by January 30th for formal review. For situational meeting declarations, whenever a new conflict of interest arises or an existing circumstance changes, the member must disclose it immediately and verbally at the start of the meeting before the relevant agenda item is taken up. If there is any lingering doubt regarding a matter, please declare it in advance. Transparent disclosure is the single best way to protect oneself from inadvertent policy violations. Next slide, please.'
      },
      {
        speaker: 'Her Excellency (Continued)',
        text: 'The 4D Principle represents the core procedural steps for addressing conflicts of interest: First, Declare—members must disclose immediately upon recognizing a potential conflict to guarantee complete transparency. Second, Discuss—deliberating upon the specific circumstances and practical management, starting from leadership up to full committee discussion. Third, Deal—implementing appropriate mitigation measures to manage and neutralize the conflict. Fourth, Document—recording every step of the deliberation, mitigation decision, and follow-up actions clearly in official minutes.'
      },
      {
        speaker: 'Her Excellency (Continued)',
        text: 'Next slide. Regarding the specific options for mitigating a conflict of interest, five options are available: First, Restrict—limiting the individual\'s involvement by recusing them from specific discussions or budget negotiations. Second, Appoint a Third Party—designating a neutral third party without any conflict of interest to handle the task. Third, Remove—completely removing the individual from the relevant agenda item or committee process. Fourth, Relinquish—stepping down from the external role or affiliation that creates the conflict. Fifth, Resign—formally resigning from the CCC membership if the conflict cannot otherwise be resolved. Next slide. In navigating complex situations, ethical decision-making requires evaluating comparative impact, institutional integrity, legal compliance, and long-term ramifications. Next slide.'
      },
      {
        speaker: 'Her Excellency (Continued)',
        text: 'Regarding the consequences of non-compliance, undeclared conflicts can compromise project implementation and jeopardize overall grant assistance. In cases where an active conflict was not disclosed, procurement decisions, sub-recipient selections, or hiring decisions may be nullified and required to be re-run from scratch. Severe infractions may be referred to the CCC Chair and Vice-Chair for formal disciplinary action. Our goal is never to penalize, but to ensure awareness in advance so everyone avoids institutional risks. Case Study 1: A CCC member serves as a senior officer in a non-governmental organization that is currently applying to become a Sub-Recipient (SR). What should the member do? Under established guidelines, the member must declare their interest immediately, recuse themselves entirely from all discussions concerning that SR selection, and leave the meeting room during the deliberation and voting process. Case Study 2: A member suspects that another representative has a direct, undisclosed conflict of interest regarding an upcoming procurement contract. In this scenario, the matter may be raised directly with the Ethics Committee or brought to the CCC Chair during the meeting.'
      },
      {
        speaker: 'Her Excellency (Concluding Remarks)',
        text: 'In summary, the four key takeaways to remember are: know the policy, declare early and often, recuse oneself when necessary, and seek guidance from the Ethics Committee. I would like to express my deepest gratitude to His Excellency Pen Thirong, Secretary of State of the Ministry of Economy and Finance and Chair of the Global Fund Country Coordinating Mechanism, Excellencies, distinguished guests, and all colleagues. Thank you very much.'
      }
    ]
  },
  {
    heading: 'Intervention by UNAIDS Representative: Comparative Conflict of Interest Scenarios',
    items: [
      {
        speaker: 'Facilitator (English)',
        text: 'Thank you Excellency Sopheaphea for the presentation and the very clear explanation about conflict of interest and the ways to mitigate. So now I would like to open the floor for any questions you may have or any reactions to what you have heard from Excellency. I am leaning on the CCC Secretariat to kindly let me know when hands are up, because I am currently looking at a wall and the webcam is looking at the wall, so I cannot see any hands. Dr. Bunthi, can you kindly advise if there are any hands up in the room?'
      },
      {
        speaker: 'Dr. Bunthi',
        text: 'No, not yet.'
      },
      {
        speaker: 'Facilitator (English)',
        text: 'As you\'re thinking, I\'ll give you an example. Thank you Excellency for giving us those good two case studies at the end of the presentation. I\'ll give everyone another example, a real-life one from UNAIDS. In UNAIDS in Cambodia, we do not receive any money. We are not expected to receive any money from GC7 or GC8, and therefore we do not need to declare conflict of interest in Cambodia. However, in Laos, Laos GC8 and GC7 provides funding to UNAIDS to provide technical assistance on HIV prevention. This has allowed us to hire a staff member in Laos. So in Laos, UNAIDS needs to declare conflict of interest, because we receive money from GC7 and will receive money in GC8. In Vietnam, we do not receive money for GC7, but we are expected to receive money from GC8 UNAIDS. And because of this perceived conflict of interest of potential receiving, we also need to declare conflict of interest. So these three scenarios: no conflict of interest for UNAIDS in Cambodia; actual conflict of interest in Laos because we\'re receiving the money; and perceived future conflict of interest in Vietnam because we are expected to receive money. That is an example of how conflict of interest is implemented in practice. That means in Cambodia, UNAIDS can fully participate. In Laos, we can provide technical guidance, but we cannot vote on CCM matters. In Vietnam, because we declare conflict of interest, we provide technical guidance as a technical partner, but we do not engage and vote in technical matters. So that\'s an example. Are there any reflections from the floor? Thank you for shifting the camera so I can now see. All right, I don\'t see any hands. Let me turn to the Ethics Committee Chair... Excellency, the floor is yours for final words.'
      },
      {
        speaker: 'Excellency (Ethics Committee Chair)',
        text: 'Thank you Patricia for the question. For me, no... no, no.'
      },
      {
        speaker: 'Facilitator (English)',
        text: 'Okay, thank you Excellency. We are a little early in schedule, congratulations! I hand the floor back to the Secretariat to guide us to the next facilitator.'
      }
    ]
  },
  {
    heading: 'Session 2: Strengthening Oversight and Accountability in CCM Operations',
    items: [
      {
        speaker: 'Moderator (Secretariat)',
        text: 'We now move to Session 2, focusing on Accountability. The Oversight Committee is chaired by Dr. Sok Chamreun. I respectfully invite the Doctor to take the floor.'
      },
      {
        speaker: 'Dr. Sok Chamreun (Chair, Oversight Committee)',
        text: 'Thank you, Excellency Chair. Respectful greetings to Excellencies, distinguished delegates, ladies and gentlemen. For this session, I would like to represent the Oversight working team, and express sincere thanks to Dr. Bunthi and Mrs. Kolroth for preparing the presentation on Driving Accountability as it relates to the work of Oversight. There are five key learning outcomes for this session: First, understanding the difference between Oversight and Principal Recipient (PR) Monitoring & Evaluation (M&E). Second, the three major domains of Oversight. Third, the five strategic questions applicable across all Global Fund grants. Fourth, governance boundaries between the CCM, Oversight Committee, and Secretariat. Fifth, Global Fund mandatory oversight standards.'
      },
      {
        speaker: 'Dr. Sok Chamreun (Continued)',
        text: 'The core focus of Oversight is ensuring that Principal Recipients (PRs) achieve the primary objectives and key targets of the grant. Oversight does not micro-manage daily operational details, as day-to-day program execution is the operational responsibility of the PR. Rather, Oversight looks from above at the big picture (Macro level), identifying structural bottlenecks, pinpointing why disbursements may be lagging, and assessing risks. Four pillars are essential for successful oversight: First, a Collaborative Relationship built on mutual trust with the PR. Second, Technical Expertise, ensuring the oversight committee possesses appropriate professional capacity. Third, Time Investment, meaning members must commit sufficient time for regular meetings and field verification visits. Fourth, a Proactive Culture, engaging early to resolve operational bottlenecks before they escalate.'
      },
      {
        speaker: 'Dr. Sok Chamreun (Continued)',
        text: 'Our three core domains and five strategic questions encompass: Financial Stewardship, tracking expenditure rates, ensuring spending matches planned targets, and verifying compliance. Program Quality, evaluating operational quality, timeliness, and clinical standards. Strategic Performance, assessing long-term impact on the disease epidemics. The five strategic questions are: 1) Financial tracking and cash disbursement flow. 2) Procurement and supply chain integrity for medicines and diagnostics. 3) Timely disbursement and technical support to Sub-recipients. 4) Implementation progress against work plan timelines. 5) Actual performance against targets and core indicators.'
      },
      {
        speaker: 'Dr. (English Participant)',
        text: 'Chumreap Sour, Your Excellency, ladies and gentlemen. I have seen about 10 country CCM and oversight committees for the last four decades. I speak not to criticize, but I want to improve. So my comments may please be taken in a constructive manner. So oversight committee, mien or ot mien? That\'s my question first. Constructive is that we must provide technical discussions, thrashing out the problem, including data, data modeling, including the problem we discussed yesterday about the community, how you reach the community, including the pathway to elimination for malaria. There must be regular meetings. Those technical discussions must lead to a couple of points for the CCM, which is the decision-making body. The level of technical discussions need to be more detailed at the oversight committee, without any bias. I have been here 8 months, attended 2 oversight committee meetings, but 4 CCM meetings. So there seems to be a disbalance. Advocacy and decision-making is CCM\'s role, but the technical pillar for operationalizing the Global Fund is the oversight.'
      },
      {
        speaker: 'Dr. Sok Chamreun (Response in English/Khmer)',
        text: 'Within our Oversight Committee, we maintain a diverse composition: delegates representing the CCM, non-CCM independent technical experts, and community representatives directly affected by the diseases. Among them, we have youth key population delegates such as Somnang Lakhey, representatives of people living with HIV, and TB networks. Oversight does not enforce a rigid cap; anyone with genuine technical expertise can be invited to contribute. However, we must emphasize that Oversight operates at the macro governance level, not as a replacement for PR micro-management. Whenever technical difficulties arise—such as transitioning grant operations from one organization to another—Oversight convenes relevant partners and national programs to review transition plans and handovers. If issues involve specific target groups, such as young MSM or transgender populations, we examine whether program designs genuinely reach target groups so funding is not misdirected.'
      },
      {
        speaker: 'Somnang Lakhey (Young Key Population Representative)',
        text: 'Regarding Oversight, I have an important question. Currently, some members serve simultaneously on the CCC and on the Oversight Committee. Could this create a conflict of interest? Furthermore, during provincial field visits, both the focal person and alternate often participate together despite our limited budget. I also formally request dedicated representation for Young Key Populations and Young MSM on both the CCM and Oversight Committee for the upcoming mandate.'
      },
      {
        speaker: 'Dr. Bunthi (Secretariat)',
        text: 'Serving on both the CCC and the Oversight Committee does not constitute a conflict of interest under our governance rules, unless that individual is directly affiliated with an implementing Principal Recipient (PR) or Sub-Recipient (SR). Under the Governance Manual, the Oversight Committee is limited to a maximum of 16 members to ensure proper checks and balances without any single constituency holding disproportionate power. Any formal amendment to the Governance Manual or addition of specific representative seats requires a two-thirds majority vote by the full CCM.'
      },
      {
        speaker: 'Vanthea (CCC Alternate Member)',
        text: 'I want to raise a consideration regarding upcoming elections. Many senior community workers have dedicated 20 years to this response. While it is important to encourage young voices, we must not discard the veteran leaders who built this foundation. In establishing new seats, please preserve the wisdom of experienced contributors.'
      },
      {
        speaker: 'H.E. Tea Phalla (Vice-Chair, National AIDS Authority)',
        text: 'On accountability, Cambodia is currently undergoing a strategic transition toward national budget financing—moving from external dependency to domestic sustainability. Our historic grant structure has been PR to SR to SSR. At the sub-national level, governance between Provincial Health Departments and civil society organizations must function seamlessly. Domestic funding for the national HIV response has expanded from 31% in 2022 to 45% in 2025, with a target of reaching 50% by 2028. The core strategic question is whether accountability should be decentralized to sub-national authorities, empowering Provincial Health Departments to lead data reviews and address funding gaps. In addition, our Primary Health Care Booster Package (PHC-BIF) must integrate services across HIV, TB, and malaria to safeguard long-term sustainability.'
      },
      {
        speaker: 'Dr. Sok Chamreun',
        text: 'Technical execution remains the mandate of the Ministry of Health and national disease programs. The role of Oversight is ensuring that Global Fund investments in Cambodia yield measurable, lasting impact. Cambodia has achieved historic milestones, including the 95-95-95 HIV epidemic control targets and nationwide malaria elimination. However, our immediate concern is grant savings—approximately $3 million remains unspent for 2026, and if these funds are not absorbed, the Global Fund will de-commit them. Oversight must closely monitor procurement schedules and operational timelines to prevent funding loss.'
      },
      {
        speaker: 'Dr. Sokrey (Ministry of Health Lead)',
        text: 'Regarding the approximately $3.9 million in grant savings, we submitted formal reprogramming requests to the Global Fund. We have secured formal approval for $2.65 million and conditional approval for an additional $1 million+. We are actively working with the Global Fund to fulfill these conditions so the remaining funds can be fully utilized in the final semester.'
      },
      {
        speaker: 'Dr. Sok Chamreun',
        text: 'It is important to note that these unspent balances were not entirely Cambodia\'s fault; a significant portion resulted from communication delays by the Global Fund itself, which temporarily froze activities for two to three months while reviewing grant adjustments.'
      }
    ]
  },
  {
    heading: 'Session 3: Community Voices and Grassroots Field Realities (Pursat & Koh Kong)',
    items: [
      {
        speaker: 'Rasy (Community Representative, Chaktomuk Network)',
        text: 'Respectful greetings to Excellency Chair, Excellencies, ladies and gentlemen. I am pleased to present on behalf of the three disease communities covering October 2025 to September 2026. Key achievements: enhanced capacity of community representatives, constructive collaboration with CCC leadership, and meaningful community integration in Grant Cycle 8. Regarding operational challenges: First, language barriers—most technical guidelines and working papers are in English, which community representatives struggle to comprehend. We request timely Khmer translations well in advance of meetings. Second, understanding of U=U (Undetectable = Untransmittable)—many PLHIV still do not understand that viral suppression prevents transmission, highlighting the need for wider public campaigns. Third, Village Health Support Groups (VHSGs)—village volunteers working on TB and HIV lack training, receive minimal financial incentives, and experience high turnover.'
      },
      {
        speaker: 'Rasy (Continued)',
        text: 'Field findings from Koh Kong Province (August 2026): We interviewed 22 key population members (9 MSM, 13 TG). Only 8 had received formal HIV education, 2 had experienced condom breakage, none had access to Post-Exposure Prophylaxis (PEP), 3 were engaging in ChemSex, and 12 reported mental health issues. Community-Led Monitoring (CLM) data across 572 respondents in Koh Kong revealed that 91% had never received HIV education and 68% had never heard of Pre-Exposure Prophylaxis (PrEP). ChemSex involves combining substance use with sexual activity, significantly heightening transmission risks. Key community recommendations: First, NCHADS and partners must expand PrEP and PEP services to provincial referral hospitals in Koh Kong and Ratanakiri. Second, specialized treatment for severe anal HPV warts (condyloma) is non-existent at referral hospitals in Koh Kong and Ratanakiri; patients must travel to Phnom Penh at prohibitive expense. Third, equity cards—many PLHIV collected data 5 to 6 months ago but have still not received their IDPoor or Health Equity cards.'
      },
      {
        speaker: 'TB Community Representative (Female)',
        text: 'I would like to emphasize that TB investments must not focus solely on VHSGs, but must encompass the entire grassroots TB community network, including TB People Cambodia volunteers who work directly with affected households.'
      },
      {
        speaker: 'H.E. Tea Phalla',
        text: 'On PrEP and PEP, the Ministry of Health has established national clinical guidelines. Regarding provincial hospitals, we operate 38 Family Clinics providing comprehensive STI screening and care, and expansion is ongoing. Regarding clinical fees, if public facilities are charging fees beyond authorized schedules, we will examine those specific cases.'
      },
      {
        speaker: 'Mr. Polin (UNAIDS)',
        text: 'I want to clarify the distinction between Ministry of Planning IDPoor equity cards and Ministry of Social Affairs (MoSS) Health Equity cards. The Ministry of Planning is solely responsible for household-based IDPoor poverty assessments. MoSS / NSSF cards for vulnerable individuals are issued through local authorities and health departments. When advocating, communities must engage the correct responsible agency.'
      },
      {
        speaker: 'Mrs. Sophon (Commune Committee for Women and Children - CCWC, Pursat)',
        text: 'In our commune, after attending training in Battambang, we realized that commune development funds can be allocated for health. We surveyed all 10 villages and identified 18 PLHIV across 12 families. We allocated 10 million Riel from our commune investment budget to provide travel stipends for patients to collect their medication, supplied food packages (rice, noodles, canned fish), and conducted community awareness sessions. Our VHSG volunteers and CCWC collaborate closely with the health center. When visiting patients, we maintain absolute confidentiality. Patients willingly share their health status because they see that we help them obtain equity cards and ensure continuous treatment. For migrant children arriving from other areas, we record their names, enroll them in local schools, and bring them to health centers for vaccinations so none are left behind. Our annual commune budget of 88 million Riel must cover many competing needs, but we plan to request increased funding for health in the coming year.'
      },
      {
        speaker: 'Dr. (English Participant)',
        text: 'In the border provinces like Battambang, Banteay Meanchey, people are moving and we have children who are not vaccinated. But the local chiefs know exactly where the children are, what time they go to the field, and when they come back. It shows that community engagement can achieve everything. Thank you for sharing.'
      },
      {
        speaker: 'Moderator',
        text: 'Thank you to the community delegates, Pursat provincial representatives, and all participants. As the time is now 12:30 PM, we conclude this morning\'s session and invite everyone to lunch together. We will reconvene promptly at 1:30 PM. Thank you.'
      }
    ]
  }
];

// ------------------------------------------------------------------
// FILE 2: Day 2.2 - renewal presentation (English Translation)
// ------------------------------------------------------------------
const sectionsDay2_2_EN = [
  {
    heading: 'Session 4: Membership Renewal and Succession Planning for the 2027-2029 Mandate',
    items: [
      {
        speaker: 'Master of Ceremonies',
        text: 'Good afternoon, delegates and community partners. Please take your seats so we may resume our proceedings and ensure we conclude on schedule. I invite Dr. Bunthi to present.'
      },
      {
        speaker: 'Dr. Bunthi (CCC Secretariat)',
        text: 'Thank you. Respectful greetings to the Venerable Monks, Excellencies, ladies and gentlemen. In this session, I will present on membership succession planning and renewal for the 2027–2029 mandate. The objective is to clarify the renewal milestones, key considerations, and the mandate of the Membership Selection Committee (MSC).'
      },
      {
        speaker: 'Dr. Bunthi (Continued)',
        text: 'Under our governance framework, CCC members serve a 3-year term and may serve a maximum of two consecutive terms (six years total), after which they are ineligible for immediate re-election. The current mandate (2024–2026) expires on December 31, 2026. Therefore, we must initiate succession planning well in advance to guarantee smooth transition and ensure continuity of governance.'
      },
      {
        speaker: 'Dr. Bunthi (Continued)',
        text: 'The renewal process follows six distinct steps: First, establishing the Membership Selection Committee (MSC). Second, the MSC designates Constituency Coordinators across sectors. Third, issuing an open, public Call for Expression of Interest. Fourth, constituency-based democratic elections and selection processes (for civil society, communities, and private sector) alongside formal ministerial designations for government seats. Fifth, MSC compliance verification of all election results. Sixth, submission of the finalized membership roster to the full CCC for formal endorsement.'
      },
      {
        speaker: 'Dr. Bunthi (Continued)',
        text: 'Constituency representation is balanced across 21 voting members: Government (6 members), Civil Society & Communities (6 members), Multilateral & Bilateral Partners (4 members), and Private Sector & Academia (5 members). Gender diversity requires that at least 30% of seats be held by women. Strict conflict of interest provisions apply: members representing institutions that are Principal Recipients (PRs) or Sub-Recipients (SRs) must abstain from voting on funding allocation matters to safeguard institutional integrity.'
      },
      {
        speaker: 'Bunthon (Community Representative)',
        text: 'I would like to ask whether CCC community delegates can participate directly in Oversight field visits. Often Oversight visits take place, but community delegates on the CCC feel disconnected or receive information late.'
      },
      {
        speaker: 'Dr. Bunthi (Response)',
        text: 'Oversight field verification operates at the macro governance level examining system performance, whereas community work operates at the local grassroots level. We welcome community input, but travel budgets restrict field teams to 6 or 7 participants per mission. Proper planning and budget allocation dictate team sizes.'
      },
      {
        speaker: 'Moderator',
        text: 'A formal quorum check confirms that more than 50% plus one of voting members are present. The renewal timeline for the 2027–2029 mandate is officially approved to begin in September 2026.'
      }
    ]
  },
  {
    heading: 'Session 5: CCC Secretariat Performance Review and Year 2 Budget Costing',
    items: [
      {
        speaker: 'Mr. Vanthy (CCC Secretariat)',
        text: 'Respectful greetings to Excellency Chair and all colleagues. I am presenting our Secretariat Year 1 performance report (October 2025 – September 2026) and the Year 2 budget costing. Our Year 1 budget was $137,000, and our expenditure absorption rate reached 94%. Operations spanned four functional areas: Oversight, Operations, Stakeholder Engagement, and Strategic Positioning.'
      },
      {
        speaker: 'Mr. Vanthy (Continued)',
        text: 'For Year 2, our base Global Fund funding envelope is $135,000, supplemented by approximately $5,400 in Year 1 savings, yielding a total of approximately $140,400. However, the Global Fund CCM Hub has instituted a strict mandatory ceiling: Fixed costs (human resources and office overhead) must not exceed 70% of the total budget, while Activity and Stakeholder Engagement must comprise at least 15% to 30%.'
      },
      {
        speaker: 'Mr. Vanthy (Continued)',
        text: 'We have modeled two costing options: Option 1 maintains our current Secretariat staffing structure. Fixed costs and HR would represent 72% ($101,200), and Activities would represent 28% ($39,000). This option requires an explicit waiver from the Global Fund. Option 2 strictly enforces the 70% Global Fund ceiling, reducing Fixed Costs to $95,000 and increasing the Activity budget to $45,000. However, adopting Option 2 requires reducing one staff contract from 12 months to 9 months (or eliminating one staff position entirely).'
      },
      {
        speaker: 'Rasy (Community Representative)',
        text: 'Looking at the proposed figures, the budget for community elections and provincial oversight missions appears very constrained. Traveling to remote provinces like Ratanakiri consumes two full days just in transit. If Secretariat staffing is reduced, how will administrative support keep pace with field demands?'
      },
      {
        speaker: 'Dr. Bunthi & Mr. Vanthy',
        text: 'Field travel requires flexibility. When missions visit nearby provinces at lower cost, the savings are reallocated to cover distant provinces. We have submitted formal communications to the CCM Hub requesting an exemption from the 70% cap given Cambodia\'s active oversight schedule. If the Global Fund approves, we will execute Option 1; if denied, we will be compelled to implement Option 2.'
      },
      {
        speaker: 'Mr. Polin (UNAIDS)',
        text: 'The Global Fund Country Team is scheduled to visit Cambodia from September 14 to 17. This mission presents an invaluable opportunity to engage the Country Team directly, advocate for our essential HR lines, and secure mutual agreement on critical costs before grant agreements are locked.'
      }
    ]
  },
  {
    heading: 'Session 6: Field Trip Debrief from Siem Reap Provincial Referral Hospital',
    items: [
      {
        speaker: 'Ms. Patricia (UNAIDS / Facilitator, English)',
        text: 'Thank you Tim and hello everyone again. Great to hear that you want to close the day early! So for this last session, it\'s about the field trip debrief. We had two groups: the HIV group and the TB group. Can I kindly ask the HIV group to get us started, to hear what your reflections were from the field visit, and then the TB group, and then we will open it up for comments. Can the HIV group kindly take the floor?'
      },
      {
        speaker: 'Mrs. Ouk Somaly (HIV Group Representative)',
        text: 'Respectful greetings to Excellency Chair, Excellencies, ladies and gentlemen. The HIV team visited Siem Reap Provincial Referral Hospital and identified key strengths and areas for improvement. Strengths: the hospital provides comprehensive integrated clinical services (ART, PrEP, PEP, PMTCT 100%, partner index testing, and viral load/hepatitis screening). 81% of ART clients receive multi-month dispensing (3 to 6 months supply). 95% of eligible clients completed TB Preventive Therapy (TPT). 92% of PLHIV hold health equity cards.'
      },
      {
        speaker: 'Mrs. Ouk Somaly (Continued)',
        text: 'Challenges identified: The first 95 target (diagnosis) lags at 89%. PrEP continuation is low at only 30%. A major systemic vulnerability is that 60% of hospital ART staff are contracted and paid by non-governmental organizations (FHI360, AHF, CRS). This poses an acute risk to human resource sustainability once donor project funding ceases. Furthermore, the hospital lacks specialized surgical and laser treatment for severe anal HPV condyloma. Youth under 30 face stigma and avoid clinics, while patients over 60 suffer from multiple non-communicable diseases (NCDs).'
      },
      {
        speaker: 'Ms. Vath Lida (TB Group Representative)',
        text: 'The TB group inspected the respiratory disease wards at Siem Reap Hospital. The facility consists of four main wards: Ward A for smear-positive pulmonary TB, Ward B for severe pulmonary TB, Ward C for extrapulmonary TB, and Ward D for drug-resistant TB (MDR-TB). Case detection is rising: 2,464 cases were diagnosed in 2025, and 1,289 cases in the first semester of 2026.'
      },
      {
        speaker: 'Ms. Vath Lida (Continued)',
        text: 'Key operational bottlenecks: First, severe ward congestion relative to patient volume. Second, the hospital lacks maintenance budget for its Cobas molecular analyzer ($6,000 annually), leaving equipment non-operational. Third, four GeneXpert machines procured under COVID-19 funding sit idle because they lack TB software modules and cartridges. Fourth, out-of-pocket costs—patients must pay $20 to $40 for pleural fluid aspiration and biopsies, creating a severe barrier for impoverished families.'
      },
      {
        speaker: 'Dr. (CENAT / Ministry of Health)',
        text: 'Regarding the idle GeneXpert machines from the COVID response, those units were financed by the World Bank through the National Institute of Public Health (NIPH), not through the National TB Program (CENAT). Transitioning software licenses and procuring cartridges requires inter-departmental authorization. However, Siem Reap Hospital already possesses dedicated GeneXpert equipment provided directly by the TB program.'
      },
      {
        speaker: 'Dr. Anoop (WHO / Development Partner, English)',
        text: 'The TB-HIV integration in Siem Reap is very positive. Most mortality in HIV is due to TB, so bidirectional screening (screening HIV patients for TB, and TB patients for HIV) and completing TB preventive treatment (TPT) is a very good indicator. Software for GeneXpert can be updated, but digital interoperability between databases must be maintained.'
      },
      {
        speaker: 'M\'phol (Community Representative)',
        text: 'I must voice serious alarm over the proposed 30% administrative overhead cut on new Global Fund sub-recipient grants. This reduction falls directly on grassroots community organizations and field outreach workers who earn modest salaries of $200 to $300 per month. If field budgets are reduced further, community case-finding will collapse.'
      },
      {
        speaker: 'Presiding Excellency (Summary & Formal Adjournment)',
        text: 'Thank you to all members. Over these past two days, we have engaged in deep discussions covering governance accountability, conflict of interest, the $3M+ grant savings, and field realities. Regarding the unspent grant savings, the Ministry of Health and Secretariat must execute action plans immediately to absorb these funds into priority areas before they are lost. I express sincere appreciation to Excellencies, venerable monks, and development partners, and declare this CCM Retreat officially closed. Wishing everyone good health and safe journeys home.'
      }
    ]
  }
];

// Execute script
async function run() {
  const outputDir = 'E:\\audio test';
  const outDoc1 = path.join(outputDir, 'Transcript_Day_2.1_EC_presentation_English.docx');
  const outDoc2 = path.join(outputDir, 'Transcript_Day_2.2_renewal_presentation_English.docx');

  await createEnglishDoc(
    'CCM National Retreat: Complete Meeting Transcript',
    'Session 1: Ethics Committee & Session 2: Oversight Accountability (Day 2.1 - Morning)',
    outDoc1,
    sectionsDay2_1_EN
  );

  await createEnglishDoc(
    'CCM National Retreat: Complete Meeting Transcript',
    'Session 3: Membership Renewal, Secretariat Budget & Hospital Debrief (Day 2.2 - Afternoon)',
    outDoc2,
    sectionsDay2_2_EN
  );
}



run().catch(err => {
  console.error(err);
  process.exit(1);
});
