import app from "./app"
import config from "./config"
import { logger } from "./utils/logger"

const PORT = config.PORT || 5050

app.listen(PORT, () => {
  logger.info(`🚀 Server running on port ${PORT}`)
  logger.info(`📊 Environment: ${config.NODE_ENV}`)
})
