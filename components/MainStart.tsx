import StopMotionScrubber from "./StopMotionScrubber";
import styles from "./MainStart.module.css";

export default function MainStart() {
  return (
    <div className={styles.opener}>
      <section className={styles.scrubberSizing}>
        <StopMotionScrubber />
      </section>
    </div>
  )
}
