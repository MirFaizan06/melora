const countries = [
  { name: "Argentina", code: "AR", flag: "🇦🇷" },
  { name: "Australia", code: "AU", flag: "🇦🇺" },
  { name: "Brazil", code: "BR", flag: "🇧🇷" },
  { name: "Canada", code: "CA", flag: "🇨🇦" },
  { name: "France", code: "FR", flag: "🇫🇷" },
  { name: "Germany", code: "DE", flag: "🇩🇪" },
  { name: "India", code: "IN", flag: "🇮🇳" },
  { name: "Indonesia", code: "ID", flag: "🇮🇩" },
  { name: "Japan", code: "JP", flag: "🇯🇵" },
  { name: "Mexico", code: "MX", flag: "🇲🇽" },
  { name: "Philippines", code: "PH", flag: "🇵🇭" },
  { name: "South Korea", code: "KR", flag: "🇰🇷" },
  { name: "United Kingdom", code: "GB", flag: "🇬🇧" },
  { name: "United States", code: "US", flag: "🇺🇸" },
  // Add more as needed
];

export default countries.sort((a, b) => a.name.localeCompare(b.name));
