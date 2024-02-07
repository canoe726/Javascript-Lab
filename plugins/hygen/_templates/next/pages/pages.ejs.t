---
to: "<%= route1 ? route2 ? `src/pages/${name}/${route1}/${route2}/index.tsx` : `src/pages/${name}/${route1}/index.tsx` : `src/pages/${name}/index.tsx` %>"
---
<% if (route2) { %>
import <%= fileName %>Main from '@/pageComponents/<%= name %>/<%= route1 %>/<%= route2 %>/<%= fileName %>Main'
<% } else if (route1) { %>
import <%= fileName %>Main from '@/pageComponents/<%= name %>/<%= route1 %>/<%= fileName %>Main'
<% } else { %>
import <%= fileName %>Main from '@/pageComponents/<%= name %>/<%= fileName %>Main'
<% } %>

export default function <%= name %>Page() {
  return <<%= pascal %>Main />
}
