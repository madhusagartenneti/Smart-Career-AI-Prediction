export default function AnimatedLines() {
  return (
    <div className="lines-bg">
      <div className="lines">
        {Array.from({ length: 10 }).map((_, i) => (
          <div key={i} className="line"></div>
        ))}
      </div>
    </div>
  );
}
