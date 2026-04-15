import type { CSSProperties, ReactNode } from 'react'
import styles from './ContentBlock.module.css'

type ContentButton = {
  label: string
  href: string
  active?: boolean
  onClick?: (event: React.MouseEvent<HTMLAnchorElement>) => void
}

type ContentBlockProps = {
  title?: string
  description?: ReactNode
  buttons?: ContentButton[]
  children?: ReactNode
  blockVariant?: 'default' | 'stickyScroller' | 'stickyScrollerReverse'
  comboVariant?: 'default' | 'eyebrow' | 'bigTitle' | 'buttonStack'
  titleClassName?: string
  descriptionClassName?: string
  viewportClassName?: string
  stickyContent?: ReactNode
  stickyContentHeight?: string
  stickyTop?: string
  className?: string
}

export default function ContentBlock({
  title,
  description,
  buttons,
  children,
  blockVariant = 'default',
  comboVariant = 'default',
  titleClassName,
  descriptionClassName,
  viewportClassName,
  stickyContent,
  stickyContentHeight = '300px',
  stickyTop = 'var(--offset-sticky-top)',
  className,
}: ContentBlockProps) {
  const buttonItems = buttons ?? []
  const hasButtons = buttonItems.length > 0
  const isStickyVariant =
    blockVariant === 'stickyScroller' || blockVariant === 'stickyScrollerReverse'
  const stickyContentStyles = {
    '--sticky-content-height': stickyContentHeight,
    '--sticky-top': stickyTop,
  } as CSSProperties
  const isEyebrowVariant = comboVariant === 'eyebrow'
  const isBigTitleVariant = comboVariant === 'bigTitle'
  const isButtonStackVariant = comboVariant === 'buttonStack'
  const titleVariantClassName = isStickyVariant ? styles.titleSticky : styles.titleDefault
  const titleTypeClassName = isStickyVariant
    ? 'u-type-larger-semi'
    : isEyebrowVariant
      ? 'u-type-small'
      : isBigTitleVariant
        ? 'u-type-huge'
      : 'u-type-huge'
  const titleNode = title ? (
    <p
      className={[
        styles.title,
        titleVariantClassName,
        isEyebrowVariant ? styles.titleEyebrow : null,
        isBigTitleVariant ? styles.titleBigTitle : null,
        titleTypeClassName,
        titleClassName,
      ]
        .filter(Boolean)
        .join(' ')}
      data-node-id="I690:1315;689:1310;689:1304"
    >
      {title}
    </p>
  ) : null
  const descriptionNode = description ? (
    <div
      className={[styles.description, descriptionClassName].filter(Boolean).join(' ')}
      data-node-id="I690:1315;689:1310;689:1305"
    >
      {description}
    </div>
  ) : null
  const actionsNode = hasButtons ? (
    <div
      className={[styles.actions, isButtonStackVariant ? styles.actionsButtonStack : null]
        .filter(Boolean)
        .join(' ')}
      data-node-id="I690:1315;689:1310;697:4362"
    >
      {buttonItems.map(({ label, href, active, onClick }, index) => (
        <a
          key={`${label}-${href}-${index}`}
          href={href}
          onClick={onClick}
          className={[styles.button, isButtonStackVariant ? styles.buttonStackItem : null]
            .filter(Boolean)
            .join(' ')}
          data-node-id="658:1099"
          data-active={active ? 'true' : undefined}
          aria-pressed={active ? 'true' : undefined}
        >
          <span className={styles.buttonLabel} data-node-id="658:1098">
            {label}
          </span>
        </a>
      ))}
    </div>
  ) : null
  const comboContent = children ?? (
    <>
      {titleNode}
      {descriptionNode}
      {actionsNode}
    </>
  )

  return (
    <div
      className={[styles.contentBlock, className].filter(Boolean).join(' ')}
      data-name="ContentBlock"
      data-node-id="691:1323"
      data-block-variant={blockVariant}
      data-combo-variant={comboVariant}
    >
      <div
        className={[styles.viewportContainer, viewportClassName].filter(Boolean).join(' ')}
        data-name="ViewportContainer"
        data-node-id="690:1315"
      >
        {isStickyVariant ? (
          <div className={[styles.contentCombo, styles.stickyCombo, blockVariant === 'stickyScrollerReverse' ? styles.stickyComboReverse : null].filter(Boolean).join(' ')} data-name="ContentCombo" data-node-id="I745:7347;690:1315;689:1310">
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
              <div className={[styles.stickyStage, blockVariant === 'stickyScrollerReverse' ? styles.stickyStageReverse : null].filter(Boolean).join(' ')} data-name="StickyStage" data-node-id="I745:7347;690:1315;689:1310;745:7296" style={stickyContentStyles}>
                <div className={[styles.stickyClip, blockVariant === 'stickyScrollerReverse' ? styles.stickyClipReverse : styles.stickyClipDefault].join(' ')}>
                  {stickyContent ? (
                    <div className={styles.stickyContent}>{stickyContent}</div>
                  ) : (
                    <div className={styles.dummyVisual} data-name="DummyVisual" data-node-id="I745:7347;690:1315;689:1310;745:7306" />
                  )}
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className={styles.contentCombo} data-name="ContentCombo" data-node-id="I690:1315;689:1310">
            {comboContent}
          </div>
        )}
      </div>
    </div>
  )
}
