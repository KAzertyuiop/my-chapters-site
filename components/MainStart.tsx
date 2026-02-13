import StopMotionScrubber from "./StopMotionScrubber";

export default function MainStart() {
  return (
    <>
      <h1>Hanteer je daktent met gemak</h1>

      <section>
        <StopMotionScrubber />
      </section>
      {/*
      <div style={{ maxWidth: '100%', width: '100%' }}>
        <img
          src="/svg/introtest.svg"
          alt="Test"
          style={{ width: '100%', height: 'auto', display: 'block' }}
        />
        <img
          src="/svg/fietstest1.svg"
          alt="Test"
          style={{ width: '100%', height: 'auto', display: 'block' }}
        />
      </div>
      */}
    </>
  )
}