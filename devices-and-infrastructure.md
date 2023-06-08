---
layout: default
---

# Devices & Infrastructure

## 5.4 NAT

Network address translation occurs due to a limitation in the IPv4 networking scheme. The interent is a public network and needs a routable IP that is registered. Not all devices can have one - ISPs will provide this to a customer.

The router will assign each device on the internal network with a unique IP that is then converted into a routable IP once it leaves the LAN to go into the WAN.

## 5.5 VPN
A virtual private network VPN is a remote-access connection that uses encryption

Use IPSec over L2TP - PPTP with MSv2CHAP is insecure!

## 5.6 Web Threat Protection

Website/URL content filtering - prevents a user from visiting restricted websites. Specific websites are identified as restricted; employees are not able to view the sites on their browsers. Used to enforce the organization's internet usage policy.Helps to increase bandwidth availability.
![Web filter](./images/web-filter.png)

Web threat filtering - prevents a user from visiting websites with known malicious content. It maintains a list of websites with known malicious content.

Gateway email spam filters - prevent spam emails from reaching your network, servers, and computers. Spam filters can be configured to block specific senders, emails containing threats (such as false links), and emails containing specific content.

Virus scanners - identify infected content and dispose of it. Often coupled with email scanners.

Anti-phishing software- scans content to identify and dispose of phishing attempts, preventing outside attempts to access confidential information.

Encryption - causes data, such as the content of an email, to be unintelligible except to those who have the proper key to decrypt it.
Proxies	
- Transparent proxies are located between a user and the internet, and they can redirect requests without changing the request.
- Forward proxies can be used to filter web content, but can also be used to mask a user's identity for anonymity.



- [Cyber-Security Files](https://github.com/mrteasdale-cs/mrteasdale-cs.github.io/tree/d103ce5b0975c6c9305582da1397c7e0ebe45c07/programming/cyber-security){:target="_blank"}