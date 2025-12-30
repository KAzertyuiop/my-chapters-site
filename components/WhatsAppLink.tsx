type WhatsAppLinkProps = {
  phone: string
  message: string
  children: React.ReactNode
  className?: string
}

export default function WhatsAppLink({
  phone,
  message,
  children,
  className,
}: WhatsAppLinkProps) {
  const href = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener"
      className={className}
    >
      {children}
    </a>
  )
}