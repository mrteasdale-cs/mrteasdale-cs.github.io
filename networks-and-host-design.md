---
layout: default
---

## Linux Host Security

### Remove unnecessary software	
Unnecessary software occupies disk space and could introduce security flaws. To remove unnecessary software enter one of the following commands:

- yum list installed or dnf list installed to see installed RPM packages on the computer.
- apt
    - apt autoremove automatically removes unused packages
    - apt list list all installed packages
- dpkg get-selections to see installed Debian packages on the computer.

Use one of the following commands to uninstall unnecessary packages.
- yum erase packagename
- dnf remove packagename
- apt remove packagename
- rpm -e packagename
- dpkg -r packagename

## Check for unnecessary network services	
Unnecessary network services waste computer resources and increase the system's attack service. To remove unnecessary network services:

1. Find all installed services and determine which are not needed:  DNS, SNMP, DHCP and others.
    - systemctl --type=service --state=active
2. Use the man command and the Internet to research services you don't recognize.
    - If the service is not needed, determine if it is a dependency for another service.
3. Disable the service by using the following command:
    - systemctl disable servicename
4. Use one of the following commands to immediately stop the script:
    - systemctl stop servicename
5. Use one of the following commands to remove the script package entirely.
    - yum erase packagename
    - dnf remove packagename
    - apt remove packagename
    - rpm -e packagename
    - dpkg -r packagename

## Use NMAP

1. Install the nmap utility if it is not already installed.
    - yum install nmap
    - dnf install nmap
    - apt -i nmap

2. Use both of the following commands to scan for open ports:
    - nmap -sT ipaddress|fqdn scans for TCP ports
    - nmap -sU ipaddress|fqdn scans for UDP ports

3. Disabled any services not needed:
    - systemctl disable servicename
    - systemctl stop servicename