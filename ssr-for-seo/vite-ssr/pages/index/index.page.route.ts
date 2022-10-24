import { PageContext } from "../../renderer/types";

export default (pageContext: PageContext) => pageContext.urlPathname === '/';