import StopMotionScrubber from "./StopMotionScrubber";

export default function MainStart() {
  return (
    <>
      <h2>De start</h2>
      <p>Bla bla intro section</p>

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