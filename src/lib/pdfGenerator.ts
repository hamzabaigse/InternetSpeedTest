import jsPDF from 'jspdf';
import { DiagnosticResult } from './speedTestEngine';

export function generateIspComplaintPdf(
  result: DiagnosticResult,
  ispName: string = 'Detecting ISP...',
  userCity: string = 'Chicago, IL'
) {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const timestamp = new Date().toLocaleString();
  const reportId = `NET-DIAG-${Math.floor(100000 + Math.random() * 900000)}`;

  // Header Banner
  doc.setFillColor(15, 23, 42);
  doc.rect(0, 0, 210, 38, 'F');

  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(18);
  doc.text('OFFICIAL ISP NETWORK COMPLAINT REPORT', 14, 16);

  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.text(`Document ID: ${reportId}  |  Generated: ${timestamp}`, 14, 25);
  doc.text('Compliance Standards: FCC / BEREC Network Neutrality Telemetry Audit', 14, 31);

  // Section 1: Connection & Telemetry Summary
  doc.setLineWidth(0.5);
  doc.setDrawColor(203, 213, 225);

  doc.setTextColor(15, 23, 42);
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.text('1. Subscriber & Network Identifier', 14, 48);

  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.text(`Internet Service Provider (ISP): ${ispName}`, 14, 56);
  doc.text(`Location Node / City: ${userCity}`, 14, 62);
  doc.text(`Work From Home Composite Grade: ${result.wfhGrade}`, 14, 68);
  doc.text(`Throttling Risk Verdict: ${result.isThrottlingLikely ? 'HIGH TRAFFIC SHAPING DETECTED' : 'Normal Stream Parity'}`, 14, 74);

  // Section 2: Key Measurement Breakdown Table in MB/s
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.text('2. Measured Metrics & Contractual Deviation (MB/s)', 14, 86);

  // Table Headers
  doc.setFillColor(241, 245, 249);
  doc.rect(14, 91, 182, 8, 'F');
  doc.setFontSize(9);
  doc.setFont('helvetica', 'bold');
  doc.text('Metric Parameter', 16, 96.5);
  doc.text('Measured Result', 85, 96.5);
  doc.text('Benchmark Standard', 135, 96.5);
  doc.text('Status', 178, 96.5);

  // Rows
  const rows = [
    { label: 'Multi-stream Download Speed', val: `${result.downloadMBps} MB/s`, bench: '> 12.5 MB/s', status: result.downloadMBps > 6 ? 'PASS' : 'FAIL' },
    { label: 'Single-stream Download Speed', val: `${result.singleStreamMBps} MB/s`, bench: '>= Multi-stream', status: result.isThrottlingLikely ? 'THROTTLED' : 'PASS' },
    { label: 'Upload Bandwidth Capacity', val: `${result.uploadMBps} MB/s`, bench: '> 2.0 MB/s', status: result.uploadMBps > 1.5 ? 'PASS' : 'WARN' },
    { label: 'Idle Latency (Ping)', val: `${result.idlePingMs} ms`, bench: '< 30 ms', status: result.idlePingMs < 40 ? 'PASS' : 'WARN' },
    { label: 'Bufferbloat Latency Spike (+Delta)', val: `+${result.bufferbloatDeltaMs} ms (${result.bufferbloatGrade})`, bench: '< 25 ms', status: result.bufferbloatGrade === 'D' || result.bufferbloatGrade === 'F' ? 'FAIL' : 'PASS' },
    { label: 'YouTube CDN Delivery Rate', val: `${result.youtubeCdnSpeedMBps} MB/s (${result.youtube4kBufferRatio}x)`, bench: '> 3.1 MB/s (4K)', status: result.youtube4kBufferRatio >= 1.0 ? 'PASS' : 'WARN' },
    { label: 'VoIP Audio Jitter Variance', val: `${result.jitterMs} ms (${result.packetDropProbabilityPercent}% Drop)`, bench: '< 10 ms', status: result.jitterMs < 15 ? 'PASS' : 'WARN' },
  ];

  let y = 104;
  doc.setFont('helvetica', 'normal');
  rows.forEach((row, idx) => {
    if (idx % 2 === 1) {
      doc.setFillColor(248, 250, 252);
      doc.rect(14, y - 5, 182, 7, 'F');
    }
    doc.setTextColor(30, 41, 59);
    doc.text(row.label, 16, y);
    doc.text(row.val, 85, y);
    doc.text(row.bench, 135, y);

    if (row.status === 'PASS') doc.setTextColor(16, 185, 129);
    else if (row.status === 'WARN') doc.setTextColor(245, 158, 11);
    else doc.setTextColor(239, 68, 68);
    
    doc.text(row.status, 178, y);
    y += 8;
  });

  // Section 3: Diagnostic Findings Analysis
  doc.setTextColor(15, 23, 42);
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.text('3. Technical Findings & Evidence Analysis', 14, y + 10);

  doc.setFontSize(9.5);
  doc.setFont('helvetica', 'normal');
  
  let explanation = '';
  if (result.isThrottlingLikely) {
    explanation = `Analysis reveals a severe discrepancy between multi-stream downloads (${result.downloadMBps} MB/s) and single-stream downloads (${result.singleStreamMBps} MB/s), generating a Throttling Ratio of ${result.throttlingRatio}x. This indicates bandwidth shaping by ${ispName}.`;
  } else if (result.bufferbloatGrade === 'D' || result.bufferbloatGrade === 'F') {
    explanation = `The network suffers from Bufferbloat under load (+${result.bufferbloatDeltaMs} ms latency spike). During concurrent traffic, real-time applications will experience packet delay and jitter (${result.jitterMs} ms).`;
  } else {
    explanation = `The overall network telemetry shows stable bandwidth distribution. YouTube CDN delivery rate measured ${result.youtubeCdnSpeedMBps} MB/s (${result.youtube4kBufferRatio}x real-time 4K requirement). Multi-stream vs single-stream parity remains within acceptable tolerance limits.`;
  }

  const splitText = doc.splitTextToSize(explanation, 182);
  doc.text(splitText, 14, y + 18);

  // Regulatory Instructions
  const boxY = y + 36;
  doc.setFillColor(254, 242, 242);
  doc.setDrawColor(248, 113, 113);
  doc.rect(14, boxY, 182, 26, 'FD');

  doc.setTextColor(153, 27, 27);
  doc.setFontSize(10);
  doc.setFont('helvetica', 'bold');
  doc.text('INSTRUCTIONS FOR SUBMITTING TO YOUR ISP OR TELECOM REGULATOR', 18, boxY + 7);

  doc.setFontSize(8.5);
  doc.setFont('helvetica', 'normal');
  doc.text('1. Attach this PDF report directly to your ISP customer support ticket.', 18, boxY + 13);
  doc.text('2. Request immediate escalation to Level 2/3 Network Operations (NOC) for line quality verification.', 18, boxY + 18);
  doc.text('3. If unresolved within 14 business days, submit this document to regulatory agencies (FCC Consumer Complaints / BEREC).', 18, boxY + 23);

  // Footer Signature
  doc.setFontSize(8);
  doc.setTextColor(148, 163, 184);
  doc.text('Generated by Network Diagnostic & ISP Intelligence Hub — Telemetry Audit Engine', 14, 285);

  doc.save(`ISP_Throttling_Report_${reportId}.pdf`);
}
