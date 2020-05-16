import { app } from '../index'

const PORT = process.env.PORT || 8000
app.listen(PORT, () => {
  return console.log(`listing at port http://localhost:${PORT}`)
})
