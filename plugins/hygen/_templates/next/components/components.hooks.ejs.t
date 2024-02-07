---
to: src/components/<%= name %>/<%= name %>.hooks.tsx
---

export interface <%= name %>HooksProps {}

export default function use<%= name %>({}: <%= name %>HooksProps) {
  const exampleVariable = null

  const exampleFunction = () => {
    return null
  }

  return {
    exampleVariable,
    exampleFunction
  }
}
