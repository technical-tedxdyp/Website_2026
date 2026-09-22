const COLORS = [
  'bg-[#ff3300]',
  'bg-[#e62e00]',
  'bg-[#cc2900]',
  'bg-[#660066]',
  'bg-[#ff8844]',
  'bg-[#990033]',
  'bg-[#330033]',
  'bg-[#4d004d]',
];

export default function ColorStrip() {
  return (
    <div className="w-full h-4 flex" aria-hidden="true">
      {Array.from({ length: 40 }, (_, i) => (
        <div key={i} className={`flex-1 h-full ${COLORS[i % COLORS.length]}`} />
      ))}
    </div>
  );
}
