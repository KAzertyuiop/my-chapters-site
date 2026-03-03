import styles from './ContentBlock.module.css'

type ContentBlockProps = {
  title: string
  description: string
  buttons?: string[]
  className?: string
}

export default function ContentBlock({
  title,
  description,
  buttons = ['Button', 'Button', 'Button'],
  className,
}: ContentBlockProps) {
  return (
    <div className={[styles.contentBlock, className].filter(Boolean).join(' ')} data-name="ContentBlock" data-node-id="691:1323">
      <div className={styles.viewportContainer} data-name="ViewportContainer" data-node-id="690:1315">
        <div className={styles.contentCombo} data-name="ContentCombo" data-node-id="I690:1315;689:1310">
          <p className={styles.title} data-node-id="I690:1315;689:1310;689:1304">
            {title}
          </p>
          <p className={styles.description} data-node-id="I690:1315;689:1310;689:1305">
            {description}
          </p>
          <div className={styles.actions} data-node-id="I690:1315;689:1310;697:4362">
            {buttons.map((label, index) => (
              <button key={`${label}-${index}`} type="button" className={styles.button} data-node-id="658:1099">
                <span className={styles.buttonLabel} data-node-id="658:1098">
                  {label}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
