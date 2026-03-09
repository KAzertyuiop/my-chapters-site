import type { CSSProperties, ReactNode } from 'react'
import styles from './ContentBlock.module.css'

type ContentButton = {
  label: string
  href: string
}

type ContentBlockProps = {
  title?: string
  description?: ReactNode
  buttons?: ContentButton[]
  variant?: 'default' | 'stickyScroller' | 'stickyScrollerReverse'
  titleClassName?: string
  stickyVisual?: ReactNode
  stickyVisualHeight?: string
  stickyTop?: string
  className?: string
}

export default function ContentBlock({
  title,
  description,
  buttons,
  variant = 'default',
  titleClassName,
  stickyVisual,
  stickyVisualHeight = '300px',
  stickyTop = 'var(--offset-sticky-top)',
  className,
}: ContentBlockProps) {
  const buttonItems = buttons ?? []
  const hasButtons = buttonItems.length > 0
  const isStickyVariant = variant === 'stickyScroller' || variant === 'stickyScrollerReverse'
  const stickyVisualStyles = {
    '--sticky-visual-height': stickyVisualHeight,
    '--sticky-top': stickyTop,
  } as CSSProperties
  const titleVariantClassName = isStickyVariant ? styles.titleSticky : styles.titleDefault
  const titleTypeClassName = isStickyVariant ? 'u-type-larger-semi' : 'u-type-huge'
  const titleNode = title ? (
    <p className={[styles.title, titleVariantClassName, titleTypeClassName, titleClassName].filter(Boolean).join(' ')} data-node-id="I690:1315;689:1310;689:1304">
      {title}
    </p>
  ) : null
  const descriptionNode = description ? (
    <div className={styles.description} data-node-id="I690:1315;689:1310;689:1305">
      {description}
    </div>
  ) : null
  const actionsNode = hasButtons ? (
    <div className={styles.actions} data-node-id="I690:1315;689:1310;697:4362">
      {buttonItems.map(({ label, href }, index) => (
        <a key={`${label}-${href}-${index}`} href={href} className={styles.button} data-node-id="658:1099">
          <span className={styles.buttonLabel} data-node-id="658:1098">
            {label}
          </span>
        </a>
      ))}
    </div>
  ) : null

  return (
    <div className={[styles.contentBlock, className].filter(Boolean).join(' ')} data-name="ContentBlock" data-node-id="691:1323" data-variant={variant}>
      <div className={styles.viewportContainer} data-name="ViewportContainer" data-node-id="690:1315">
        {isStickyVariant ? (
          <div className={[styles.contentCombo, styles.stickyCombo, variant === 'stickyScrollerReverse' ? styles.stickyComboReverse : null].filter(Boolean).join(' ')} data-name="ContentCombo" data-node-id="I745:7347;690:1315;689:1310">
            <div className={styles.textColumn} data-name="TextColumn" data-node-id="I745:7347;690:1315;689:1310;745:7288">
              <div className={styles.stickyTextContent}>
                {titleNode}
                {description ? (
                  <div className={styles.stickyDescription} data-node-id="I745:7347;690:1315;689:1310;745:7289">
                    {description}
                  </div>
                ) : null}
                {actionsNode}
              </div>
            </div>
            <div className={styles.visualColumn} data-name="VisualColumn" data-node-id="I745:7347;690:1315;689:1310;745:7294">
              <div className={[styles.stickyStage, variant === 'stickyScrollerReverse' ? styles.stickyStageReverse : null].filter(Boolean).join(' ')} data-name="StickyStage" data-node-id="I745:7347;690:1315;689:1310;745:7296" style={stickyVisualStyles}>
                {stickyVisual ? (
                  <div className={styles.stickyVisual}>{stickyVisual}</div>
                ) : (
                  <div className={styles.dummyVisual} data-name="DummyVisual" data-node-id="I745:7347;690:1315;689:1310;745:7306" />
                )}
              </div>
            </div>
          </div>
        ) : (
          <div className={styles.contentCombo} data-name="ContentCombo" data-node-id="I690:1315;689:1310">
            {titleNode}
            {descriptionNode}
            {actionsNode}
          </div>
        )}
      </div>
    </div>
  )
}
