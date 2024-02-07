---
to: src/components/<%= name %>/<%= name %>.tsx
---

export interface <%= name %>Props {
  className?: string
}

export default function <%= name %>({ className }: <%= name %>Props) {
  const [example, setExample] = useState('')

  const exampleFunction = () => {}

  useEffect(() => {

  }, [])

  return (
    <div className={className}>
        <></>
    </div>
  )
}
