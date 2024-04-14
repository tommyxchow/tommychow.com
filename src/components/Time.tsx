export function Time() {
  return (
    <div>
      Last updated on {new Date().toDateString()} {new Date().toTimeString()}
    </div>
  );
}
