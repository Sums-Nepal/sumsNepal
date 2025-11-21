import "./Stars.css"

const Stars = () => {
  // Generate 50 stars with random positions, speeds, and delays
  const stars = Array.from({ length: 50 }).map((_, i) => {
    const top = Math.random() * 100; // 0% to 100%
    const left = Math.random() * 100; // 0% to 100%
    const duration = Math.random() * 5 + 5; // 5s to 10s
    const delay = Math.random() * 5; // 0s to 5s
    const size = Math.random() * 2 + 1; // 1px to 3px

    return (
      <div
        key={i}
        className="star"
        style={{
          top: `${top}%`,
          left: `${left}%`,
          width: `${size}px`,
          height: `${size}px`,
          animationDuration: `${duration}s`,
          animationDelay: `${delay}s`,
        }}
      ></div>
    );
  });
  return (
    <>
      {/* Stars overlay */}
      <div className="stars">{stars}</div>
    </>
  );
};

export default Stars;
