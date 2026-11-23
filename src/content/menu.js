// Mega menu: how services are grouped, with a one-line description for each
module.exports = {
  serviceGroups: [
    {
      title: "Support & Infrastructure",
      items: [
        { slug: "managed-it-support", desc: "Helpdesk, monitoring &amp; on-site support" },
        { slug: "networking-infrastructure", desc: "Cabling, Wi-Fi, CCTV &amp; access control" },
        { slug: "hardware-supply-repair", desc: "Genuine equipment &amp; local repairs" },
      ],
    },
    {
      title: "Connectivity & Power",
      items: [
        { slug: "internet-vsat-connectivity", desc: "VSAT, fibre &amp; wireless with failover" },
        { slug: "solar-power-backup", desc: "Solar, inverters, UPS &amp; batteries" },
      ],
    },
    {
      title: "Cloud & Security",
      items: [
        { slug: "cloud-solutions", desc: "Microsoft 365, email &amp; hosting" },
        { slug: "cybersecurity", desc: "Firewalls, audits &amp; staff training" },
        { slug: "data-backup-recovery", desc: "Automated backups &amp; disaster recovery" },
      ],
    },
    {
      title: "Software & Strategy",
      items: [
        { slug: "software-development", desc: "Websites, apps &amp; business systems" },
        { slug: "it-consulting", desc: "Audits, roadmaps &amp; procurement advice" },
      ],
    },
  ],
};
