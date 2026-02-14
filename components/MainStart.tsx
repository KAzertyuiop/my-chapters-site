import StopMotionScrubber from "./StopMotionScrubber";
import styles from "./MainStart.module.css";

export default function MainStart() {
  return (
    <>
      <div className={styles.opener}>
        <h1 className={styles.promise}>
          <span>Hanteer je daktent</span>
          <span>met gemak</span>
        </h1>

        <section  className={styles.scrubberSizing}>
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
      </div>
    </>
  )
}