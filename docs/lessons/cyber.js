'use strict';

import { bash, def, examTip, tip, section, h3, p, qa, practiceSect } from '../helpers.js';

export function cyberTopicContent(id) {
  switch(id) {

  case 'unit4': return `
    ${section('Linux Host Security: Hardening a System',
      p('Hardening a Linux host means reducing its attack surface by removing unnecessary software and services, closing unused network ports, and actively monitoring open connections.'),
      def('Attack Surface', 'The total set of entry points through which an attacker could try to access a system. Reducing the attack surface means removing unnecessary software, services, and open ports.')
    )}
    ${section('Remove Unnecessary Software',
      p('Unnecessary software occupies disk space and may introduce security vulnerabilities. Steps to identify and remove it:'),
      bash(`# List installed RPM packages (Red Hat / CentOS / Fedora)
yum list installed
dnf list installed

# List Debian packages
apt list --installed
dpkg --get-selections

# Remove a package
yum erase packagename
dnf remove packagename
apt remove packagename
rpm -e packagename
dpkg -r packagename`),
      tip('If unsure whether a package is needed, check if any other service depends on it before removing it.')
    )}
    ${section('Check for Unnecessary Network Services',
      p('Unnecessary network services waste resources and increase the attack surface. How to audit and disable them:'),
      bash(`# List all active services
systemctl --type=service --state=active

# Research an unknown service
man servicename

# Disable a service (stop it starting on boot)
systemctl disable servicename

# Stop a running service immediately
systemctl stop servicename`),
      tip('Common services to evaluate: DNS, SNMP, DHCP, FTP, Telnet. Telnet transmits data in plaintext: always replace with SSH.')
    )}
    ${section('Port Scanning with NMAP',
      def('NMAP', 'Network Mapper: an open-source tool for discovering hosts and services on a network by sending packets and analysing responses.'),
      bash(`# Install nmap
yum install nmap
apt install nmap

# Scan for open TCP ports on a host
nmap -sT ipaddress

# Scan for open UDP ports on a host
nmap -sU ipaddress

# After identifying unwanted open ports, disable the service
systemctl disable servicename
systemctl stop servicename`),
      examTip('NMAP is a dual-use tool, it is used by both defenders (to audit their own systems) and attackers (to probe targets). In authorised security testing it is legitimate and essential.')
    )}
    ${section('Monitoring Connections with netstat',
      def('netstat', 'A command-line tool that displays active network connections, listening ports, and network statistics.'),
      bash(`# Show all listening and non-listening sockets
netstat -a

# Show only listening sockets
netstat -l

# Show statistics for each protocol
netstat -s

# Show network interface table
netstat -i`),
      `<div class="tbl-wrap"><table class="content-table">
        <thead><tr><th>Flag</th><th>Meaning</th></tr></thead>
        <tbody>
          <tr><td><code>-a</code></td><td>All sockets (listening and non-listening)</td></tr>
          <tr><td><code>-l</code></td><td>Listening sockets only</td></tr>
          <tr><td><code>-s</code></td><td>Protocol statistics (TCP, UDP, ICMP)</td></tr>
          <tr><td><code>-i</code></td><td>Network interface statistics</td></tr>
        </tbody>
      </table></div>`
    )}
    ${section('Key Terms',
      `<div class="key-terms-box"><h3>Quick Reference</h3><div class="key-terms-grid">
        ${[
          ['Attack surface','All possible entry points for an attacker on a system.'],
          ['Hardening','Process of securing a system by reducing its attack surface.'],
          ['systemctl','Linux command to start, stop, enable, and disable services.'],
          ['NMAP','Network Mapper: scans hosts for open ports and services.'],
          ['netstat','Shows active connections, listening ports, and network stats.'],
          ['TCP scan','nmap -sT: probes for open TCP ports using connection requests.'],
        ].map(([k,v]) => `<div class="key-term"><span class="kt-name">${k}</span><span class="kt-def">${v}</span></div>`).join('')}
      </div></div>`
    )}`;

  case 'unit5': return `
    ${section('NAT: Network Address Translation',
      def('NAT', 'A technique used by routers to allow multiple devices on a private network (LAN) to share a single public IP address when communicating with the internet (WAN).'),
      p('IPv4 addresses are limited, not every device can have a globally routable public IP. A home or office router receives one public IP from the ISP and assigns private IPs (e.g. 192.168.x.x) to internal devices. NAT translates between these as packets leave and enter the network.'),
      tip('NAT provides a basic level of security: devices on the internal network are not directly reachable from the internet because they do not have public IPs.')
    )}
    ${section('VPN: Virtual Private Network',
      def('VPN', 'A technology that creates an encrypted tunnel over a public network (the internet), allowing remote users to connect securely as if they were on the private internal network.'),
      p('VPNs are used by employees working remotely to securely access company resources. They encrypt all traffic between the device and the VPN server.'),
      `<div class="callout callout-exam"><div class="callout-label">Exam Tip</div><p>Use <strong>IPSec over L2TP</strong> for VPNs. <strong>PPTP with MSCHAPv2</strong> is considered insecure and should not be used in modern deployments.</p></div>`
    )}
    ${section('Web Threat Protection',
      p('Organisations deploy several types of device/service to protect against web-based threats:'),
      `<div class="tbl-wrap"><table class="content-table">
        <thead><tr><th>Protection type</th><th>What it does</th></tr></thead>
        <tbody>
          <tr><td><strong>URL / Content Filter</strong></td><td>Blocks access to specific websites (e.g. social media, gambling). Enforces internet usage policy. Does not protect against malicious sites not on the blocklist.</td></tr>
          <tr><td><strong>Web Threat Filter</strong></td><td>Blocks access to sites with known malicious content using a continuously updated list of dangerous URLs.</td></tr>
          <tr><td><strong>Gateway Email Spam Filter</strong></td><td>Prevents spam, phishing, and malicious emails from reaching the network. Blocks specific senders and emails with known threats.</td></tr>
          <tr><td><strong>Virus Scanner</strong></td><td>Identifies and removes infected content. Often combined with email scanning.</td></tr>
          <tr><td><strong>Anti-phishing Software</strong></td><td>Scans content to identify and block phishing attempts.</td></tr>
          <tr><td><strong>Encryption</strong></td><td>Makes data (e.g. emails) unreadable to anyone without the decryption key.</td></tr>
        </tbody>
      </table></div>`,
      h3('Proxy Servers'),
      def('Proxy', 'A server that sits between clients and the internet, forwarding requests on behalf of clients. Can be used for content filtering, anonymity, or caching.'),
      p('<strong>Transparent proxies:</strong> Redirect requests without the user\'s knowledge: no client configuration needed. <strong>Forward proxies:</strong> Used to filter content or mask a user\'s identity.')
    )}
    ${section('Network Access Control (NAC)',
      def('NAC', 'A policy-driven system that checks whether a device meets security requirements before allowing it to connect to the network. Non-compliant devices are placed in a restricted zone.'),
      p('<strong>BYOD (Bring Your Own Device)</strong> policies allow personal devices on the company network, but NAC enforces that these devices must meet security standards (updated OS, antivirus, etc.) before access is granted.'),
      `<div class="two-col-list">
        ${[
          ['Prevent zero-day attacks','Devices without latest patches go to restricted zone.'],
          ['Role-based controls','Different network access based on user role.'],
          ['Encrypt traffic','Ensures sensitive data is protected in transit.'],
          ['Identity management','Verifies user/device identity before granting access.'],
        ].map(([k,v]) => `<div class="list-item li-benefit"><span class="li-icon">✓</span><div><strong>${k}</strong>: ${v}</div></div>`).join('')}
      </div>`
    )}
    ${section('Network Segmentation and Threats',
      h3('Network Segmentation'),
      def('Network Segmentation', 'Dividing a network into separate zones so that if one segment is compromised, the damage is contained and does not spread to the rest of the network.'),
      p('Most common method: <strong>VLANs (Virtual Local Area Networks)</strong>. Zones are often classified by trust level: low (public-facing like web servers: also called <strong>DMZ / demilitarised zone</strong>), medium, high (internal sensitive systems).'),
      h3('Types of Network Attack'),
      `<div class="tbl-wrap"><table class="content-table">
        <thead><tr><th>Type</th><th>Description</th></tr></thead>
        <tbody>
          <tr><td><strong>Active</strong></td><td>Attacker actively tries to compromise or disrupt the system (e.g. malware, DoS, SQL injection)</td></tr>
          <tr><td><strong>Passive</strong></td><td>Attacker silently gathers information without disrupting traffic (e.g. packet sniffing, eavesdropping)</td></tr>
          <tr><td><strong>External</strong></td><td>Attack originates from outside the network perimeter</td></tr>
          <tr><td><strong>Internal (Insider threat)</strong></td><td>Attack from someone inside the network: often the most damaging</td></tr>
        </tbody>
      </table></div>`,
      h3('Threat Focus Points'),
      `<div class="two-col-list">
        ${[
          ['Entry points','Identify all possible attack vectors: public servers, WiFi, personal devices, USB ports.'],
          ['Inherent vulnerabilities','Systems without proper security controls (outdated OS, unpatched software).'],
          ['Documentation','Document all assets: you cannot protect what you do not know you have.'],
          ['Network baseline','Establish normal traffic patterns so anomalies (unusual loads, unexpected connections) can be detected.'],
        ].map(([k,v]) => `<div class="list-item li-benefit"><span class="li-icon">•</span><div><strong>${k}</strong>: ${v}</div></div>`).join('')}
      </div>`,
      tip('User education is one of the most effective security measures: phishing succeeds primarily because of human error, not technical failure.')
    )}
    ${section('Key Terms',
      `<div class="key-terms-box"><h3>Quick Reference</h3><div class="key-terms-grid">
        ${[
          ['NAT','Translates private IPs to a shared public IP: allows LAN devices to reach the internet.'],
          ['VPN','Encrypted tunnel over the internet for secure remote access.'],
          ['DMZ','Demilitarised zone: low-trust network segment for public-facing servers.'],
          ['VLAN','Virtual LAN: logical network segment for isolation.'],
          ['NAC','Network Access Control: checks device compliance before granting access.'],
          ['BYOD','Bring Your Own Device: personal devices on corporate networks.'],
          ['Passive attack','Gathers data without disrupting traffic (e.g. packet sniffing).'],
          ['Active attack','Attempts to modify, disrupt, or compromise systems.'],
        ].map(([k,v]) => `<div class="key-term"><span class="kt-name">${k}</span><span class="kt-def">${v}</span></div>`).join('')}
      </div></div>`
    )}`;

  default: return `<div class="page-section"><p>Content coming soon.</p></div>`;
  }
}
