import styles from './ContentBlock.module.css'

type ContentButton = {
  label: string
  href: string
}

type ContentBlockProps = {
  title?: string
  description?: string
  buttons?: ContentButton[]
  variant?: 'default'
  className?: string
}

export default function ContentBlock({
  title,
  description,
  buttons,
  variant = 'default',
  className,
}: ContentBlockProps) {
  const buttonItems = buttons ?? []
  const hasButtons = buttonItems.length > 0

  return (
    <div className={[styles.contentBlock, className].filter(Boolean).join(' ')} data-name="ContentBlock" data-node-id="691:1323" data-variant={variant}>
      <div className={styles.viewportContainer} data-name="ViewportContainer" data-node-id="690:1315">
        <div className={styles.contentCombo} data-name="ContentCombo" data-node-id="I690:1315;689:1310">
          {title ? (
            <p className={styles.title} data-node-id="I690:1315;689:1310;689:1304">
              {title}
            </p>
          ) : null}
          {description ? (
            <p className={styles.description} data-node-id="I690:1315;689:1310;689:1305">
              {description}
            </p>
          ) : null}
          {hasButtons ? (
            <div className={styles.actions} data-node-id="I690:1315;689:1310;697:4362">
              {buttonItems.map(({ label, href }, index) => (
                <a key={`${label}-${href}-${index}`} href={href} className={styles.button} data-node-id="658:1099">
                  <span className={styles.buttonLabel} data-node-id="658:1098">
                    {label}
                  </span>
                </a>
              ))}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  )
}
