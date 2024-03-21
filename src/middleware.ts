import { stackMiddlewares } from "@/middlewares/stackMiddlewares"
import { withAuthorization } from "@/middlewares/withAuthorization"
import { withHeaders } from "@/middlewares/withHeaders"

export default stackMiddlewares([withAuthorization, withHeaders])
